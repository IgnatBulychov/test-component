<template>
  <div>
    <v-autocomplete
      v-model="town"
      :items="Object.keys(towns)"
      label="Город"
      no-data-text="Ничего не найдено"
      outlined
    ></v-autocomplete>
    <v-autocomplete
      v-if="town"
      v-model="address"
      :items="towns[town]"
      label="Улица"
      no-data-text="Ничего не найдено"
      outlined
    ></v-autocomplete>
    <v-autocomplete
      v-if="address"
      v-model="number"
      :items="numbers"
      label="Номер"
      no-data-text="Ничего не найдено"
      outlined
    ></v-autocomplete>

    <div v-if="processing" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <div v-if="status === 'taken' && curUch" class="text-center mb-4">
        <strong> На руках </strong><br />
        <strong> Взят:</strong> {{ curUch.get }} <br />
        <strong> Кем: </strong> {{ curUch.who }} <br />
        <br />

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header> История </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Кто</th>
                      <th class="text-left">Взял</th>
                      <th class="text-left">Сдал</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in curHistory" :key="item.id">
                      <td class="text-left">{{ item.fields.who || "-" }}</td>
                      <td class="text-left">{{ item.fields.get || "-" }}</td>
                      <td class="text-left">{{ item.fields.pass || "-" }}</td>
                    </tr>
                  </tbody>
                </template></v-simple-table
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <br />
        <br />
        <v-btn @click="passUch(new Date())" color="primary"
          >Сдать сегодня</v-btn
        >
        <br />
        <br />

        или укажите дату: <br />
        <br />

        <v-dialog
          ref="dialog"
          v-model="modalPass"
          :return-value.sync="datePass"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="datePass"
              label="Сдан"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              locale="ru-RU"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker v-model="datePass" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalPass = false">
              Отмена
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(datePass)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <div class="text-center">
          <v-btn v-if="datePass" @click="passUch(null)" color="primary"
            >Сдать</v-btn
          >
        </div>

        <div class="text-center mt-10">
          <v-btn @click="clear()" text>сброс</v-btn>
        </div>
      </div>

      <div v-if="status === 'free'">
        <div class="text-center mb-4">Участок свободен</div>
        <v-dialog
          v-if="number !== null"
          ref="dialog"
          v-model="modalGet"
          :return-value.sync="dateGet"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateGet"
              label="Взят"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              locale="ru-RU"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateGet" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalGet = false">
              Отмена
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(dateGet)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-text-field
          v-if="dateGet"
          v-model="who"
          label="Кто"
          outlined
        ></v-text-field>
        <div class="text-center">
          <v-btn
            v-if="who"
            @click="getUch"
            color="primary"
            :loading="processingGet"
            >Взять</v-btn
          >
        </div>
        <div class="text-center mt-10">
          <v-btn @click="clear()" text>сброс</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { towns, numbers } from "@/constants/towns";
export default {
  layout: "mainLayout",
  data: () => {
    return {
      towns,
      numbers,
      town: "",
      address: "",
      number: null,
      modalGet: false,
      dateGet: null, //new Date().toLocaleString().split(",")[0],
      who: "",
      modalPass: false,
      datePass: "",

      curUch: {
        town: "",
        address: "",
        number: null,
        dateGet: "",
        who: "",
        datePass: "",
      },

      processing: false,
      processingGet: false,
      status: "",
    };
  },
  methods: {
    async getStatus() {
      this.processing = true;
      const response = await this.$axios.get(
        `https://api.airtable.com/v0/${this.$route.params.table}/uch?filterByFormula=AND(%7Btown%7D+%3D+'${this.town}'%2C%7Baddress%7D+%3D+'${this.address}'%2C+%7Bnumber%7D+%3D+${this.number})&view=grid`,

        {
          headers: {
            Authorization: `Bearer ${this.$route.params.key}`,
          },
        }
      );
      console.log(response.data.records.length);
      if (
        !response.data.records.length ||
        !response.data.records.filter((r) => !r.fields.pass).length
      ) {
        this.status = "free";
      } else {
        this.status = "taken";
        this.curUch = {
          id: response.data.records.filter((r) => !r.fields.pass)[0].id,
          ...response.data.records.filter((r) => !r.fields.pass)[0].fields,
        };
        this.curHistory = response.data.records;
      }
      this.processing = false;
    },
    async getUch() {
      this.processingGet = true;
      await this.$axios.post(
        `https://api.airtable.com/v0/${this.$route.params.table}/uch`,
        {
          records: [
            {
              fields: {
                town: this.town,
                address: this.address,
                number: this.number,
                get: this.dateGet,
                who: this.who,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.$route.params.key}`,
            "Content-Type": "application/json",
          },
        }
      );
      this.clear();
      this.processingGet = false;
    },
    async passUch(date) {
      this.processingGet = true;
      await this.$axios.patch(
        `https://api.airtable.com/v0/${this.$route.params.table}/uch`,
        {
          records: [
            {
              id: this.curUch.id,
              fields: {
                pass: date
                  ? date.toLocaleString().split(",")[0]
                  : this.datePass,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.$route.params.key}`,
            "Content-Type": "application/json",
          },
        }
      );
      this.clear();
      this.processingGet = false;
    },
    clear() {
      this.town = "";
      this.address = "";
      this.number = null;
      this.dateGet = new Date().toLocaleString().split(",")[0];
      this.who = "";
      this.datePass = "";
      this.status = "";
    },
  },
  watch: {
    town() {
      if (this.address && this.number !== null) {
        this.getStatus();
      }
    },
    address() {
      if (this.town && this.number !== null) {
        this.getStatus();
      }
    },
    number() {
      if (this.town && this.address) {
        this.getStatus();
      }
    },
  },
  mounted() {
    if (
      this.$route.query.town &&
      this.$route.query.address &&
      this.$route.query.number
    ) {
      this.town = this.$route.query.town;
      this.address = this.$route.query.address;
      this.number = Number(this.$route.query.number);
    }
  },
};
</script>

<style lang="scss"></style>
