<template>
  <div>
    <v-autocomplete
      v-model="town"
      :items="Object.keys(towns)"
      label="Город"
      no-data-text="Ничего не найдено"
      outlined
    ></v-autocomplete>
    <v-simple-table v-if="town">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Адрес</th>
            <th class="text-left" v-for="number in numbers" :key="number">
              {{ number }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in towns[town]" :key="item">
            <td>{{ item }}</td>
            <td v-for="number in numbers" :key="number">
              <v-btn
                v-if="
                  getted.find(
                    (el) =>
                      el.fields.address === item && el.fields.number === number
                  )
                "
                icon
                :to="`/${$route.params.table}/${$route.params.key}/ops?town=${town}&address=${item}&number=${number}`"
              >
                <v-icon color="error"> mdi-cancel </v-icon>
              </v-btn>

              <v-btn
                v-else
                icon
                :to="`/${$route.params.table}/${$route.params.key}/ops?town=${town}&address=${item}&number=${number}`"
              >
                <v-icon color="success"> mdi-checkbox-marked-circle </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      getted: [],
    };
  },
  methods: {
    async getStatus() {
      const response = await this.$axios.get(
        `https://api.airtable.com/v0/${this.$route.params.table}/uch?filterByFormula=%7Btown%7D+%3D+'${this.town}'&view=grid`,

        {
          headers: {
            Authorization: `Bearer ${this.$route.params.key}`,
          },
        }
      );
      this.getted = response.data.records.filter((r) => !r.fields.pass);
    },
  },
  watch: {
    town() {
      this.getStatus();
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
