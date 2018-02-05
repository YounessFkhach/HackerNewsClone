/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var axios = require('axios')

conf = {
  client_id: '530745817303993',
  redirect_uri: 'http://localhost:1337/auth/login',
  client_secret: '006152f869bb21fa43cc3f11301c2220'
}

function promisify(fn){
  return new Promise(function(resolve, reject) {
    fn.exec((err, res) => {
      if(err) reject(err)
      else resolve(res)
    })
  })
}

module.exports = {
  login: async (req, res) => {

    // this will be called back by facebook api
    var code = req.param('code')

    try {
      // getting the access_token
      const access_token = (await axios.get('https://graph.facebook.com/v2.12/oauth/access_token', {
        params: {
          ...conf,
          code
        }
      })).data.access_token

      // getting user data using the access_token
      var userData = (await axios.get('https://graph.facebook.com/v2.12/me', {
        params: {
          access_token,
          fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(',')
        }
      })).data

      // change the object structure to  save it
      userData.uid = userData.id
      delete userData.id

      userData.profile_pic = userData.picture.data.url
      delete userData.picture

      userData.access_token = access_token

      // if the user doesn't exist already we will create it.
      var user = await promisify(User.findOrCreate({ uid: userData.uid }, userData ))

      // save the user in the session
      req.session.authenticated = user

      // finally we redirect to the home page
      res.redirect('http://localhost:8080/home')
    } catch (err) {
      return res.serverError(err)
    }
  },

  logout(req, res)  {

  }
};

