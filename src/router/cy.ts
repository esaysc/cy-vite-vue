import { createRouter, createWebHistory } from 'vue-router'

//通过懒加载引入组件
const Home = () => import('../view/Home.vue')
const Hot = () => import('../view/Hot.vue')
const Login = () => import('../view/Login.vue')
const Publish = () => import('../view/Publish.vue')
const Article = () => import('../view/Article.vue')

//映射关系
const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hot',
    name: 'Hot',
    component: Hot,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish,
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
  },
]
export default createRouter({
  //将实例暴露出去
  history: createWebHistory(), //设置路由模式
  routes,
})
