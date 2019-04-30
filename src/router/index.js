import Vue from 'vue'
import Router from 'vue-router'
import goods from "components/goods/goods.vue";
import ratings from "components/ratings/ratings.vue";
import seller from "components/seller/seller.vue";

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component:goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
  ]
})
