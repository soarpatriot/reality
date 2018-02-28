// pages/components/pull-load.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    host: app.globalData.API_HOST,
    pagination: {

    },
    scrollTop: 0,


    up: "up_button.svg",
    dreams: [],
    isHideLoadMore: true,
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    onLoad: function (options) {
      wx.showNavigationBarLoading()

      this.fetch("refresh")
    },
    fetch: function (direction) {

      let userId = app.globalData.userId
      let page = this.data.pagination.page_number || 1

      direction === "more" ? page++ : page = 1

      let postsUrl = `${this.properties.url}?page_size=10&page=${page}`
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
    onShow: function (e) {

      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })

      this.animation = animation
    },
    refresh: function () {
      this.fetch("refresh")
    },
    loadMore: function () {

      this.fetch("more")

    }

  }
})
