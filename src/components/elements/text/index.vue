<template>
  <div class="ga-text" :style="style.base">
    <div :style="style.Font" v-html="config.text"></div>
  </div>
</template>

<script>

  import parser from '../../../filters/parser';

  export default {
    name: 'gaText',
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      config() {
        return this.$store.getters.configByElId(this.id);
      },
      style() {
        return parser(this.config.style);
      }
    }
  };
</script>

<style>
  .ga-text {
    width: 100%;
    height: 100%;
  }
</style>