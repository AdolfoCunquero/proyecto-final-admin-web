import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/KPIView.vue')
  },
  {
    path: '/database',
    name: 'Base de datos',
    component: () => import('../views/DataBaseView.vue')
  },
  {
    path: '/data-entry',
    name: 'Ingreso de datos',
    component: () => import('../views/DataEntryView.vue')
  },
  {
    path: '/kpi',
    name: 'KPI',
    component: () => import('../views/KPIView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
