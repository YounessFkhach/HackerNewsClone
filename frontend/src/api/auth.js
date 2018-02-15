import axios from 'axios'
import { BACKEND_URL } from '@/config/conf'
// the credentials must be set to true for the sessions to work
axios.defaults.withCredentials = true 


export async function getUser() {
  var user = (await axios.get(BACKEND_URL + '/auth/user')).data.user
  return user
}

export async function logout() {
  var user = await axios.get(BACKEND_URL + '/auth/logout')
}