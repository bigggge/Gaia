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
      @dragstop="handleDragStop"
      @resizing="handleResizing"
      @resizestop="handleResizeStop"
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

      this.dragging = false;
      this.resizing = false;
//      this.$store.dispatch('addElement', 'gaText');
//      this.$store.dispatch('addElement', 'gaImage');
    },
    methods: {
      setElement(id, name) {
        this.$store.commit('SET_CURRENT_ELEMENT', { id, name });
      },
      handleDragging(x, y) {
        this.dragging = true;
        this.$store.commit('EDIT_ELEMENT_IGNORE', {
          key: 'style',
          value: { left: x, top: y }
        });
      },
      handleDragStop(x, y) {
        console.log('handleDragStop');
        if (this.dragging) {
          this.dragging = false;
          this.$store.commit('EDIT_ELEMENT', {
            key: 'style',
            value: { left: x, top: y }
          });
        }
      },
      handleResizing(x, y, w, h) {
        this.resizing = true;
        this.$store.commit('EDIT_ELEMENT_IGNORE', {
          key: 'style',
          value: { left: x, top: y, width: w, height: h }
        });
      },
      handleResizeStop(x, y, w, h) {
        console.log('handleResizeStop');
        if (this.resizing) {
          this.resizing = false;
          this.$store.commit('EDIT_ELEMENT', {
            key: 'style',
            value: { left: x, top: y, width: w, height: h }
          });
        }
      },
      handleClick(name) {
        this.$emit('click');
      },
      handleDblClick(name) {
        alert(name);
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