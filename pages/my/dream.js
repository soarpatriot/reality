import { request } from '../../utils/util.js'

let app = getApp()

Page({
  data: {
    host: app.globalData.API_HOST,
    pagination: {

    },
    up: "up_button.png",
    dreams: [],
    animationData: {}
  },

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
  //view加载
  //view加载
  onLoad: function (options) {
    wx.showNavigationBarLoading()

    this.fetch("refresh")
  },
  fetch: function (direction) {
    let host = app.globalData.API_HOST
    let userId = app.globalData.userId
    let page = this.data.pagination.page_number || 1

    direction === "more" ? page++ : page = 1

    let postsUrl = `${host}/posts/my?user_id=${userId}&page_size=10&page=${page}`
    if (userId) {
      postsUrl = `${postsUrl}&user_id=${userId}`
    }
    request({
      url: postsUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET"
    })
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
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request( {
            url: `${this.data.host}/posts/${postId}`,
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

  up: function (e) {
    //event.target.dataset.id 

    let userId = app.globalData.userId
    let { index, postId } = e.target.dataset
    let dreams = this.data.dreams

    dreams[index].up_src === "up_button_blue" ? dreams[index].up_src = "up_button" : dreams[index].up_src = "up_button_blue"

    this.setData({
      dreams: dreams
    })
    let fav = {
      favorite: {
        user_id: userId,
        post_id: postId
      }
    }
    //网络请求
    wx.request({
      url: `${this.data.host}/favorites/up`,
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(fav),
      success: (res) => {
        //获取到了数据
        // console.log(JSON.stringify(res))
        var favorite = res.data.data;
        dreams[index].count = favorite.count
        this.setData({
          dreams: dreams
        })

      },
      fail: function (error) {
        console.log(error)
      }
    });

  },
  refresh: function () {
    this.fetch("refresh")
  },
  loadMore: function () {

    this.fetch("more")

  },
})
