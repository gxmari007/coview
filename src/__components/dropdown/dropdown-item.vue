<template>
  <li :class="classes" @click="onClick">
    <slot></slot>
  </li>
</template>

<script>
import emitter from 'mixins/emitter';

export default {
  name: 'CoDropdownItem',
  mixins: [emitter],
  props: {
    // 代表该项的 label 值，on-dropdown-click 事件中返回
    label: [String, Number],
    // 禁用该项
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否选中
    active: {
      type: Boolean,
      default: false,
    },
    // 是否分割线
    divided: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-dropdown__item';

      return [prefixClass, {
        [`${prefixClass}--disabled`]: this.disabled,
        [`${prefixClass}--active`]: this.active,
        [`${prefixClass}--divided`]: this.divided,
      }];
    },
  },
  methods: {
    onClick() {
      const dropdownTrigger = this.$parent && this.$parent.$options.name === 'CoDropdown';

      if (!this.disabled && !dropdownTrigger) {
        this.dispatch('CoDropdown', 'dropdown-click', this.label);
      }
    },
  },
};
</script>
