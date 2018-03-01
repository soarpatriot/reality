// pages/components/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
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
    commented: (e)=> {
      //console.log(this.properties)
      let { postId } = e.target.dataset
      console.log(postId)
      wx.navigateTo({
        url: `/pages/dreams/show?id=${postId}&focus=true`
      })
    }
  }
})
