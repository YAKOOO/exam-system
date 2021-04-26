import Vue from 'vue'
import Router from 'vue-router'
import changePass from '@/pages/student/personalCenter/changePass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/pages/student/main'),
      children: [
        {
          path: 'home',
          component: () => import('@/pages/student/home/home')
        },

        {
          path: 'examHome',
          component: () => import('@/pages/student/examHome/examHome')
        },

        {
          path: 'exam/:paperId',
          component: () => import('@/pages/student/examCard/index'),
        },

        {
          path: 'homepage/:paperId',
          component: () => import('@/pages/student/homepage/index'),
        },

        {
          path: 'personalCenter/changePass',
          name: 'changePass',
          component: changePass,
        }
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('@/pages/teacher/main'),
      children: [
        {
          path: 'home',
          component: () => import('@/pages/teacher/home/home'),
        },
        {
          path:'paper',
          component: () => import('@/pages/teacher/paper/paper')
        },
        {
          path:'paperManage',
          component: () => import('@/pages/teacher/paper/paperManage')
        },
        {
          path:'question',
          component: () => import('@/pages/teacher/question/question')
        },
        {
          path: 'quesManage/:paperId',
          component: () => import('@/pages/teacher/question/quesManage')
        },
        {
          path: 'choosePaperId',
          component: () => import('@/pages/teacher/question/choosePaperId')
        },
        {
          path: 'class',
          component: () => import('@/pages/teacher/stuManage/createClass')
        },
        {
          path: 'chooseClassId',
          component: () => import('@/pages/teacher/stuManage/chooseClassId')
        },
        {
          path: 'stuManage/:classId',
          component: () => import('@/pages/teacher/stuManage/stuManage')
        }
      ]
    }

  ]
})
