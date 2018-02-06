import { userFromDb } from '../../utils/user.js'
import { request } from '../../utils/util.js'
let app = getApp()

Page({
  onPullDownRefresh: function () {
    console.log("pull")
    wx.showNavigationBarLoading()
    this.fetch("refresh")
    
  },
  onReachBottom: function () {
    console.log('加载更多')
    this.setData({
      isHideLoadMore: false
    })
    this.loadMore()
  },
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


    up: "up_button.png",
    dreams: [],
    isHideLoadMore: true,
    animationData: {}
  },

  //view加载
  onLoad: function(options) {
    wx.showNavigationBarLoading()
    
    this.fetch("refresh")
  },
  fetch: function(direction){
  
    let userId = app.globalData.userId
    let page = this.data.pagination.page_number || 1

    direction === "more" ? page++ : page = 1

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
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh()
        this.setData({
          isHideLoadMore: true
        })
        let pagination = res.data.pagination
        let pulledDreams = res.data.data
        let dreams = this.data.dreams
        // console.log(pulledDreams);

        pulledDreams.map((dream) => {
          dream.favorited === true ? dream.up_src = "up_button_blue" : dream.up_src = "up_button"
        })

        if (pulledDreams.length > 0) {
          direction === "more" ? dreams = this.data.dreams.concat(pulledDreams) : dreams = pulledDreams
          this.setData({
            dreams: dreams

          })
        }
        this.setData({
          pagination: pagination,
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
    
    let userId = app.globalData.userId
    let {index, postId } = e.target.dataset
    let dreams = this.data.dreams

    dreams[index].up_src === "up_button_blue" ? dreams[index].up_src = "up_button" : dreams[index].up_src = "up_button_blue"

    this.setData( {
      dreams: dreams
    })
    let fav = {
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
      success: ( res ) => {
        //获取到了数据
        // console.log(JSON.stringify(res))
        var favorite = res.data.data;
        dreams[index].count = favorite.count
        this.setData( {
          dreams: dreams
        })
        
      },
      fail: function(error){
          console.log(error)
      }
    });
    
  },
  refresh: function() {
    this.fetch("refresh")
  },
  loadMore: function() {

    this.fetch("more")

  },
  scroll:function(event){
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  }

})
