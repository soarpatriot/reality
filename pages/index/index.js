//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    slogan: '梦想再大也不算大，再小也不嫌小',
    userInfo: {}
  },
  //事件处理函数
  goHope: function(){
    wx.navigateTo({
      url: '../dreams/dreams'
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this
    console.log("userInfo")
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      //console.log("userInfo")
      //console.log(userInfo)


      var user = {
        nickname: userInfo.nickName,
        gender: userInfo.gender,
        city: userInfo.city,
        province: userInfo.province,
        country: userInfo.country,
        openid: app.globalData.sessionInfo.openid,
        avatar_url: userInfo.avatarUrl
      }
   
      console.log(user)
      var userJson = JSON.stringify(user);
      console.log(userJson)
      //网络请求
      wx.request( {
        url: 'https://api.dreamreality.cn/users/me',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: userJson,
        success: function( res ) {
          console.log("data:" + JSON.stringify(res.data.data))
          that.setData({
            userInfo:res.data.data
          })
          app.globalData.userInfo = res.data.data
        },
        fail: function(error){
            console.log(error)
        }
      });
    })
    
  }
})
