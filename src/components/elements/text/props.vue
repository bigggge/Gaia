<template>
  <div class="props">
    <el-form size="mini">
      <el-form-item label="图层">
        <el-slider
          style="margin-top: 20px"
          :value="style.zIndex" @input="updateStyle($event, 'zIndex')"
          show-input>
        </el-slider>
      </el-form-item>
      <el-form-item label="文本">
        <el-input :value="config.text" @input="update($event, 'text')" clearable></el-input>
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker :value="style.Font.color" @change="updateFontStyle($event, 'color')" />
      </el-form-item>
      <el-form-item label="背景色">
        <el-color-picker :value="style.backgroundColor" @change="updateStyle($event, 'backgroundColor')" />
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-color-picker :value="style.borderColor" @change="updateStyle($event, 'borderColor')" />
      </el-form-item>
      <el-form-item label="边框粗细">
        <el-input-number :value="style.borderWidth" :step="1" @change="updateStyle($event, 'borderWidth')" />
      </el-form-item>
      <!--none solid dotted dashed-->
      <el-form-item label="边框样式">
        <el-select :value="style.borderStyle" @change="updateStyle($event, 'borderStyle')">
          <el-option label="无" value="none"></el-option>
          <el-option label="实线" value="solid"></el-option>
          <el-option label="圆点" value="dotted"></el-option>
          <el-option label="虚线" value="dashed"></el-option>
          <el-option label="双实线" value="double"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="水平对齐方式">
        <el-select :value="style.textAlign" @change="updateStyle($event, 'textAlign')">
          <el-option label="左对齐" value="left"></el-option>
          <el-option label="居中" value="center"></el-option>
          <el-option label="右对齐" value="right"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="加粗">
        <el-checkbox :value="style.fontWeight" :true-label="'bold'" :false-label="'normal'"
                     @change="updateStyle($event, 'fontWeight')"></el-checkbox>
      </el-form-item>

      <el-form-item label="斜体">
        <el-checkbox :value="style.fontStyle" :true-label="'italic'" :false-label="'normal'"
                     @change="updateStyle($event, 'fontStyle')"></el-checkbox>
      </el-form-item>

      <el-form-item label="字体">
        <el-select :value="style.fontFamily" @change="updateStyle($event, 'fontFamily')">
          <el-option label="Microsoft Yahei" value="'Microsoft Yahei'"></el-option>
          <el-option label="PingFang SC" value="'PingFang SC'"></el-option>
          <el-option label="sans-serif" value="sans-serif"></el-option>
          <el-option label="SimHei" value="SimHei"></el-option>
          <el-option label="STHeiti" value="STHeiti"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'gaTextProps',
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
      },
      style() {
        return this.config.style;
      }
    },
    methods: {
      update(value, key) {
        this.$store.commit('EDIT_ELEMENT', {
          id: this.id,
          key: key,
          value: value
        });
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
      updateFontStyle(value, key) {
        this.$store.commit('EDIT_ELEMENT', {
          id: this.id,
          key: 'style',
          value: { Font: { [key]: value } }
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
