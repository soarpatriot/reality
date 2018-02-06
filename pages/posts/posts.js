// pages/posts/posts.js
var app = getApp()
Page({
  data:{
    dream: "",
    reality: "",
    progress: 0
  },

  formSubmit: function(e) {
    var d = e.detail.value
    d.progress = d.progress || 0 
    let user = app.user
    console.log(user)
    if(d.dream =="" || d.reality == ""){
      wx.showToast({
        title: '请填写梦想和现实！',
        icon: 'success',
        duration: 2000
      })
    }else{

      var dream = {
        dream: d.dream,
        //reality: d.reality,
        //progress: d.progress,
        user_id: user.id
      }
      
      var dreamStr = JSON.stringify(dream)
      console.log(dreamStr)
      this.post(dreamStr)

    }
   
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  post: function(dreamStr){
    var that = this
      //网络请求
      wx.request( {
        url: 'https://api.dreamreality.cn/posts',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: dreamStr,
        success: function( res ) {
          // console.log("data:" + JSON.stringify(res.data.data))
          that.setData({
            dream: "",
            reality: "",
            progress: 0
          })
          wx.showToast({
            title: '已发布，记得要坚持下去啊！',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){

              wx.switchTab({
                  url: '../dreams/index',
                    success: function(){
                        console.log('success');
                    },
                    fail: function(data){
                        console.log('fail:'+JSON.stringify(data));
                    }
              })
          },2000)
          
        },
        fail: function(error){
            console.log(error)
        }
      });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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