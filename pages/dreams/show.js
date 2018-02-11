// pages/dreams/show.js
var app = getApp()
import { previewImage } from '../templates/_post_images.js'

Page({
  data:{
    host: app.globalData.API_HOST,
    content:'',
    dream: { up_src: "up_button"}
  },

  formSubmit: function(e) {
    let d = e.detail.value
    let {content, postId } = d
    let userId = app.globalData.userId
    
    if (content == "" || postId == "" || userId<= 0){

        }else{

          console.log("content:"+content)
          var comment = {
            comment: {
              content: content,
              post_id: postId,
              user_id: userId
            }
          
          }
          var commentStr = JSON.stringify(comment)
          console.log("comment:"+ commentStr)
          this.comment(commentStr,postId)
          this.setData({
            content: ''
          })
          //e.detail.value.content = ""
        }
    
    
    //console.log("user info .......")
   
  },
  up: function (e) {
    //event.target.dataset.id 
    
    let userId = app.globalData.userId
    let postId = e.target.dataset.postId
    let dream = this.data.dream
    if (dream.up_src === "up_button_blue") {
      dream.up_src = "up_button"
    } else {
      dream.up_src = "up_button_blue"
    }

    let fav = {
      favorite: {
        user_id: userId,
        post_id: postId
      }
    }
    //网络请求
    wx.request({
      url: `${this.data.host}/favorites/up`,
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(fav),
      success: (res)=> {
        //获取到了数据
        console.log("success")
        let favorite = res.data.data;
        dream.count = favorite.count
        this.setData({
          dream: dream
        })

      },
      fail: function (error) {
        console.log(error)
      }
    });

  },
  comment: function(commentStr, postId){
      var that = this;
      //网络请求
      wx.request( {
        url: `${this.data.host}/comments`,
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
    let userId = app.globalData.userId
    //网络请求
    let oneUrl = `${this.data.host}/posts/${postId}?user_id=${userId}`
    wx.request( {
      url: oneUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      
      success: function( res ) {
        //获取到了数据
        
        let dream = res.data;
        dream.favorited ? dream.up_src = "up_button_blue" : dream.up_src = "up_button"
        //dream.up_src = "up_button"
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
  previewImage: previewImage
})