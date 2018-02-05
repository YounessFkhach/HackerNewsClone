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
  }


};

