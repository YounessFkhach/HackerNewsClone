/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var promisify = require('../tools/promisify').promisify

module.exports = {
	create: async (req, res) => {
    try {
      // construct the comment data
      var comment = {}

      // todo: params validation
      comment.text = req.param('text')
      comment.type = req.param('type')
      comment.parent = req.param('parent')
      comment.uid = req.session.user.id
      comment.user_name = req.session.user.full_name

      // check if the parent exists
      // get the parent model to tesst the existance
      var Parent = null
      if(comment.type == 'sup') {
        Parent = Topic
      } else {
        Parent = Comment
      }


      var parent = await promisify(Parent.findOne({ id: comment.parent }))

      // if the parent doesn't exist we return an error
      if(!parent){
        res.notFound("parent doesn't exist")
        return
      }

      // create the comment
      createdComment = await promisify(Comment.create(comment))

      // return it to the client
      res.json(createdComment)
    } catch (error) {
      res.serverError(error)
      // todo handle errors by type
    }
  },

  findOne: async (req, res) => {
    var id = req.param('id')
    var comment = await promisify(Comment.findOne({id}))

    if(!comment){
      res.notFound('comment not found')
      return
    }

    // get all the kids of the comment
    var kids = await promisify(Comment.find({ parent: id, type: 'sub' }))
    comment.kids = kids.map(kid => kid.id)
    comment.ascendents = comment.kids.length

    // if user is logged in
    // check if the topics are liked by the user or not
    comment.liked = false
    if(req.session.user){
      var liked = await promisify(Like.findOne({ cid: comment.id, type: 'comment', uid: req.session.user.id}))
      if(liked)
        comment.liked = true
    }

    //getting the score
    var score = (await promisify(Like.find({ cid: comment.id, type: 'comment' }))).length
    comment.score = score

    res.json(comment)
  },
};

