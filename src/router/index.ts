import { createRouter, createWebHistory } from 'vue-router'
//通过懒加载引入组件
const Home = () => import('../view/Home.vue') // 主页
const Hot = () => import('../view/Hot.vue') // 热点文章
const Login = () => import('../view/Login.vue') // 登录页
const Publish = () => import('../view/Publish.vue') // 发布页
const Cy = () => import('../view/Cy.vue') // 顶部固定导航栏
const Article = () => import('../view/Article.vue') // 所请求访问的文章
const User = () => import('../view/User.vue') // 用户页

const Register = () => import('../view/Register.vue') // 注册页
const Special = () => import('../view/Special.vue') // 特别的页面
const Piano = () => import('@/view/Piano.vue') // 钢琴页面

//映射关系
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    // cy 前台页面
    path: '/cy',
    name: 'Cy',
    component: Cy,
    children: [
      {
        // 当 / 匹配成功
        // 将被渲染到 cy 的 <router-view> 内部
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
        path: '/publish',
        name: 'Publish',
        component: Publish,
      },
      {
        path: '/article',
        name: 'Article',
        component: Article,
      },
      {
        path: '/user',
        name: 'User',
        component: User,
      },
      {
        path: '/special',
        name: 'Special',
        component: Special,
      },
      {
        path: '/piano',
        name: 'Piano',
        component: Piano,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
]

export const router = createRouter({
  //将实例暴露出去
  history: createWebHistory(), //设置路由模式
  routes,
})

// 白名单--不需要 token 就可以直接访问的页面 /login /register /404
const whiteList = ['/login', '/register', '/404']
// 路由导航守卫
// from 来自哪
// to 要去哪
// next() 是一个函数 必须使用
// 使用: next() 直接放行  // next('/路径名') 跳转到指定页面
router.beforeEach((to, from) => {
  console.log('页面跳转', '从', from.path, '到', to.path)
  // 获取本地存储 token
  const token = sessionStorage.getItem('token')

  // 是否有 token ？
  if (token) {
    // 有 token
    // 是否去登录页 ？
    if (to.path === '/login') {
      // 去登录页
      return '/home' // 回首页
    } else {
      // 不去登录页
      console.log('放行')
      return true // 放行
    }
  } else {
    // 没有 token
    // 是否去白名单 ？
    if (whiteList.includes(to.path)) {
      // 去白名单
      return true // 放行
    } else {
      // 不去白名单
      return '/login' // 去登录页
    }
  }
})
