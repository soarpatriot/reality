// pages/components/preview-image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: (e) => {
      const { src, group } = e.target.dataset
      const urls = group.map((i) => { return i.url })
      wx.previewImage({
        current: src,
        urls: urls,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})
