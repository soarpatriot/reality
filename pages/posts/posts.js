// pages/posts/posts.js
const qiniuUploader = require("../../utils/qiniuUploader")

var app = getApp()
Page({
  data:{
    host: app.globalData.API_HOST,
    dream: "",
    reality: "",
    images: [],
    progress: 0
  },
  delete: function(e) {
    let { index } = e.target.dataset
    console.log(index)
    this.data.images.splice(index, 1)
    this.setData({
      images: this.data.images
    })
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

      //console.log(`data dream: ${JSON.stringify(this.data.images)}`)
      //const transedImages = this.data.images.map((im) => { im.url = im.imageURL; return im})
      //console.log(`transedImages dream: ${JSON.stringify(transedImages)}`)
      var dream = {
        dream: d.dream,
        //reality: d.reality,
        progress: 0,
        user_id: user.id,
        images: this.data.images
      }
      
      var dreamStr = JSON.stringify(dream)
      console.log(`dream: ${dreamStr}`)
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
      count: 8,
      success: function (res) {
        
        let fileLength = res.tempFilePaths.length
        if (that.data.images.length + fileLength > 8){
          wx.showToast({
            title: '最多只能选择8张图片',
            duration: 2000
          }) 
        }else{
          for (let i = 0; i < fileLength; i++){
            qiniuUploader.upload(res.tempFilePaths[i], (res) => {

              console.log(JSON.stringify(res))
              let image = {
                hash: res.hash,
                key: res.key,
                url: res.imageURL
              }

              let images = that.data.images.concat(image)
              that.setData({
                'images': images,
              });
            }, (error) => {
              console.log('error: ' + error);
            }, {
                region: 'NCN',
                domain: 'https://static.dreamreality.cn',
                uptokenURL: `${that.data.host}/tokens/qiniu`
                // uptokenFunc: function () { return '[yourTokenString]'; }
            })
          }

        }
        // 交给七牛上传

      }

    })
  }

})