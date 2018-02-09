// pages/posts/posts.js
const qiniuUploader = require("../../utils/qiniuUploader")

var app = getApp()
Page({
  data:{
    host: app.globalData.API_HOST,
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
        url: `${this.data.host}/posts`,
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
  },
  didPressChooseImage: function () {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 9,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
          that.setData({
            'imageURL': res.imageURL,
          });
        }, (error) => {
          console.log('error: ' + error);
        }, {
            region: 'NCN',
            domain: 'bzkdlkaf.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
            // key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
            uptoken: '[yourTokenString]', // 由其他程序生成七牛 uptoken
            uptokenURL: 'UpTokenURL.com/uptoken', 
            uptokenFunc: function () { return '[yourTokenString]'; }
          })
      }

    })
  }

})