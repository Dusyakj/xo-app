import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Вход'
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue'),
      meta: {
        title: 'Регистрация'
      }
    },
    {
      path: '/',
      name: 'main',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Главная'
      },
      children: [
        {
          path: '/',
          name: 'main',
          component: () => import('../views/MainView.vue'),
          meta: {
            title: 'Главная'
          }
        },
        {
          path: '/games',
          name: 'games',
          component: () => import('../views/SearchView.vue'),
          meta: {
            title: 'Поиск игры'
          }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
          meta: {
            title: 'Профиль'
          }
        },
        {
          path: '/game/:id',
          name: 'game',
          component: () => import('../views/GameView.vue'),
          meta: {
            title: 'Поиск игры'
          }
        }
      ]
    }
  ]
})

// const store = usePersonStore()
router.beforeEach((to, from, next) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'))
  if (to.meta.title) {
    document.title = `${to.meta.title}`
  }
  if (isLoggedIn !== true && to.path !== '/login' && to.path !== '/registration') {
    next('/registration')
  } else if (isLoggedIn === true && (to.path === '/login' || to.path === '/registration')) {
    next('/')
  } else {
    next()
  }
})

export default router
