export const setUser = ( state, data ) => {
    state.currentUser = data.user;
    state.accessToken = data.access_token;
    localStorage.setItem('user', JSON.stringify(state.currentUser))
    localStorage.setItem('token', JSON.stringify(state.accessToken))
}

export const setShowRegisterForm = (state, data) => {
    state.showRegisterForm = data
}

export const setShowLoginForm = (state, data) => {
    state.showLoginForm = data
}
