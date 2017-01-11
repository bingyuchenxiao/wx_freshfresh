//入口文件
import Promise from 'page/utils/es6-promise.min.js';	

App({
	globalData: {
		host: 'https://test1.freshfresh.com/mobile/v3/index/uri/',
		gateway: 'http://test2.freshfresh.com/gateway',
    	hasLogin: false,
    	userInfo: null
  	},
	onLaunch: function () {
    	console.log('App Launch And Login')
  	},

	getCustomerInfo: function(cb){
		var that = this
		
		if(!this.globalData.hasLogin || !this.globalData.userInfo){	
			var openid = wx.getStorageSync('openid')
			if(openid){
				console.info('getStorageSync-openID:'+openid)
				this.userLoginWithOpenId({data:{openid:openid}})
				.then(function(result) {
					that.setUserInfo(result,cb)
				})
				.catch(this.requestError);
			}else{
				this.wxLogin()
				.then(this.getOpenId)
				.then(this.userLoginWithOpenId)
				.then(function(result) {
					that.setUserInfo(result,cb)
				})
				.catch(this.requestError);
			}
		}	
	},
	wxLogin: function(){
		console.log('wxLogin')
		return new Promise((resolve, reject) => {
			wx.login({
				success: function(res){
					resolve(res)
				},
				fail: function(err) {
					reject(err)
				}
			})
		})
		
	},
	//用js_code获取openId
	getOpenId: function(res){
		console.log('getOpenId')
		console.info(res)
		return new Promise((resolve, reject) => {
			wx.request({
					url: `https://api.weixin.qq.com/sns/jscode2session`,
					data: {appid: 'wxabd548cfedd115f0',secret: '10cdb240ebdd97fe5a5c05664ff15597','js_code':res.code,grant_type:'authorization_code'},
					success: function (res) {
						wx.setStorage({
						  key: "openid",
						  data: res.data.openid
						})
						resolve(res)
					},
					fail: function (err) {
						reject(err)
					}
				})
		})
	},
	//用openid登录
	userLoginWithOpenId: function(res){
		console.log('userLoginWithOpenId')
		console.info(res.data.openid)
		return new Promise((resolve, reject) => {
			wx.request({
				url: `${this.globalData.host}customer.account.userLoginWithWechat`,
				data: {openid: res.data.openid},
				success: function (res) {		
					console.info(res.data)
					resolve(res)
				},
				fail: function (err) {					
					reject(err)
				}
			})
		})
	},
	setUserInfo: function(result,cb){
		if(result.data.result == 1){
			this.globalData.hasLogin = true
			this.globalData.userInfo = result.data.data
			wx.setStorage({
			  key: "customerId",
			  data: result.data.data.customerid
			})
			console.info('setUserInfo')
			console.info(this.globalData)
			typeof cb == "function" && cb(this.globalData.userInfo)
		}else{
			console.log('用户登录失败！' + result.errMsg)
		}
	},
	requestError: function(err){
		console.log(err)
		console.log('requestERROR')
	},
	/*
	onLoad: function(){
		this.requestA()
		.then(
			//用js_code获取openId
			this.requestB
			//return util.request(`${app.globalData.host}customer.account.userLoginWithWeixcx`,{js_code: resA.code});
		)
		.then(this.requestC)
		.catch(this.requestError);
		
	}*/

})