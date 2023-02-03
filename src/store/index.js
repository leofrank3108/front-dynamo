import { createStore } from 'vuex'

import AuthStore from './modules/auth'
import DoctorsStore from '@/modules/doctors/store'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: AuthStore,
    doctors: DoctorsStore
  }
})
