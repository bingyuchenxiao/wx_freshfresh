import request from '../utils/es6Promise.js'

var app = getApp()
Page({
	data: {
		list: [
			{
				"name": "张三" ,
				"gender": "女"
			}
		]
	},
	getAccountInfo: function (res) {
		
		wx.request({
			url: `${app.globalData.host}customer.account.userLoginWithWeixcx`,
			data: {js_code: res.code},
			success: function (res2) {			
				//callback(data);
				return res2
			},
			fail: function (res) {
				//errorCallback(data);
			}
		});
	},
	onLoad: function(){
		var m = [];
		for(var i=0; i<=5;i++){
			m[i] = function(){
				console.info(i)
			}
		}

		var n = [];
		for(let k=0; k<=5;k++){
			n[k] = function(){
				console.info(k)
			}
		}
		console.info(i)
		console.info(m[2])
		console.info(n[2])
		m[2]()
		n[2]()

		var [a,b,name] = [1,2,3]
		console.info(name)
		console.info(`My name is ${name}`)

		var [a,b] = 'ab'
		console.info(b)
		var {name,age} = {name:'name0',age:'age'}
		console.info(name)
		console.info(age)

		var x = 1;
		var y = 2;
		//console.info(y)
		[x,y] = [y,x];
		console.info(x);
		(function(){
			console.info('!!!!!')
		})();
		!function(){
			console.info('!!!!!')
		}();
		+function(){
			console.info('++++++')
		}()
		~function(){
			console.info('~~~~')
		}()

		var str = 'abc'
		var arr = Array.from(str)
		console.info(arr)
		for(var i of arr){
			console.info(i)
		}
		arr.forEach(function(value,index){
			console.log(`${index}:${value}`)
		})

		var a = 11
		var b = '11'
		console.info(a == b)
		console.info(a === b)

		var obj = {a:1,b:2}
		for(let i in obj){
			console.info(`${i}:${obj[i]}`)
		}
	
		var person = {name: "zhang",money:100}
		var proxy = new Proxy(person,{
			get: function(target,property){
				console.info(target,property)
				if(property == 'money' && target[property] < 100){
					return "您的余额不足"
				}
				console.info()
				return `您的余额为${target[property]}`
			},
			set: function(target,property){

			}
		})
		
		console.info(proxy.money)
		console.info(person.name)

		/*var helloWorld = function(ready) {
			return new Promise(function (resolve, reject) {
				if (ready) {
					resolve("Hello World!");
				} else {
					reject("Good bye!");
				}
			});
		}

		helloWorld(true).then(function (message) {
			alert(message);
		}, function (error) {
			alert(error);
		});*/

		/*let pro = new Promise(function(resolve,reject){
			if(true){
				resolve('请求成功')
			}else{
				reject('请求失败')
			}
		});

		pro.then(requestA)
				.then(requeatB)
				.catch(requestError);

		function requestA(){
			console.log('A')
		}
		function requestB(){
			console.log('B')
		}
		function requestError(){
			console.log('error')
		}*/

		
		request(wx.login)
		.then(
			(res) => {
				console.info(res)
				//this.getAccountInfo(res)
				/*wx.request({
					url: `${app.globalData.host}customer.account.userLoginWithWeixcx`,
					data: {js_code: res.code}
				})
				*/
				
					request({
						url: `${app.globalData.host}customer.account.userLoginWithWeixcx`,
						data: {js_code: res.code}
					})
				

			}
		)
		.then(
			function(res1){
				console.info(111)
				console.info(res1)
			}
		)
		.catch(function (rej) {
			console.error(rej)
		})


		var util = require('../utils/util')
		var getPromisified = util.wxPromisify(wx.login)

		getPromisified()
		.then(
			(res) => {
				console.info(res)
				//this.getAccountInfo(res)
				/*wx.request({
					url: `${app.globalData.host}customer.account.userLoginWithWeixcx`,
					data: {js_code: res.code}
				})
				*/
				util.wxPromisify(
					wx.request({
						url: `${app.globalData.host}customer.account.userLoginWithWeixcx`,
						data: {js_code: res.code},
						success: function(se){
							return se	
						}
					})
				)

			}
		)
		.then(
			function(res1){
				console.info(111)
				console.info(res1)
			},
			function(error){
				console.info(2222)
				console.info(error)
			}
		)
		.catch(function (rej) {
			console.error(rej)
		})		

		/*var helloWorld = function(ready) {
			return new Promise(function (resolve, reject) {
				if (ready) {
					resolve("Hello World!");
				} else {
					reject("Good bye!");
				}
			});
		}

		helloWorld(true).then(
			function (message) {
				alert(message);
			}, 
			function (error) {
				alert(error);
			}
		);*/

	}
})