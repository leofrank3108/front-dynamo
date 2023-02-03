export const loadData = async ({ commit }) => {
    const res = await axios.get('http://127.0.0.1:8000/api/doctor')
    console.log(res)
    // const resp = await axios.get('api/cards')

    // const cards = resp.data


    // if (!data) {
    //     commit('setDataDoctors', [])
    //     return
    // }

    // const panels = []
    
    // const panels = await mapData(data, cards)

    // for (let id of Object.keys( data )) {
    //     panels.push({
    //         id,
    //         ...data[id]
    //     })
    // }

    // commit('setDataDoctors', panels)

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