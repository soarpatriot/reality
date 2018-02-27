// pages/components/post.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null,
    },
    index: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    host: app.globalData.API_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    up: function (e) {
      //event.target.dataset.id 

      let userId = app.globalData.userId
      let { index, postId } = e.target.dataset
      let item = this.properties.item
      let an = {}

      item.up_src === "up_button_blue" ? item.up_src = "up_button" : item.up_src = "up_button_blue"

      this.setData({
        item: item
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
          item.count = favorite.count
          this.setData({
            item: item
          })

        },
        fail: function (error) {
          console.log(error)
        }
      });

    }
  }
})
