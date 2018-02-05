import axios from 'axios'
// the credentials must be set to true for the sessions to work
axios.defaults.withCredentials = true 

export async function getUser() {
  var user = (await axios.get('http://192.168.1.66:1337/auth/user')).data.user
  return user
}

export async function logout() {
  var user = await axios.get('http://192.168.1.66:1337/auth/logout')
}