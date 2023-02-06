import { ref, isProxy, toRaw } from 'vue'
import axios from 'axios'
const apiUrl = process.env.BASE_URL

const useDoctors = async () => {
        const { data } = await axios.get(`${apiUrl}/doctor`)

        if (!data) return
        
        const doctors = data

    return {
        doctors,
    }
}

export default useDoctors