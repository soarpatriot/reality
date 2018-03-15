// pages/components/board-picker.js
let app = getApp()
import { randowSlogn, request } from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    host: app.globalData.API_HOST,
    index: 0,
    selectedId: 0,
    boards: []
  },
  created: function(){
    
    const boardUrl = `${this.data.host}/boards`
    console.log(boardUrl)
    request({
      url: boardUrl,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET"
    }).then((res) => {
      
      const boards = res.data.data
      console.log(JSON.stringify(boards))
      this.setData({
        boards: boards,
        selectedId: boards[0].id
      }) 
      
        //console.log(JSON.stringify(res.data.data))
      }).catch((res) => {

      })
      
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function(e){
      console.log("aa")
      console.log('picker发送选择改变，携带值为', JSON.stringify(e.detail))
      const selected = this.data.boards[e.detail.value]
      this.setData({
        index: e.detail.value,
        selectedId: selected.id
      })
      this.triggerEvent('selected', selected, {})
    }
  }
})
