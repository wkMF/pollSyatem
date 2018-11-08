import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Class from '@/pages/basicData/Class'
import Grade from '@/pages/basicData/Grade'
import Teacher from '@/pages/basicData/Teacher'
import School from '@/pages/basicData/School'
import Course from '@/pages/basicData/Course'
import CountAll from '@/pages/count/CountAll'
import CountAnalysis from '@/pages/count/CountAnalysis'
import CourseControl from '@/pages/courseSur/CourseControl'
import CourseManager from '@/pages/courseSur/CourseManager'
import CourseShenhe from '@/pages/courseSur/CourseShenhe'
import Bank from '@/pages/question/Bank'
import Question from '@/pages/question/Question'
import BasicData from '@/pages/basicData/BasicData'

import Setting from '@/pages/Setting'
import Count from '@/pages/count/Count'
import CourseSur from '@/pages/courseSur/Course'
import QuestionBank from '@/pages/question/QuestionBank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/basicdata',
      component:BasicData,
      children:[
        {
          path: 'class',
          name: 'Class',
          component:Class,
        },{
          path: 'grade',
          name: 'Grade',
          component:Grade,
        },
        {
          path: 'school',
          name: 'School',
          component:School,
        },
        {
          path: 'course',
          name: 'Course',
          component:Course,
        },
        {
          path: 'teacher',
          name: 'Teacher',
          component:Teacher,
        },
      ]
    },
    {
      path: '/count',
      component: Count,
      children:[
        {
          path: 'countall',
          name: 'CountAll',
          component:CountAll,
        },
        {
          path: 'countanalysis',
          name: 'CountAnalysis',
          component:CountAnalysis,
        },
      ]
    },
    
    {
      path: '/coursesur',
      name: 'CourseSur',
      component:CourseSur,
      children:[
        {
          path: 'coursecontrol',
          name: 'CourseControl',
          component:CourseControl,
        },
        {
          path: 'coursemanager',
          name: 'CourseManager',
          component:CourseManager,
        },
        {
          path: 'courseshenhe',
          name: 'CourseShenhe',
          component:CourseShenhe,
        },
      ]
    },
    {
      path: '/questionbank',
      component:QuestionBank,
      children:[
        {
          path: 'bank',
          name: 'Bank',
          component:Bank,
        },
        {
          path: 'question',
          name: 'Question',
          component:Question,
        },
      ]
    },
    {
      path: '/setting',
      name: 'Setting',
      component:Setting,
    },
    


  ]
})
