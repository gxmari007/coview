<template>
  <aside class="co-aside" :style="styles">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'CoAside',
  props: {
    width: {
      type: [String, Number],
      default: 300,
    },
  },
  computed: {
    styles() {
      return { width: `${this.width}px` };
    },
  },
};
</script>
