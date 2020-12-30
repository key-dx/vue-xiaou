import axios from 'axios'
import store from '../../store'

function get(url, params = {}) {
  return new Promise((reslove, reject) => {
    axios({
      url,
      params,
      headers: {
        authorization: store.state.userinfo.token ? store.state.userinfo.token : ""
      }
    }).then(res => {
      reslove(res)
    }).catch(err => {
      reject(err)
    })
  })
}
function post(url, data) {
  return new Promise((reslove, reject) => {
    axios({
      url,
      method: 'post',
      data,
      headers: {
        authorization: store.state.userinfo.token ? store.state.userinfo.token : ""
      }
    }).then(res => {
      reslove(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default { post, get }