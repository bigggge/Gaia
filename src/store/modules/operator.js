import * as types from '../types';
import defaultData from '../../components/elements/default';
import { mergeDeep, deepCopy } from '../../utils/util';

let prevElData = {};
let defaultState = {
  page: {
    id: 1,
    style: {},
    elements: [],
  },
  currentElement: {}
};

// initial state
const state = deepCopy(defaultState);

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
    const data = defaultData[name];
    prevElData[name] = data;
    data.style.top = prevElData[name].style.top + 50;
    data.style.left = prevElData[name].style.left + 50;
    prevElData[[name]] = data;
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
  [types.EMPTY_STATE](state) {
    // this.replaceState(deepCopy(defaultState))
    // state = deepCopy(defaultState);
    state.page = {
      id: 1,
      style: {},
      elements: [],
    };
    state.currentElement = {};
  },
  [types.ADD_ELEMENT](state, el) {
    // let curPage = state.pages.find(item => item.id === state.curPageId);
    // curPage && curPage.elements.push(el);
    state.page.elements.push(deepCopy(el));
  },
  [types.EDIT_ELEMENT](state, { id, key, value }) {
    let el = state.page.elements.find(el => el.id === id || el.id === state.currentElement.id);
    if (el) {
      mergeDeep(el, { [key]: value });
    }
  },
  [types.EDIT_ELEMENT_IGNORE](state, { id, key, value }) {
    let el = state.page.elements.find(el => el.id === id || el.id === state.currentElement.id);
    if (el) {
      mergeDeep(el, { [key]: value });
    }
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