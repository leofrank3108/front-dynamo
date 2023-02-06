import axios from 'axios'
const apiUrl = process.env.API_URL

export const createUser = async ({ commit }, data) => {
    const {statusText} = await axios.post(`${apiUrl}/register`, data)
    return statusText
}

export const login = async ({ commit }, form) => {
    const { data } = await axios.post(`${apiUrl}/login`, form)
    commit('setUser', data)
    return data
}

export const logout = async ({ commit }) => {
    const response = await axios.post(`${apiUrl}/logout`)
    console.log(response)
    commit('setUser', [])
}

export const showRegister = async ({ commit }, data) => {
    commit('setShowRegisterForm', data)
    return data
}

export const showLogin = async ({ commit }, data) => {
    commit('setShowLoginForm', data)
    return data
}
