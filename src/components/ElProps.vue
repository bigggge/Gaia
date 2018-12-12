<template>
  <div class="props-panel">
    <div>属性设置</div>
    <template v-if="currentElement.name">
      <component :is="currentElement.name + 'Props'" :id="currentElement.id" />
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Props from '../components/elements/props';

  export default {
    name: 'props',
    computed: {
      ...mapGetters([
        'currentElement'
      ])
    },
    components: Props
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
