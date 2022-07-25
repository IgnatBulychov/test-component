<template>
  <div
    class="tags-list"
    :class="{
      'tags-list_wide': align === 'wide',
    }"
  >
    <div v-for="(tag, key) in tags" :key="key" class="tag">
      <div v-if="key" class="tag__devider">
        <v-icon>mdi-circle-small</v-icon>
      </div>
      <div class="tag__inner">
        <span class="tag__icon">
          <v-icon small>mdi-{{ tag.icon }}</v-icon>
        </span>
        <span class="tag__text">
          {{ tag.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsList",
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    align: {
      type: String,
      default: "left",
    },
  },
}
</script>

<style lang="scss">
.tags-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 42px;
  overflow: hidden;
  .tag {
    display: flex;
    align-items: center;
    height: 42px;
    &__inner {
      white-space: nowrap;
    }
    &__text {
      font-size: 0.8rem;
    }
    &__devider {
      text-align: center;
      color: #0000008a;
    }
  }
  &_wide {
    justify-content: space-between;
    .tag {
      &:not(:first-of-type) {
        flex: 1;
      }
      &__devider {
        flex: 1;
      }
    }
  }
}
</style>
