const state = {
  foodDom: {},
  selectFoods: []
}

const mutations = {
  setFood(state, { foodDom }) {
    state.foodDom = foodDom
  },
  setSelectFood(state, {foods}) {
    state.selectFoods = foods
  }
}

export default {
  namespaced: true,
  state,
  mutations
}