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

    // create the record
    var createdTopic = await promisify(Topic.create(topic))
    // return it to the client
    res.json(createdTopic)
  },

  find: async (req, res) => {
    var topics = await promisify(Topic.find())
    topics = topics.map(async (topic) => {
      var kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
      topic.kids = kids.map(elem => elem.id)
      topic.descendants = topic.kids.length
      return topic
    })
    topics = await Promise.all(topics)
    res.json(topics)
  },

  findOne: async (req, res) => {
    var id = req.param('id')
    var topic = await promisify(Topic.findOne({ id }))
    if(!topic){
      res.notFound('topic not found')
      return
    }
    var kids = await promisify(Comment.find({ parent: topic.id, type: 'sup' }))
    topic.kids = kids.map(elem => elem.id)
    topic.descendants = topic.kids.length

    res.json(topic)
  }

};

