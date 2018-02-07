import Portal from './topicsService'

export async function fetchTop(page){
    const res = await Portal.get('topic')
    const start = (page - 1) * 25
    const end = start + 25
    console.log(res)
    return res.data.slice(start,end)
}

export async function fetchNew(page){
    const res = await Portal.get('topic')
    const start = (page - 1) * 25
    const end = start + 25
    return res.data.slice(start,end)
}

export async function fetchTopics(ids){
    return Promise.all(ids.map(elem => fetchTopic(elem)))
}

export function fetchTopic(id){
    return Portal.get(`topic/${id}`)
}


export async function createTopic(topic){
  try {
    console.log("creating: ", topic)
    var res = await Portal.post('topic', { topic })
    return res.data;
  } catch (error) {
    console.log(error)
    return null
  }
}

export function fetchComment(id){
  return Portal.get(`comment/${id}`)
}

export async function createComment(comment){
  try {
    console.log("creating: ", comment)
    var res = await Portal.post('comment', { ...comment })
    return res.data;
  } catch (error) {
    console.log(error)
    return null
  }
}