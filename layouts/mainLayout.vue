<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar color="primary" dark>
            <v-toolbar-items>
              <v-btn
                :to="`/${this.$route.params.table}/${this.$route.params.key}/ops`"
                text
              >
                Взять/Сдать
              </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-toolbar-items>
              <v-btn
                :to="`/${this.$route.params.table}/${this.$route.params.key}/table`"
                text
              >
                Таблица
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row>
        <v-col> <nuxt /> </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
