import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { store } from './store/store'
import Master from './components/layouts/Master'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Paginate from 'vuejs-paginate'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(Paginate)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'users',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { Master },
  template: '<Master/>'
})
