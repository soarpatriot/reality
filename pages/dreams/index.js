import { request } from '../../utils/util.js'
import { previewImage } from '../templates/_post_images.js'

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
    host: app.globalData.API_HOST,
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
  up: function( e ){
      //event.target.dataset.id 
    this.animation.scale(2, 2).step()
    this.animation.scale(1, 1).step()

    
    let userId = app.globalData.userId
    let {index, postId } = e.target.dataset
    let dreams = this.data.dreams
    let an = {}

    // console.log(JSON.stringify(dreams))
    //const name = `animationData_${index}`
    //console.log(name)
    //an[name] = this.animation.export()
    this.setData({
      animationData0: this.animation.export()
    })
    // e.target.animation = animationData

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
      url: `${this.data.host}/favorites/up`,
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
  },
  thumbAnimation: function() {
    this.animation.scale(2, 2).step()
    this.animation.scale(1, 1).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  commented: function(e) {
    let userId = app.globalData.userId
    let { index, postId } = e.target.dataset
    let dreams = this.data.dreams
    let an = {}

    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    console.log(`index: ${index}`)
  },
  previewImage: previewImage
})
