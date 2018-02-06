var app = getApp()

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
    let userId = app.globalData.userId
    
    
      //网络请求
      wx.request( {
        url: 'https://api.dreamreality.cn/posts/my',
        header: {
          "Content-Type": "application/json"
        },
        method: "GET",
        data: {user_id: userId},
        success: function( res ) {
          //获取到了数据
          console.log("success")
          var dreams = res.data.data;
          console.log( dreams );
          var len = dreams.length;
          var i = 0
          for(i = 0; i< len; i++ ){
            if(dreams[i].favorited === true){
              dreams[i].up_src = "up_button_blue"
            }else{
              dreams[i].up_src = "up_button"
            }
            
          }
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
  edit: function(e){
      var postId = e.target.dataset.postId
      wx.navigateTo({
            'open-type': 'redirect',
            url: '../posts/edit?id='+postId
      })
  },
  delete: function(e){
    var postId = e.target.dataset.postId
    var that = this
    wx.showModal({
      title: '删除',
      content: '确定删除这个梦想？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request( {
            url: 'https://api.dreamreality.cn/posts/'+postId,
            header: {
              "Content-Type": "application/json"
            },
            method: "DELETE",
            
            success: function( res ) {
              //获取到了数据
              console.log("delete")
              that.onLoad()
              
              
            },
            fail: function(error){
                console.log(error)
            }
          });
        }
      }
    })
    

  },

  up: function( e ){
      //event.target.dataset.id 
    var that = this
    var index = e.target.dataset.index
    var postId = e.target.dataset.postId
    var dreams = that.data.dreams
    if(dreams[index].up_src === "up_button_blue"){
      dreams[index].up_src = "up_button"
    }else{
      dreams[index].up_src = "up_button_blue"
    }
     
    this.setData( {
      dreams: dreams
    })
    let userId = app.globalData.userId
    console.log("user_id2: " + userId)
    var fav = {
      favorite: {
        user_id: userId,
        post_id: postId
      }
    }
    //网络请求
    wx.request( {
      url: 'https://api.dreamreality.cn/favorites/up',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(fav),
      success: function( res ) {
        //获取到了数据
        console.log("success")
        var favorite = res.data.data;
        dreams[index].count = favorite.count
        that.setData( {
          dreams: dreams
        })
        
      },
      fail: function(error){
          console.log(error)
      }
    });

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
