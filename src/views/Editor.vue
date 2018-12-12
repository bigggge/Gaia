<template>
  <div class="container">
    <DraggableResizable
      v-for="el in currentPage.elements"
      :key="el.id"
      :x="el.style.left"
      :y="el.style.top"
      :w="el.style.width"
      :h="el.style.height"
      :z="el.style.zIndex"
      :minw="10"
      :minh="10"
      @activated="setElement(el.id, el.name)"
      @dragging="handleDragging"
      @resizing="handleResizing"
      :parent="true">
      <component
        :is="el.name"
        :id="el.id"
        @dblclick.native="handleDblClick(el.name)"
        @click.native="handleClick(el.name)">
      </component>
    </DraggableResizable>
  </div>
</template>

<script>
  import DraggableResizable from '../components/DraggableResizable.vue';
  //  import El from '../components/El.vue';
  import Elements from '../components/elements/index';
  import { mapGetters, mapActions } from 'vuex';
  import throttle from 'lodash/throttle';

  export default {
    name: 'editor',
    computed: {
      ...mapGetters([
        'currentPage'
      ])
    },
    components: {
      DraggableResizable,
      ...Elements
    },
    created() {
      this.$store.dispatch('addElement', 'gaText');
      this.$store.dispatch('addElement', 'gaImage');
    },
    methods: {
      setElement(id, name) {
        this.$store.commit('SET_CURRENT_ELEMENT', { id, name });
      },
      handleDragging(x, y) {
        this.$store.commit('EDIT_ELEMENT', {
          key: 'style',
          value: {
            left: x,
            top: y
          }
        });
      },
      handleResizing(x, y, w, h) {
        this.$store.commit('EDIT_ELEMENT', {
          key: 'style',
          value: {
            left: x,
            top: y,
            width: w,
            height: h
          }
        });
      },
      handleClick(name) {
        this.$emit('click');
      },
      handleDblClick(name) {
        alert(name);
        if (name === 'gaText') {

        }
        this.$emit('dblclick');
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 0 auto;
    width: 320px;
    height: 486px;
    border: 1px solid #e1e1e1;
    overflow: hidden;
    position: relative;
  }
</style>