<template>
  <el-form size="mini">
    <el-form-item label="图层">
      <el-slider
        :max="1000"
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
  import fly from 'flyio';

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
        this.$message.info({ message: '正在替换图片..' });
        console.log(e.target.files);

        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('smfile', file);

        fly.post('https://sm.ms/api/upload', formData)
          .then(res => {
            console.log(res.data.data.url);
            this.$message.success({ message: '替换图片成功' });
            this.$store.commit('EDIT_ELEMENT', {
              id: this.id,
              key: 'src',
              value: res.data.data.url
            });
          })
          .catch(e => {
            console.error(e);
          });

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
