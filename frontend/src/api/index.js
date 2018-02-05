import fakePortal from './MockupService'
import portal from './topicsService'

export async function fetchTop(page){
    const res = await fakePortal.get('topstories.json')
    const start = (page - 1) * 25
    const end = start + 25
    return res.data.slice(start,end)
}

export async function fetchNew(page){
    const res = await fakePortal.get('newstories.json')
    const start = (page - 1) * 25
    const end = start + 25
    return res.data.slice(start,end)
}

export async function fetchTopics(ids){
    return Promise.all(ids.map(elem => fetchTopic(elem)))
}

export function fetchTopic(id){
    return fakePortal.get(`item/${id}.json`)
}


export async function createTopic(topic){
  try {
    console.log("creating: ", topic)
    var res = await portal.post('topic', { topic })
    return res.data;
  } catch (error) {
    console.log(error)
    return null
  }
}