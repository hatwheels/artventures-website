<template>
  <div
    v-if="isActive"
    v-waypoint="{ active: true, callback: cb, options: op }"
  >
    <template v-if="isViewed">
      <transition :name="nm" appear>
        <main>
          <slot />
        </main>
      </transition>
    </template>
    <template v-else>
        <slot />
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isViewed: false,
    }
  },
  props: {
    isActive: {
      type: Boolean,
      default: true
    },
    op: { threshold: [0] },
    nm: {
      type: String,
      default: 'surf',
    },
    dir: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    cb ({ going, direction }) {
      if (this.dir) {
        if (going === this.$waypointMap.GOING_IN &&  direction) {
          this.isViewed = true
        }
      } else {
        if (going === this.$waypointMap.GOING_IN) {
          this.isViewed = true
        }
      }
    }
  }
}
</script>