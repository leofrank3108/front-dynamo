import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'

const AuthyStore = {
    namespaced: true,
    state,
    mutations,
    actions,
    // getters
}

export default AuthyStore