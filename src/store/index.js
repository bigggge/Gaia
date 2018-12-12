import Vue from 'vue';
import Vuex from 'vuex';
import operator from './modules/operator';
import createLogger from '../utils/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    operator
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});