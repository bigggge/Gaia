import Vue from 'vue';
import { SET_CURRENT_ELEMENT, EDIT_ELEMENT_IGNORE } from '../store/types';

const EMPTY_STATE = 'EMPTY_STATE';

const VuexUndoRedo = {
  install(Vue, options = {}) {
    if (!Vue._installedPlugins.find(plugin => plugin.Store)) {
      throw new Error('VuexUndoRedo plugin must be installed after the Vuex plugin.');
    }
    Vue.mixin({
      data() {
        return {
          done: [], // 已完成 mutation
          undone: [], // 未完成 mutation
          newMutation: true,
          ignoreMutations: options.ignoreMutations || []
        };
      },
      created() {
        // 初始化 done 和 undone
        if (this.$store) {
          this.$store.subscribe(mutation => {
            if (mutation.type !== EMPTY_STATE && this.ignoreMutations.indexOf(mutation.type) === -1) {
              this.done.push(mutation);
            }
            if (this.newMutation) {
              this.undone = [];
            }
          });
        }
      },
      computed: {
        vuexCanRedo() {
          return this.undone.length;
        },
        vuexCanUndo() {
          return this.done.length;
        }
      },
      methods: {
        // undo
        vuexUndo() {
          console.log('[VuexUndoRedo] undo');
          // 从 done 删除最新的 mutation 并移动至 undone 中
          this.undone.push(this.done.pop());
          this.newMutation = false;
          this.$store.commit(EMPTY_STATE);
          this.done.forEach(mutation => {
            switch (typeof mutation.payload) {
              case 'object':
                this.$store.commit(`${mutation.type}`, Object.assign({}, mutation.payload));
                break;
              default:
                this.$store.commit(`${mutation.type}`, mutation.payload);
            }
            this.done.pop();
          });
          this.newMutation = true;
        },
        // redo
        vuexRedo() {
          console.log('[VuexUndoRedo] redo');
          let commit = this.undone.pop();
          this.newMutation = false;
          switch (typeof commit.payload) {
            case 'object':
              this.$store.commit(`${commit.type}`, Object.assign({}, commit.payload));
              break;
            default:
              this.$store.commit(`${commit.type}`, commit.payload);
          }
        }
      }
    });
  }
};

Vue.use(VuexUndoRedo, {
  ignoreMutations: [
    EDIT_ELEMENT_IGNORE,
    SET_CURRENT_ELEMENT
  ]
});

