<template>
  <div class="container">
    <div class="header">
      <operator></operator>
    </div>
    <div class="main">
      <div class="content">
        <router-view />
      </div>
      <div class="aside">
        <el-props />
      </div>
    </div>
  </div>
</template>

<script>
  import ElProps from './components/ElProps.vue';
  import Operator from './components/Operator.vue';

  export default {
    name: 'app',
    components: {
      ElProps,
      Operator
    }
  };
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .container {

  }

  .header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .content {
    flex: 1;
  }

  .aside {
    flex-basis: 300px;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    padding: 10px;
    height: 100%;
    overflow: scroll;
  }

  .main {
    height: 100%;
    display: flex;
  }
</style>
