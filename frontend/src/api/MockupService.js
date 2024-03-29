import axios from 'axios'

export default axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0',
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
})
