/**
 * Topic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: "string",
      required: true
    },
    url: {
      type: "string",
      // url: true
    },
    text: {
      type: "string"
    },
    uid: {
      type: "string",
      required: true
    },
    user_name: {
      type: "string",
      required: true
    }
  }
};

