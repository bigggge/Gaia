<template>
  <div class="ga-image" :style="style.base">
    <img class="image" :src="config.src" :style="style.Image">
  </div>
</template>

<script>

  import parser from '../../../filters/parser';

  export default {
    name: 'gaImage',
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

<style scoped>
  .ga-image {
    width: 100%;
    height: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
  }
</style>