import { userFromDb } from '../../utils/user.js'
import { request } from '../../utils/util.js'
let app = getApp()

Page({
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/dreams'
    }
  },
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
    
    this.fetch("refresh")
  },
  fetch: function(direction){
    var that = this
    //console.log("direction: " + direction)
    let userId = app.globalData.userId
    let page = this.data.pagination.page_number || 1

    if(direction === "more"){
        page = page +1
    }else{
        page = 1
    }  
    let postsUrl = `https://api.dreamreality.cn/posts?page_size=10&page=${page}`
    if (userId){
      postsUrl = `${postsUrl}&user_id=${userId}`
    }
    request({
      url: postsUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET"})
      .then((res) => {
        let pagination = res.data.pagination
        let dreams = res.data.data;
        console.log(dreams);
        let len = dreams.length;
        let i = 0
        for (i = 0; i < len; i++) {
          if (dreams[i].favorited === true) {
            dreams[i].up_src = "up_button_blue"
          } else {
            dreams[i].up_src = "up_button"
          }

        }
        if (direction === "more" && dreams.length > 0) {
          dreams = this.data.dreams.concat(dreams)
        }
        if (dreams.length > 0) {
          this.setData({
            dreams: dreams,
            loading: true
          })
        }
        this.setData({
          pagination: pagination,
          loading: true
        })
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

    app.getUserInfo(function(userInfo){

      //console.log("user_id: " + user.id)
      //console.log("user_id2: " + app.globalData.userInfo.id)
      var fav = {
        favorite: {
          user_id: userInfo.id,
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

    })
    
  },
  refresh: function() {
    // 下拉刷新，重新加载数据； 
    // TODO，不重新加载，只更新对应列表；
    //console.log("pull");
    if (!this.data.loading) {
      return
    }

    setTimeout(()=>{
      this.setData({
        loading: false,
        scrollTop: 0
      })
      this.fetch("refresh")
    }, 300)
    
    //wx.stopPullDownRefresh();
    
    //this.onLoad({direction: "refresh"})
  },
  loadMore: function() {
    // Do something when pull down.
     //console.log('刷新')
    if (!this.data.loading){
      return 
    }

    //this.fetch("more")
    setTimeout(() => {
      this.setData({
        loading: false
      })
      this.fetch("more")
    }, 300)
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
    //console.log("id info ......." + id)
    //console.log("img info ......." + img)
    
  }
})
