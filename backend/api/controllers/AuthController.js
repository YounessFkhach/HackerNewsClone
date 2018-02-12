/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var axios = require('axios')
var promisify = require('../tools/promisify').promisify

const conf = {
  client_id: '530745817303993',
  redirect_uri: 'http://192.168.1.66:1337/auth/login',
  client_secret: '006152f869bb21fa43cc3f11301c2220'
}

const redirectURI = 'http://192.168.1.66:5000/#'

module.exports = {
  signin: (req, res) => {
    res.redirect('https://www.facebook.com/v2.12/dialog/oauth?client_id=530745817303993&&response_type=code&redirect_uri=http://192.168.1.66:1337/auth/login')
  },

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
      userData.fbid = userData.id
      delete userData.id

      userData.profile_pic = userData.picture.data.url
      delete userData.picture

      userData.access_token = access_token
      userData.full_name = userData.first_name + ' ' + userData.last_name

      // if the user doesn't exist already we will create it.
      var user = await promisify(User.findOrCreate({ fbid: userData.fbid }, userData ))

      // save the user in the session
      req.session.user = user
      req.session.authenticated = true
      res.send()
      console.log(user.first_name, user.last_name)

      // finally we redirect to the home page
      res.redirect(redirectURI)
    } catch (err) {
      return res.serverError(err)
    }
  },

  user: (req, res) => {
    res.json({
      user: req.session.user
    })
  },

  logout(req, res)  {
    req.session.authenticated = false
    delete req.session.user

    res.status(200)
    res.send()
  },
};

