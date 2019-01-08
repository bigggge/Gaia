<template>
  <div class="prop">
    <label>{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'prop-item',
    props: {
//      // 元素尺寸
//      size: {
//        type: String,
//        default: 'half' // half,one-third,one-quarter
//      },
      // Label
      label: {
        type: String,
        default: ''
      }
    }
  };
</script>
<style scoped>
  .prop {
    font-size: 12px;
  }

  label {
    color: grey;
  }

</style>
