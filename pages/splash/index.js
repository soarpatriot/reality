
var utils = require('../../utils/util.js')
var app = getApp()
var page = {

    data: {
        // text:"这是一个页面"
        slogan: utils.randowSlogn(),
        animationData: {}
    },
    onLoad: function () {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this
        console.log("userInfo")
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
        //更新数据
        //console.log("userInfo")
        //console.log(userInfo)


        var user = {
            nickname: userInfo.nickName,
            gender: userInfo.gender,
            city: userInfo.city,
            province: userInfo.province,
            country: userInfo.country,
            openid: app.globalData.sessionInfo.openid,
            avatar_url: userInfo.avatarUrl
        }
    
        console.log(user)
        var userJson = JSON.stringify(user);
        console.log(userJson)
        //网络请求
        wx.request( {
            url: 'https://api.dreamreality.cn/users/me',
            header: {
            "Content-Type": "application/json"
            },
            method: "POST",
            data: userJson,
            success: function( res ) {
            console.log("data:" + JSON.stringify(res.data.data))
            that.setData({
                userInfo:res.data.data
            })
            app.globalData.userInfo = res.data.data
            },
            fail: function(error){
                console.log(error)
            }
        });
      })
    },
    onShow: function () {

        // 页面显示的时候的动画
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease-in-out',
            transformOrigin: "50% 50%",
        })
        this.animation = animation

        animation.scale(1).opacity(0).step()

        this.setData({
            animationData: animation.export(),
        })

        setTimeout(function () {
            animation.scale(1, 1).opacity(1).step()
            this.setData({
                animationData: animation.export(),
            })
        }.bind(this), 1000)
        
        console.log("show")
        setTimeout(function(){
            console.log("show  30000")
        	wx.switchTab({
	            url: '../dreams/dreams',
                success: function(){
                    console.log('success');
                },
                fail: function(data){
                    console.log('fail:'+JSON.stringify(data));
                }
	        })
        },5000)
        


    }

}
Page(page)
