
//var utils = require('../../utils/util.js')
import { randowSlogn,request } from '../../utils/util.js'
let app = getApp()
var page = {

    data: {
      host: app.globalData.API_HOST,
        // text:"这是一个页面"
        slogan: randowSlogn(),
        animationData: {}
    },
    onLoad: function () {

    },

    onShow: function () {
      
        // 页面显示的时候的动画
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease-in-out',
            transformOrigin: "50% 50%",
        })
        this.animation = animation

        animation.scale(1).opacity(0).step()

        this.setData({
            animationData: animation.export(),
        })

        setTimeout(function () {
            animation.scale(1, 1).opacity(1).step()
            this.setData({
                animationData: animation.export(),
            })
        }.bind(this), 1000)
        
        //console.log("show")
        setTimeout(() => {
            //console.log("show  30000")
          app.getUserInfo().then((res)=>{
            app.user = res.userInfo
            //console.log("mmmmm user info:  " + JSON.stringify(res))
            let user = app.user
            
            let userStr = {
              province: user.province,
              openid: res.session.openid,
              nickname: user.nickName,
              
              gender: user.gender,
              country: user.country,
              city: user.city,
              avatar_url: user.avatarUrl
            }
            return request({
              url: `${this.data.host}/users/me`,
              header: {
                "Content-Type": "application/json"
              },
              data: userStr,
              method: "POST"
            })
            
          }).then((res) =>{
            // set the save user id
            app.user.id = res.data.data.id
            app.globalData.userId = res.data.data.id
    
            //console.log("after save info:  " + JSON.stringify(res))
            //console.log("after save info:  " + JSON.stringify(app.user))
            wx.switchTab({
              url: '../dreams/index',
              success: function () {
                //console.log('success');
              },
              fail: function (data) {
                console.log('fail:' + JSON.stringify(data));
              }
            })
          })
        },3000)
        
    }

}
Page(page)
