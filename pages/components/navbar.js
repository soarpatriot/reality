// pages/components/navbar.js
import { request } from '../../utils/util.js'
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  created: function() {
    const boardUrl = `${this.data.host}/boards`
    console.log(JSON.stringify(boardUrl))
    request({url: boardUrl, header: {
      "Content-Type": "application/json"
      },
      method: "GET"}).then((res) => {
      const boards = res.data.data
      const all = this.data.tabs.concat(boards)
      console.log(JSON.stringify(boards))
      this.setData({
        tabs: all
      })

    }).catch(function(res){
      console.log(JSON.stringify(res))
      console.log("aa")
    })
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    host: app.globalData.API_HOST,
    selectedTab: 0,
    tabs: [
      {id: 0, name:"全部", description: "全部"}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab: function (event) {
      if (event.target.dataset.tabindex !== this.data.selectedTab) {
        let selectedTabIndex = event.target.dataset.tabindex;
        this.setData({
          selectedTab: selectedTabIndex
        });
      }
      let detail = {
        boardId: event.target.dataset.boardId,
        tabId: event.target.dataset.tabindex
      }
      
      this.triggerEvent('switch', detail) 
    }
  }
})
