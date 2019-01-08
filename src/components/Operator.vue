<template>
  <el-container>
    <el-button type="primary" icon="el-icon-arrow-left" circle @click="undo"></el-button>
    <el-button type="primary" icon="el-icon-arrow-right" circle @click="redo"></el-button>

    <el-button type="primary" round @click="addText">添加文字</el-button>
    <el-button type="success" round @click="addImage">添加图片</el-button>
    <el-button type="info" plain @click="preview">预览</el-button>
    <el-button type="warning" @click="exportJSON">导出</el-button>
  </el-container>
</template>

<script>

  export default {
    name: 'Operator',
    props: {
      msg: String
    },
    methods: {
      redo() {
        if (this.vuexCanRedo) {
          this.vuexRedo();
        }
      },
      undo() {
        if (this.vuexCanUndo) {
          this.vuexUndo();
        }
      },
      addText() {
        this.$store.dispatch('addElement', 'gaText');
      },
      addImage() {
        this.$store.dispatch('addElement', 'gaImage');
      },
      preview() {
        alert('preview');
      },
      exportJSON() {
        alert('export');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
