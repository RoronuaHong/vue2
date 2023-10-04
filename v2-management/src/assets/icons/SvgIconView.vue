<template>
  <i class="svg-icon" :class="className" :style="styles">
    <svg aria-hidden="true">
      <use :xlink:href="`#icon-${iconName}`" />
    </svg>
  </i>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    className: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* 可以在这里定义样式 */
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

.svg-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
