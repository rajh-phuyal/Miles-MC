import Vue from 'vue'
import Router from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import AllWorkspaces from "@/views/AllWorkspaces.vue"
import SingleWorkspace from "@/views/SingleWorkspace.vue"
import CreateNewWorkspace from "@/views/CreateNewWorkspace.vue"
import AllEmployees from "@/views/AllEmployees.vue"
import EmployeeProfile from "@/views/EmployeeProfile.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/workspace',
      name: 'AllWorkspaces',
      component: AllWorkspaces,
    },
    {
		path: '/workspace/:workspace_id/',
    name: 'SingleWorkspace',
		component: SingleWorkspace,
    },
    {
      path: '/workspace/create_new/',
      name: 'CreateNewWorkspace',
      component: CreateNewWorkspace,
      },
    {
    path: '/employee',
    name: 'AllEmployees',
    component: AllEmployees,
    },
    {
    path: '/employee/:employee_id',
    name: 'EmployeeProfile',
    component: EmployeeProfile,
    }
  ]
})
