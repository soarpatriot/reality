
import { wxPromisify, request} from './util.js'
import { HOST } from './config.js';
let login = wxPromisify(wx.login)

let userInfo = wxPromisify(wx.getUserInfo)
let userFromDb = (id) => {
  return request({
    url: `${HOST}/users/${id}`,
    header: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
}
export { login, request, userInfo, userFromDb}