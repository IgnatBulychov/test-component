<template>
  <v-app>
    <v-container>
      <div class="my-5 text-center">Examples</div>
      <v-row>
        <v-col cols="12" lg="8">
          <v-card>
            <v-card-text>
              <div class="item" v-for="(item, key) in items" :key="key">
                <span class="item__title">
                  <strong>{{ item.title }}</strong>
                </span>
                <tags-list :tags="item.tags" :align="item.tagsAlign" />
                <v-divider v-if="key != items.length - 1" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card>
            <v-card-text>
              <div class="item" v-for="(item, key) in items" :key="key">
                <span class="item__title">
                  <strong>{{ item.title }}</strong>
                </span>
                <tags-list :tags="item.tags" :align="item.tagsAlign" />
                <v-divider v-if="key != items.length - 1" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      items: [
        {
          title: "Город (по левому краю)",
          tags: [
            {
              text: "5",
              icon: "star-outline",
            },
            {
              text: "Историческая",
              icon: null,
            },
            {
              text: "На автобусе",
              icon: "bus",
            },
            {
              text: "28 марта",
              icon: null,
            },
            {
              text: "9 часов",
              icon: "clock-time-three-outline",
            },
            {
              text: "до 5 человек",
              icon: "account",
            },
          ],
          tagsAlign: "left",
        },
        {
          title: "Экскурсия (по ширине)",
          tags: [
            {
              text: "5",
              icon: "star-outline",
            },
            {
              text: "Обзорная",
              icon: null,
            },
            {
              text: "На автобусе",
              icon: "bus",
            },
            {
              text: "25 марта",
              icon: null,
            },
            {
              text: "6 часов",
              icon: "clock-time-three-outline",
            },
            {
              text: "до 5 человек",
              icon: "account",
            },
          ],
          tagsAlign: "wide",
        },
        {
          title: "О кирках (по левому краю)",
          tags: [
            {
              text: "5",
              icon: "star-outline",
            },
            {
              text: "Историческая",
              icon: null,
            },
            {
              text: "На автобусе",
              icon: "bus",
            },
            {
              text: "29 марта",
              icon: null,
            },
            {
              text: "6 часов",
              icon: "clock-time-three-outline",
            },
            {
              text: "до 20 человек",
              icon: "account",
            },
          ],
          tagsAlign: "left",
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.item {
  padding: 8px 0px;
  &__title {
    font-size: 1.1rem;
  }
}
</style>
