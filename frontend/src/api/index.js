import Portal from './topicsService'

export async function fetchTop(page) {
  const res = await Portal.get('topic', {
    params: {
      page
    }
  })
  return res.data
}

export async function fetchNew(page) {
  const res = await Portal.get('topic/new', {
    params: {
      page
    }
  })
  return res.data
}

export async function fetchFavorites(page) {
  const res = await Portal.get('topic/favorites', {
    params: {
      page
    }
  })
  return res.data
}


export function fetchTopic(id) {
  return Portal.get(`topic/${id}`)
}


export async function createTopic(topic) {
  try {
    // console.log("creating: ", topic)
    var res = await Portal.post('topic', {
      topic
    })
    return res.data;
  } catch (error) {
    console.log(error)
    return null
  }
}

export function fetchComment(id) {
  return Portal.get(`comment/${id}`)
}

export async function createComment(comment) {
  try {
    // console.log("creating: ", comment)
    var res = await Portal.post('comment', { ...comment
    })
    return res.data;
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createLike(like) {
  try {
    // console.log("creating: ", like)
    var res = await Portal.post('like', { ...like
    })
    return res.data;
  } catch (error) {
    console.log(error)
    return null
  }
}