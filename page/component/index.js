
//import Promise from '../utils/es6-promise.min';	
var app = getApp()
Page({
	data: {
		homepage:{}
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
			},
			fail: function (error) {
				//errorCallback(data);
			}
		});
	},
	
	onLoad: function(){
		this.getHomeInfo()
		
	}
})