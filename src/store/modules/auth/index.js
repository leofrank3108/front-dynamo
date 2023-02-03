import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'

const AuthStore = {
    namespaced: true,
    state,
    mutations,
    actions,
    // getters
}

export default AuthStore