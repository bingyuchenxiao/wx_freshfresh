
App({
	globalData: {
    	hasLogin: false,
    	userInfo: null
  	},
	onLaunch: function () {
    	console.log('App Launch And Login')
		/*this.setData({
			hasLogin: this.data.hasLogin
		})*/
		//console.log(this.globalData)
		//this.login()
  	},
	getUserInfo: function(cb){
		var that = this
		if(this.globalData.userInfo){
			typeof cb == "function" && cb(this.globalData.userInfo)
		}else{
			wx.login({
				success: function(res) {
					console.log(2222222)
					console.log(res)
					if (res.code) {
						//发起网络请求
						wx.request({
							url: 'http://test1.freshfresh.com/mobile/v4/index/uri/customer.account.userLoginWithWeixcx',
							data: {
								js_code: res.code
							},
							success: function(result){
								console.log(333333)
								console.log(result)
								if(result.data.result == 1){
									console.log(2222)
									that.globalData.hasLogin = true
									that.globalData.userInfo = result.data.data
									console.log(that.globalData)
									typeof cb == "function" && cb(that.globalData.userInfo)
								}else{
									console.log('用户登录失败！' + res.errMsg)
								}	
							},
							fail: function(result){
								console.log(44444)
								console.log(result.errMsg)
							}
						})
					} else {
						console.log('获取用户登录态失败！' + res.errMsg)
					}
				}
			})
		}
		
	}
})