/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    uid: {
      type: 'string',
      required: true
    },
    user_name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: ['sup', 'sub'], // 'sup' for primary comments of a topic. and 'sub' for subcomments
      defaultsTo: 'sup',
    },
    parent: {
      type: 'string',
      required: true
    }
  }
};

