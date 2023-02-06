import axios from 'axios'
const apiUrl = process.env.API_URL

export const getDoctors = async ({ commit }) => {
    const { data } = await axios.get(`${apiUrl}/doctor`)

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
    const {data} = await axios.post(`${apiUrl}/doctor`, form)
    return data
}

export const deleteDoctor = async ({ commit }, id) => {
    const resp = await axios.delete(`${apiUrl}/doctor/${id}`)
}

export const updateDoctor = async ({ commit }, form) => {
    const id = form.id
    delete form.id
    const { data } = await axios.put(`${apiUrl}/doctor/${id}`, form)
    return data
}

export const setShowModal = async ({commit}, status) => {
    commit('setShowModal', status)
}

export const getClinics = async ({ commit }) => {
    const { data } = await axios.get(`${apiUrl}/clinic`)

    if (!data) {
        commit('setDataClinics', [])
        return
    }

    const clinics = data.data

    commit('setDataClinics', clinics)

}
