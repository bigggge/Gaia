/**
 * element.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/12/28.
 */

export default {
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
      if (key.toLowerCase().indexOf('width') >= 1) {
        value += 'px';
      }
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