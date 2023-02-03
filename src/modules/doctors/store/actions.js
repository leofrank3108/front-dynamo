import axios from 'axios'

export const getDoctors = async ({ commit }) => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/doctor')

    if (!data) {
        commit('setDataDoctors', [])
        return
    }

    const doctors = data
    
    // const panels = await mapData(data, cards)

    // for (let id of Object.keys( data )) {
    //     panels.push({
    //         id,
    //         ...data[id]
    //     })
    // }

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

export const createCard = async ({ commit }, card) => {
    const {data} = await axios.post('api/cards', card)
    return data
}

export const deleteCard = async ({ commit }, id) => {
    const resp = await axios.delete(`api/cards/${id}`)
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

export const setCard = async ({commit}, card) => {
    commit('setCard', card)
}