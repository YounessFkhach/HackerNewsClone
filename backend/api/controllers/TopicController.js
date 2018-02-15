/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


let promisify = require('../tools/promisify').promisify

let isLiked = async (cid, user) => {
  return user && (await promisify(Like.findOne({ cid, type: 'topic', uid: user.id})))
}

let getScore = async (cid) => {
  return (await promisify(Like.find({ cid, type: 'topic' }))).length
}

let getRank = (topic) => {
  let passedHours = Math.abs((new Date(topic.createdAt)).getTime() - (new Date()).getTime()) / 36e5
  let rank = topic.score / Math.pow(passedHours + 2, 1.8)
  return rank
}

let populate = (user) => {
  return async (topic) => {
    let kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
    topic.kids = kids.map(elem => elem.id)
    topic.descendants = topic.kids.length

    // if user is logged in
    // check if the topics are liked by the user or not
    topic.liked = await isLiked(topic.id, user)

    //getting the score (upvotes/likes)
    topic.score = await getScore(topic.id)

    // calculating the rank
    topic.rank = getRank(topic)

    return topic
  }
}



module.exports = {

  create: async (req, res) => {
    var topic = req.param('topic')
    // add the user info to the topic record
    topic.uid = req.session.user.id
    topic.user_name = req.session.user.full_name

    // topic.uid = "425125421254539"
    // topic.user_name = "Youness_fkhach"

    // create the record
    var createdTopic = await promisify(Topic.create(topic))
    // return it to the client
    res.json(createdTopic)
  },



  // with this action we are going to serve the top posts
  // ordered by the rank used in the official hacker news
  // rank = (P-1) / (T+2)^G
  // where:
  // P = points of an item (and -1 is to negate submitters vote)
  // T = time since submission (in hours)
  // G = Gravity, defaults to 1.8 in news.arc
  find: async (req, res) => {

    var page = req.param('page') || 1
    const perPage = 20
    // this is not how the pagination should have been done,
    // but for now i am too lazy to change the DB structor to include the rank on each record
    var topics = await promisify(Topic.find().sort('id DESC'))

    // get total pages
    var totalPages = Math.ceil(topics.length / perPage)

    // populate the topic
    topics = topics.map(populate(req.session.user))
    topics = await Promise.all(topics)

    //sort by rank
    topics.sort((a,b) => b.rank - a.rank)

    var start = (page-1)*perPage
    topics = topics.slice(start, start+perPage)

    res.json({topics, totalPages})
  },



  new: async (req, res) => {
    var page = req.param('page') || 1
    const perPage = 20

    var topics = await promisify(Topic.find().sort('id DESC').paginate({page , limit: perPage}))

    // populate the topic
    topics = topics.map(populate(req.session.user))
    topics = await Promise.all(topics)

    // get total pages
    var totalRecords = await promisify(Topic.count())
    var totalPages = Math.ceil(totalRecords / perPage)

    res.json({topics, totalPages})
  },

  findOne: async (req, res) => {
    var id = req.param('id')
    var topic = await promisify(Topic.findOne({ id }))
    if(!topic){
      res.notFound('topic not found')
      return
    }

    topic = await populate(req.session.user)(topic)

    res.json(topic)
  },





  favorites: async (req, res) => {
    try {
      var page = req.param('page') || 1
      // get all topics liked by the user
      // first find all the likes of type 'topic' by the user of

      const perPage = 20
      var likes = await promisify(Like.find({ uid: req.session.user.id, type: 'topic' }).sort('createdAt DESC').paginate({page , limit: perPage}))

      // use the like.cid to get the topics
      var topics = likes.map(async ({ cid }) => {
        let topic = await promisify(Topic.findOne({ id: cid }))
        return populate(req.session.user)(topic)
      })
      topics = await Promise.all(topics)

      // get total pages
      var totalRecords = await promisify(Like.count({ uid: req.session.user.id, type: 'topic' }))
      var totalPages = Math.ceil(totalRecords / perPage)


      res.json({topics, totalPages})
    } catch (error) {
      console.log(error)
      res.serverError()
    }
  }

};

