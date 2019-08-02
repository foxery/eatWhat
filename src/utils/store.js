// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    active: "index",
    category: [
      {
        name: "荤菜",
        amount: 1,
        icn: "/static/images/category_icn_meat.png",
        type: 1
      },
      {
        name: "素菜",
        amount: 1,
        icn: "/static/images/category_icn_vegetables.png",
        type: 2
      },
      {
        name: "半荤",
        amount: 1,
        icn: "/static/images/category_icn_hulfmeat.png",
        type: 3
      },
      {
        name: "汤",
        amount: 1,
        icn: "/static/images/category_icn_soup.png",
        type: 4
      }
    ]
  },
  mutations: {
    changeActive: (state, payload) => {
      const obj = state
      obj.active = payload;
    }
  }
})

export default store
