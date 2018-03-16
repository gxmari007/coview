<template>
  <ul :class="classes" role="menu">
    <slot />
  </ul>
</template>

<script>
import { oneOf } from 'utils/help';

export default {
  name: 'CoMenu',
  provide() {
    return {
      rootMenu: this,
    };
  },
  props: {
    // 初始选中的菜单项 name 数组
    defaultSelectedKeys: {
      type: Array,
      default() { return []; },
    },
    // inline 模式的菜单缩进宽度
    inlineIndent: {
      type: Number,
      default: 24,
    },
    // 菜单类型，现在支持垂直、水平、和内嵌模式三种
    mode: {
      type: String,
      default: 'vertical',
      validator(value) {
        return oneOf(value, ['vertical', 'vertical-right', 'vertical-left', 'horizontal', 'inline']);
      },
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 是否允许选中
    selectable: {
      type: Boolean,
      default: true,
    },
    // 主题颜色
    theme: {
      type: String,
      default: 'light',
      validator(value) {
        return oneOf(value, ['light', 'dark']);
      },
    },
  },
  data() {
    return {
      items: {}, // 所有 menu-item 组件实例
      selectedItems: this.defaultSelectedKeys, // 选择的 menu-item name 数组
    };
  },
  computed: {
    classes() {
      const { theme, mode } = this;
      const prefixClass = 'co-menu';

      return [prefixClass, `${prefixClass}--root`, `${prefixClass}--${theme}`, `${prefixClass}--${mode}`];
    },
  },
  methods: {
    // 向 items 添加 menu-item 组件实例
    addItem(item) {
      this.$set(this.items, item.name, item);
    },
    // 从 items 中移除 menu-item 组件实例
    removeItem(item) {
      this.$delete(this.items, item.name);
    },
    updateSelectItems(name) {
      if (this.multiple) {
        const index = this.selectedItems.indexOf(name);

        if (index > -1) {
          this.selectedItems.splice(index, 1);
        } else {
          this.selectedItems.push(name);
        }
      } else {
        this.selectedItems = [name];
      }
    },
  },
};
</script>