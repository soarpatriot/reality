// pages/dreams/show.js
var app = getApp()

Page({
  data:{
    
    content:'',
    dream: {}
  },

  formSubmit: function(e) {
    var d = e.detail.value
    var content = d.content
    var postId = d.postId
    var that = this;
    app.getUserInfo(function(userInfo){
        if(content =="" || postId == "" || userInfo.id<= 0){

        }else{

          console.log("content:"+content)
          var comment = {
            comment: {
              content: content,
              post_id: postId,
              user_id: userInfo.id
            }
          
          }
          var commentStr = JSON.stringify(comment)
          console.log("comment:"+ commentStr)
          that.comment(commentStr,postId)
          that.setData({
            content: ''
          })
          //e.detail.value.content = ""
        }
    })
    
    //console.log("user info .......")
   
  },

  comment: function(commentStr, postId){
      var that = this;
      //网络请求
      wx.request( {
        url: 'https://api.dreamreality.cn/comments',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: commentStr,
        success: function( res ) {
          console.log("data1111:" + res.data.data)
          wx.showToast({
            title: '已评论！',
            icon: 'success',
            duration: 2000
          })

          that.load(postId)

        },
        fail: function(error){
            console.log(error)
        }
      });
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  onLoad:function(options){
    var postId = options.id
    this.load(postId)
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
  },
  load: function(postId){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
       
    //网络请求
    var oneUrl = "https://api.dreamreality.cn/posts/"+postId
    wx.request( {
      url: oneUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      
      success: function( res ) {
        //获取到了数据
        console.log("success")
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
  }
})