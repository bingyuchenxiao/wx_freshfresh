var app = getApp()
Page({
	data: {
		userInfo: {}
	},
	onLoad: function(){
		console.info(app.globalData)
		var that = this
		//调用应用实例的方法获取全局数据
	    app.getCustomerInfo(function(userInfo){
	      //更新数据
	      console.info(3333)
	      that.setData({
	        userInfo:userInfo
	      })
	    })
		console.info(app.data)
	},
	filterOrder: function(event){
		
		var filter = event.currentTarget.dataset.filter
		console.log(event)
		console.log(filter)
		wx.navigateTo({
		  url: `../order/index?filter=${filter}`
		})
	}

})