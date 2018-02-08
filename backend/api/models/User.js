/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fbid: {
      type: 'string',
      required: true,
      unique: true
    },
    access_token: {
      type: 'string',
      required: true
    },
    first_name: {
      type: 'string',
      required: true
    },
    last_name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    profile_pic: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();

      return obj;
    }
  }
};

