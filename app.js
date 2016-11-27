//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log("code:"+res.code)
          var openIdUrl = "https://api.weixin.qq.com/sns/jscode2session?"+
          "appid=wx6ffc32b44af2c5a2&secret=78f22318240a013884282b9e309e3c41&js_code="
          +res.code+"&grant_type=authorization_code"
          
          wx.request( {
            url: openIdUrl,
            header: {
              "Content-Type": "application/json"
            },
            method: "GET",
    
            success: function( res ) {
              that.globalData.sessionInfo = res.data
              console.log(res);
              wx.getUserInfo({
                success: function (res) {
                  
                  //console.log("res" + res.userInfo)
                  that.globalData.userInfo = res.userInfo
                  typeof cb == "function" && cb(that.globalData.userInfo)
                },
                fail:function(data){
                  console.log("fail" + data)
                }
              })
            },
            fail: function(error){
                console.log(error)
            }
          });
          
        }
      })
    }
  },
  globalData:{
    sessionInfo: null,
    userInfo:null
  }
})