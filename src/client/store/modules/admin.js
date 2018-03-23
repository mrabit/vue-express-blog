export default {
  state: {
    isCollapse: false
  },
  getters: {
    getIsCollapse: state => state.isCollapse
  },
  mutations: {
    changeIsCollapse(state) {
      state.isCollapse = !state.isCollapse;
    }
  }
}
