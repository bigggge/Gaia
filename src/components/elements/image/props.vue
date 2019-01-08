<template>
  <div>
    <prop-item label="宽度">
      <el-input-number :value="config.style.width" :step="1" @input="updateStyle($event, 'width')" />
    </prop-item>
    <prop-item label="高度">
      <el-input-number :value="config.style.height" :step="1" @input="updateStyle($event, 'height')" />
    </prop-item>
    <prop-item label="x轴">
      <el-input-number :value="config.style.left" :step="1" @input="updateStyle($event, 'left')" />
    </prop-item>
    <prop-item label="y轴">
      <el-input-number :value="config.style.top" :step="1" @input="updateStyle($event, 'top')" />
    </prop-item>
    <prop-item label="图层">
      <el-slider style="margin-top: 20px" v-model="zIndex" :max="50" :step="1" show-input />
    </prop-item>
    <prop-item label="文件">
      <input class="img-input" type="file" @change="onFileChange" />
    </prop-item>
    <prop-item label="图片适应方式">
      <el-select :value="style.Image.objectFit" @change="updateImageStyle($event, 'objectFit')">
        <el-option label="无" value="none"></el-option>
        <el-option label="contain" value="contain"></el-option>
        <el-option label="cover" value="cover"></el-option>
        <el-option label="fill" value="fill"></el-option>
        <el-option label="scale-down" value="scale-down"></el-option>
      </el-select>
    </prop-item>
  </div>
</template>

<script>
  import props from '../../../mixins/props';
  import { uploadImg } from '../../../api/index';
  import PropItem from '../../props/item.vue';

  export default {
    name: 'gaImageProps',
    mixins: [props],
    components: {
      PropItem
    },
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      zIndex: {
        get: function() {
          return this.style.zIndex;
        },
        set: function(value) {
          this.updateStyle(value, 'zIndex');
        }
      }
    },
    methods: {
      onFileChange(e) {
        this.$message.info({ message: '正在替换图片..' });

        let file = e.target.files[0];
        uploadImg(file)
          .then((url) => {
            this.$message.success({ message: '替换图片成功' });

            this.$store.commit('EDIT_ELEMENT', {
              id: this.id,
              key: 'src',
              value: url
            });
          })
          .catch(e => console.error(e));

        console.log(e);
      },
      addImage() {
        alert('addImage');
      }
    }
  };
</script>
