<template>
  <div
    ref="tags-wrapper"
    class="tags-list"
    :class="{
      'tags-list_wide': align === 'wide',
    }"
  >
    <div v-for="(tag, key) in tags" :key="key" ref="tags" class="tag">
      <div v-if="key" class="tag__devider">
        <v-icon>mdi-circle-small</v-icon>
      </div>
      <div class="tag__inner">
        <span v-if="tag.icon" class="tag__icon">
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
  data: () => ({
    tagsObserver: null,
    containerObserver: null,
    hiddenTags: [],
  }),
  methods: {
    intersectionObserverCallback(entries, observer) {
      entries.reverse().forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.style.display = "none"
          this.hiddenTags.unshift({
            el: entry.target,
            containerWidth:
              entry.boundingClientRect.left + entry.boundingClientRect.width,
          })
        }
      })
    },
    resizeHandler() {
      if (
        this.hiddenTags.length &&
        this.$refs["tags-wrapper"].getBoundingClientRect().width >
          this.hiddenTags[0].containerWidth
      ) {
        const tag = this.hiddenTags.shift()
        if (tag) {
          tag.el.style.display = "flex"
        }
      }
    },
  },
  mounted() {
    this.tagsObserver = new IntersectionObserver(
      this.intersectionObserverCallback,
      {
        root: this.$refs["tags-wrapper"],
        rootMargin: "1px",
        threshold: 1,
      }
    )

    this.containerObserver = new ResizeObserver(this.resizeHandler)

    this.containerObserver.observe(this.$refs["tags-wrapper"])

    this.$refs.tags.forEach((target) => {
      this.tagsObserver.observe(target)
    })
  },
  beforeDestroy() {
    this.tagsObserver.disconnect()
    this.containerObserver.disconnect()
  },
}
</script>

<style lang="scss">
.tags-list {
  display: flex;
  align-items: center;
  overflow: hidden;
  .tag {
    display: flex;
    align-items: center;
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
        flex-grow: 1;
      }
      &__devider {
        flex: 1;
      }
    }
  }
}
</style>
