// pages/posts/posts.js
var app = getApp()
Page({
  data:{
    dream: null
  },

  formSubmit: function(e) {
    var d = e.detail.value
    var id = d.id
    d.progress = d.progress || 0 
    
      var dream = {
        post:{
          progress: d.progress
        }
      }
      var dreamStr = JSON.stringify(dream)
      this.update(dreamStr,id)

    
    console.log("user info .......")
    //console.log(app.globalData.userInfo)
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  update: function(dreamStr,id){
      //网络请求
      wx.request( {
        url: 'https://api.dreamreality.cn/posts/'+id,
        header: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        data: dreamStr,
        success: function( res ) {
          console.log("data:" + JSON.stringify(res.data.data))
          wx.showToast({
            title: '记得要坚持下去啊！',
            icon: 'success',
            duration: 2000
          })

        },
        fail: function(error){
            console.log(error)
        }
      });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    let userId = app.globalData.userId
    //网络请求
    var oneUrl = `https://api.dreamreality.cn/posts/${options.id}?user_id=${userId}`
    wx.request( {
      url: oneUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      
      success: function( res ) {
        //获取到了数据
        
        var dream = res.data;
        console.log( dream );
        that.setData( {
          dream: dream
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