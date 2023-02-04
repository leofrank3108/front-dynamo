import axios from 'axios'

export const getDoctors = async ({ commit }) => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/doctor')

    if (!data) {
        commit('setDataDoctors', [])
        return
    }

    const doctors = data

    commit('setDataDoctors', doctors)

}

const mapData = (panels, cards) => {
    panels.forEach(panel => {
        panel.cards = []
        cards.forEach(card => {
            if (card.panel_id === panel.id) {
                panel.cards.push(card)
            }
        })
    })

    return panels;
}

export const createDoctor = async ({ commit }, form) => {
    const {data} = await axios.post('http://127.0.0.1:8000/api/doctor', form)
    return data
}

export const deleteDoctor = async ({ commit }, id) => {
    const resp = await axios.delete(`http://127.0.0.1:8000/api/doctor/${id}`)
    console.log(id, resp)
    // // commit('setUser', data)
    // return resp
}

export const updateCard = async ({ commit }, form) => {
    const id = form.id
    delete form.id
    const { data } = await axios.put(`api/cards/${id}`, form)
    // commit('setUser', data)
    return data
}

export const setShowModal = async ({commit}, status) => {
    console.log(status)
    commit('setShowModal', status)
}