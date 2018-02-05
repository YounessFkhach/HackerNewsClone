import portal from './MockupService'

export async function fetchTop(page){
    const res = await portal.get('topstories.json')
    const start = (page - 1) * 25
    const end = start + 25
    return res.data.slice(start,end)
}

export async function fetchNew(page){
    const res = await portal.get('newstories.json')
    const start = (page - 1) * 25
    const end = start + 25
    return res.data.slice(start,end)
}

export async function fetchTopics(ids){
    return Promise.all(ids.map(elem => fetchTopic(elem)))
}

export function fetchTopic(id){
    return portal.get(`item/${id}.json`)
}
