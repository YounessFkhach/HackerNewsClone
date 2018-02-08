/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var promisify = require('../tools/promisify').promisify

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

  find: async (req, res) => {
    var page = req.param('page') || 1
    const perPage = 20
    // this is not how the pagination should have been done,
    // but for now i am too lazy to change the DB structor to include the rank on each record
    var topics = await promisify(Topic.find().sort('id DESC'))

    // get total pages
    var totalPages = Math.ceil(topics.length / perPage)

    topics = topics.map(async (topic) => {
      var kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
      topic.kids = kids.map(elem => elem.id)
      topic.descendants = topic.kids.length

      // if user is logged in
      // check if the topics are liked by the user or not
      topic.liked = false
      if(req.session.user){
        var liked = await promisify(Like.findOne({ cid: topic.id, type: 'topic', uid: req.session.user.id}))
        if(liked)
          topic.liked = true
      }

      //getting the score
      var score = (await promisify(Like.find({ cid: topic.id, type: 'topic' }))).length
      topic.score = score

      // calculating the rank
      var passedHours = Math.abs((new Date(topic.createdAt)).getTime() - (new Date()).getTime()) / 36e5
      topic.rank = topic.score / Math.pow(Math.floor(passedHours + 2), 1.8)

      return topic
    })
    topics = await Promise.all(topics)

    topics.sort((a,b) => b.rank - a.rank)

    var start = (page-1)*perPage
    topics = topics.slice(start, start+perPage)
    res.json({topics, totalPages})
  },

  new: async (req, res) => {
    var page = req.param('page') || 1
    const perPage = 20

    var topics = await promisify(Topic.find().sort('id DESC').paginate({page , limit: perPage}))

    topics = topics.map(async (topic) => {
      var kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
      topic.kids = kids.map(elem => elem.id)
      topic.descendants = topic.kids.length

      // if user is logged in
      // check if the topics are liked by the user or not
      topic.liked = false
      if(req.session.user){
        var liked = await promisify(Like.findOne({ cid: topic.id, type: 'topic', uid: req.session.user.id}))
        if(liked)
          topic.liked = true
      }

      //getting the score
      var score = (await promisify(Like.find({ cid: topic.id, type: 'topic' }))).length
      topic.score = score

      return topic
    })
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

    // get the comments
    var kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
    topic.kids = kids.map(elem => elem.id)
    topic.descendants = topic.kids.length

    // if user is logged in
    // check if the topics are liked by the user or not
    topic.liked = false
    if(req.session.user){
      var liked = await promisify(Like.findOne({ cid: topic.id, type: 'topic', uid: req.session.user.id}))
      if(liked)
        topic.liked = true
    }

    //getting the score
    var score = (await promisify(Like.find({ cid: topic.id, type: 'topic' }))).length
    topic.score = score

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
        var topic = await promisify(Topic.findOne({ id: cid }))

        topic.liked = true

        //getting the score
        var score = (await promisify(Like.find({ cid: topic.id, type: 'topic' }))).length
        topic.score = score

        // get the comments
        var kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
        topic.kids = kids.map(elem => elem.id)
        topic.descendants = topic.kids.length

        return topic
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

