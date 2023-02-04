export const setDataDoctors = ( state, data ) => {
    state.doctorsList = data
}

export const setShowModal = ( state, status ) => {
    state.showModal = status
    console.log(state.showModal)
}