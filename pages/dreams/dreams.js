Page({
  data: {
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    up: "up_button.png",
    dreams: [],
    animationData: {}
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
          dreams: dreams,
          loading: true
        })
        
        //that.update()
      },
      fail: function(error){
          console.log(error)
      }
    });
  },
  onShow: function(e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    var animation = wx.createAnimation({
      duration: 1000,
        timingFunction: 'ease',
    })

    this.animation = animation
  },
  up: function( e ){
      //event.target.dataset.id 
     console.log("up:::")
     console.log(JSON.stringify(e))
     console.log(e.target.dataset.dreamId)
  },
  refresh: function() {
    // 下拉刷新，重新加载数据； 
    // TODO，不重新加载，只更新对应列表；
    console.log("pull");
    this.setData( {
          loading: false
    })
    
    this.onLoad()
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
     console.log('刷新')
     this.setData( {
          loading: false
    })
    this.onLoad()
    wx.stopPullDownRefresh();
 },
  formSubmit: function(e) {
    var d = e.detail.value
    var id = d.id 
    var img = d.image
    //this.animation.scale(2, 2).step()
    //this.animation.scale(0.5,0.5).step()
    //this.setData({
    //  animationData: this.animation.export()
    //})
    this.setData({up: "up_button_blue.png"})
    console.log("id info ......." + id)
    console.log("img info ......." + img)
    
  }
})
