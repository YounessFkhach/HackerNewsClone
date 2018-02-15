import axios from 'axios'
import { BACKEND_URL } from '@/config/conf'

export default axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
