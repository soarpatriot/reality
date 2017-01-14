var app = getApp()

Page({
  data: {
    pagination: {
       
    },
    scrollTop : 0,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    up: "up_button.png",
    dreams: [],
    animationData: {}
  },

  //view加载
  onLoad: function(options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    console.log( 'onLoad' )
    this.fetch("refresh")
  },
  fetch: function(direction){
    var that = this
    console.log("direction: " + direction)
    app.getUserInfo(function(userInfo){
        var page = that.data.pagination.page_number || 1
        if(direction === "more"){
           page = page +1
        }else{
           page = 1
        }
        console.log("page: " + page)
        //网络请求
        wx.request( {
          url: 'https://api.dreamreality.cn/posts?page_size=10&page='+ page,
          header: {
            "Content-Type": "application/json"
          },
          method: "GET",
          data: {user_id: userInfo.id},
          success: function( res ) {
            //获取到了数据
            console.log("success")
            var pagination = res.data.pagination
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
            if(direction === "more" && dreams.length > 0){
              dreams = that.data.dreams.concat(dreams)
            }
            if( dreams.length > 0){
              that.setData( {
                dreams: dreams,
                loading: true
              })

            }else{
              wx.showToast({
                title: '无更多数据',
                duration: 2000
              })
            }
            that.setData( {
              pagination: pagination,
              loading: true
            })
            
            //that.update()
          },
          fail: function(error){
              console.log(error)
          }
        });
    })
    
  },
  onShow: function(e) {

    var animation = wx.createAnimation({
      duration: 1000,
        timingFunction: 'ease',
    })

    this.animation = animation
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
    var user =  wx.getStorageSync('user')
    console.log("user_id: " + user.id)
    console.log("user_id2: " + app.globalData.userInfo.id)
    var fav = {
      favorite: {
        user_id: app.globalData.userInfo.id,
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
          loading: false,
          scrollTop : 0
    })

    this.fetch("refresh")
    //wx.stopPullDownRefresh();
    
    //this.onLoad({direction: "refresh"})
  },
  loadMore: function() {
    // Do something when pull down.
     console.log('刷新')
     this.setData( {
          loading: false
    })
    this.fetch("more")

    // this.onLoad({direction: "more"})
    // wx.stopPullDownRefresh();
   },
   scroll:function(event){
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
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
    //console.log("img info ......." + img)
    
  }
})
