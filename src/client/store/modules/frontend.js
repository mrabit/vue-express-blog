import { user, tags, func } from '../api';
const CHANEG_TAGS = "CHANGE_TAGS";
const CHANGE_USER = "CHANGE_USER";
export default {
  state: {
    user: {},
    tags: []
  },
  getters: {
    getUser: state => state.user,
    getTagsArr: state => state.tags
  },
  mutations: {
    [CHANGE_USER](state, val) {
      state.user = val;
    },
    [CHANEG_TAGS](state, val) {
      state.tags = val
    }
  },
  actions: {
    getTags({ commit }) {
      func(tags, commit, CHANEG_TAGS);
    },
    getUserInfo({ commit }) {
      func(user, commit, CHANGE_USER);
    }
  }
}
