// pages/dreams/show.js
var app = getApp()
Page({
  data:{
    focus: false,
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
    const focus = options.focus || false
    console.log(focus)
    this.setData({
      focus: focus
    })
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
  focusComment: ()=> {

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
  onShareAppMessage: function (res) {
    let item = this.data.dream
    console.log(JSON.stringify(item))
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        let postId  = item.id
        const forward_count = item.forward_count
        console.log(forward_count)
       
        let forward = {
          post: {
            forward_count: forward_count + 1
          }
        }
        var forwardStr = JSON.stringify(forward)
        //网络请求
        wx.request({
          url: `${app.globalData.API_HOST}/posts/${postId}`,
          header: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          data: forwardStr,
          success: function (res) {
            console.log("data1111:" + JSON.stringify(res.data.data))
            let item = that.data.dream
            item.forward_count = res.data.data.forward_count
            that.setData({
              dream: item
            })

          },
          fail: function (error) {
            console.log(error)
          }
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})