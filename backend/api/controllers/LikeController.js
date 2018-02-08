/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var promisify = require('../tools/promisify').promisify

module.exports = {
  create: async (req, res) => {
    var like = {}
    like.uid = req.session.user.id
    like.type = req.param('type')
    // content id
    like.cid = req.param('cid')

    // check if the user hasn't voted yet
    var voted = await promisify(Like.findOne(like))
    if(voted){
      res.forbidden("can't like twice")
      return
    }

    // create the like
    var createdLike = await promisify(Like.create(like))

    // return it to the client
    res.json(createdLike)
  },

};

