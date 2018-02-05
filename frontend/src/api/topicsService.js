import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.1.66:1337/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
