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
  data: {
    host: app.globalData.API_HOST,
    pagination: {
       
    },
    scrollTop : 0,

    url: `${app.globalData.API_HOST}/posts`,
    up: "up_button.svg",
    dreams: [],
    isHideLoadMore: true,
    animationData: {},
    sharedUrl: ''
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

    let postsUrl = `${this.data.host}/posts?page_size=10&page=${page}`
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
  refresh: function() {
    this.fetch("refresh")
  },
  loadMore: function() {

    this.fetch("more")

  },

  /**
   * 
   *   scroll:function(event){
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
   */

  thumbAnimation: function() {
    this.animation.scale(2, 2).step()
    this.animation.scale(1, 1).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  onShareAppMessage: function () {
    return {
      title: '标题',
      path: `${this.data.sharedUrl}`,
      success: function (res) {
        console.log('success')
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  
})
