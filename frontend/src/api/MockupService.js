import axios from 'axios'

export default axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})