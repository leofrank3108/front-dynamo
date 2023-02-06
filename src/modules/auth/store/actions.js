import axios from 'axios'

export const createUser = async ({ commit }, data) => {
    const {statusText} = await axios.post('http://127.0.0.1:8000/api/register', data)
    return statusText
}

export const login = async ({ commit }, form) => {
    const { data } = await axios.post('http://127.0.0.1:8000/api/login', form)
    commit('setUser', data)
    return data
}

export const logout = async ({ commit }) => {
    const response = await axios.post('http://127.0.0.1:8000/api/logout')
    console.log(response)
    commit('setUser', [])
    // return data
}

export const showRegister = async ({ commit }, data) => {
    commit('setShowRegisterForm', data)
    return data
}

export const showLogin = async ({ commit }, data) => {
    commit('setShowLoginForm', data)
    return data
}
