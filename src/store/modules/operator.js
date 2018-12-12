import * as types from '../types';
import defaultData from '../../components/elements/default';
import { merge, mergeDeep } from '../../utils/util';

// initial state
const state = {
  page: {
    id: 1,
    style: {},
    elements: [],
  },
  currentElement: {}
};

// getters
const getters = {
  configByElId: (state) => (elId) => {
    return state.page.elements.find(el => el.id === elId);
  },
  currentElement: state => state.currentElement,
  currentPage: state => state.page

};

// actions
const actions = {
  addElement({ commit, getters }, name) {
    // commit('ADD_ELEMENT_TO_PAGE');
    const data = defaultData[name];
    console.log(data);
    commit('ADD_ELEMENT', { ...data, id: Math.random().toString(16).substr(2), parentId: 1 });
  }
};

// mutations
const mutations = {
  // [types.ADD_ELEMENT_TO_PAGE](state, el) {
  //   // let curPage = state.pages.find(item => item.id === state.curPageId);
  //   // curPage && curPage.elements.push(el);
  //   state.page.elements.push(el);
  // },
  [types.ADD_ELEMENT](state, el) {
    // let curPage = state.pages.find(item => item.id === state.curPageId);
    // curPage && curPage.elements.push(el);
    console.log('ADD_ELEMENT', el);
    state.page.elements.push(el);
  },
  [types.EDIT_ELEMENT](state, { id, key, value }) {
    let el = state.page.elements.find(el => el.id === id || el.id === state.currentElement.id);
    console.log('EDIT_ELEMENT', JSON.stringify(state.page.elements), id);
    if (el) {
      mergeDeep(el, { [key]: value });
    }
    console.log('EDIT_ELEMENT', JSON.stringify(state.page.elements), id);
  },
  [types.SET_CURRENT_ELEMENT](state, { id, name }) {
    state.currentElement = { id, name };
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};