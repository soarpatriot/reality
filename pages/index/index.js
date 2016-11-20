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
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    /*app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })*/
  }
})
