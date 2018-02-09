// pages/my/index.js
var app = getApp()
Page({
  data:{
    host: app.globalData.API_HOST
   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
       
    //网络请求
    
    let userId = app.globalData.userId
    var oneUrl = `${this.data.host}/users/${userId}`
    wx.request( {
      url: oneUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      
      success: function( res ) {
        //获取到了数据
        console.log("success")
        var user = res.data.data;
        console.log( user );
        that.setData( {
          user: user
        })
        //that.update()
      },
      fail: function(error){
          console.log(error)
      }
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})