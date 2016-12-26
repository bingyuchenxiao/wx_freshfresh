var app = getApp()
Page({
	data: {
		userInfo: {}
	},
	onLoad: function(){
		console.info(111111111111111111111111)
		console.info(app.globalData)
		var that = this
		//调用应用实例的方法获取全局数据
	    app.getUserInfo(function(userInfo){
	      //更新数据
	      console.info(3333)
	      that.setData({
	        userInfo:userInfo
	      })
	    })
		console.info(app.data)
	}
})