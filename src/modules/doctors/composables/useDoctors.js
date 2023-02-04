import { ref, isProxy, toRaw } from 'vue'
import axios from 'axios'

const useDoctors = async () => {
    // const doctors = ref([])

    // const getDoctors = async () => {
        const { data } = await axios.get('http://127.0.0.1:8000/api/doctor')

        if (!data) return
        
        const doctors = data

        console.log(doctors.value)
    // }

    // getDoctors()

    return {
        doctors,
        // getDoctors,
    }
}

export default useDoctors