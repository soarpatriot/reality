// pages/components/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedTab: 0,
    tabs: [
      { name: 'Tab1' },
      { name: 'Tab2' },
      { name: 'Tab3' },
      { name: 'Tab4' },
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
        tabId: event.target.dataset.tabindex
      }
      this.triggerEvent('switch', detail) 
    }
  }
})
