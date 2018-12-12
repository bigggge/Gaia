<template>
  <el-form size="mini">
    <el-form-item label="图层">
      <el-slider
        style="margin-top: 20px"
        :value="config.style.zIndex" @input="updateStyle($event, 'zIndex')"
        show-input>
      </el-slider>
    </el-form-item>
    <el-form-item>
      <input class="img-input" type="file" @change="onFileChange" />
    </el-form-item>
    <el-form-item label="图片适应方式">
      <el-select :value="config.style.Image.objectFit" @change="updateImageStyle($event, 'objectFit')">
        <el-option label="无" value="none"></el-option>
        <el-option label="contain" value="contain"></el-option>
        <el-option label="cover" value="cover"></el-option>
        <el-option label="fill" value="fill"></el-option>
        <el-option label="scale-down" value="scale-down"></el-option>
      </el-select>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    name: 'gaImageProps',
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {};
    },
    computed: {
      config() {
        return this.$store.getters.configByElId(this.id);
      }
    },
    methods: {
      onFileChange(e) {
        console.log(e);
      },
      addImage() {
        alert('addImage');
      },
      updateStyle(value, key) {
        if (key.toLowerCase().indexOf('width') >= 0) {
          value += 'px';
        }
        console.log(value, key);
        this.$store.commit('EDIT_ELEMENT', {
          id: this.id,
          key: 'style',
          value: {
            [key]: value
          }
        });
      },
      updateImageStyle(value, key) {
        this.$store.commit('EDIT_ELEMENT', {
          id: this.id,
          key: 'style',
          value: { Image: { [key]: value } }
        });
      }
    }
  };
</script>

<style scoped>
  .item {
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  label {
    color: white;
    min-width: 80px;
    text-align: left;
  }
</style>
