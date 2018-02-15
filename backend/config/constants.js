
const BACKEND_URL = "http://192.168.1.81:1337"
const FRONTEND_URL = "http://192.168.1.81:5000"

const FB_CONF = {
  client_id: '530745817303993',
  redirect_uri: BACKEND_URL + '/auth/login/',
  client_secret: '006152f869bb21fa43cc3f11301c2220'
}
const FB_LOGIN_URL = `https://www.facebook.com/v2.12/dialog/oauth?client_id=530745817303993&&response_type=code&redirect_uri=${ FB_CONF.redirect_uri }`


module.exports = {
  BACKEND_URL,
  FRONTEND_URL,
  FB_CONF,
  FB_LOGIN_URL
}
