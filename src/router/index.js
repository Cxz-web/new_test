import Vue from 'vue'
import Router from 'vue-router'

const TurnVideo = () => import('@/components/TurnVideo')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'trunvideo',
      component: TurnVideo
    }
  ]
})
