
import { wxPromisify, request} from './util.js'

let login = wxPromisify(wx.login)

let userInfo = wxPromisify(wx.getUserInfo)
let userFromDb = (id) => {
  return request({
    url: `https://api.dreamreality.cn/users/${id}`,
    header: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
}
export { login, request, userInfo, userFromDb}