// pages/dreams/show.js
Page({
  data:{
    
    dream: {}
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
       
    //网络请求
    var oneUrl = "https://api.dreamreality.cn/posts/"+options.id
    wx.request( {
      url: oneUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      
      success: function( res ) {
        //获取到了数据
        console.log("success")
        var dream = res.data.data;
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