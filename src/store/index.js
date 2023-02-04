import { createStore } from 'vuex'

import AuthStore from './modules/auth'
import DoctorsStore from '@/modules/doctors/store'
import AuthyStore from '@/modules/auth/store'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: AuthStore,
    authy: AuthyStore,
    doctors: DoctorsStore
  }
})
