
//import Promise from '../utils/es6-promise.min';	
var app = getApp()
Page({
	data: {
		homepage:{},
		display: "none",
		animationImage: "",
		animationData: {}
	},
	getHomeInfo: function () {
		var uId = parseInt(wx.getStorageSync("customerId"))
		console.log(`uid:${uId}`)
		if(!uId){
			uId = 0
		}
		wx.request({
			url: `${app.globalData.gateway}`,
			data: {module: "appguide", version: "3.0", method: "HomePageManager.GetHomePageInfo",timeStamp: new Date().getTime(),bizContent: {"UserUid":uId}},
			success: (res) => {
				this.setData({
					homepage: res.data.data.homepage
				})
				wx.setStorageSync('navData', res.data.data.homepage)
			},
			fail: function (error) {
				//errorCallback(data);
			}
		});
	},
	
	onLoad: function(){
		this.getHomeInfo()
	},
	tapCategory: function(e){
		var categoryID = e.currentTarget.dataset.categoryid
		console.log(`category/index?categoryID=${categoryID}`)
		wx.switchTab({
		  url: `category/index?categoryID=${categoryID}`,
		  fail: function(error){
			console.log(error)
		  }
		})
	},
	addCart: function(e){
		console.log(e)
		var cart = wx.getStorageSync('cart');
		var id = e.currentTarget.dataset.pid
		if(cart){
			cart.push(id)
		}else{
			cart = []
		}
		wx.setStorageSync('cart',cart);
		console.info(wx.getStorageInfoSync())
		this.setData({
	      animationImage: e.currentTarget.dataset.img,
	      display: "block"
	    })
	    //return

		var animation = wx.createAnimation({
	        duration: 5000,
	        timingFunction: 'ease',
	    })

	    this.animation = animation
	    animation.scale(0.4).opacity(1).rotate(45)
	    animation.translate(380, -1400).step({ duration: 1500 })
	    console.info(e.currentTarget.dataset.img)
	    this.setData({
	      animationData: animation.export()
	    })
	},
	onShareAppMessage: function(){
	    return {
	      title: '我的两鲜',
	      desc: '我的两鲜描述',
	      path: '/page/component/index?id=123'
	    }
  	}
})