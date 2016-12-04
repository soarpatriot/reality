Page({
  data: {
    dreams: []
  },

  //view加载
  onLoad: function() {
    console.log( 'onLoad' )
    var that = this

    //网络请求
    wx.request( {
      url: 'https://api.dreamreality.cn/posts',
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      
      success: function( res ) {
        //获取到了数据
        console.log("success")
        var dreams = res.data.data;
        console.log( dreams );
        that.setData( {
          dreams: dreams
        })
        //that.update()
      },
      fail: function(error){
          console.log(error)
      }
    });
  },

  formSubmit: function(e) {
    var d = e.detail.value
    var id = d.id 
    
    console.log("id info ......." + id)
    
  }
})
