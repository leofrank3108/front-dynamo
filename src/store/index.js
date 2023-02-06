import { createStore } from 'vuex'

import DoctorsStore from '@/modules/doctors/store'
import AuthStore from '@/modules/auth/store'


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
