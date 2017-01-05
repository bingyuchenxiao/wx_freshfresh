//import Promise from '../libs/es6-promise';
/*var Promise = require('../libs/es6-promise.js') 

var request = (method = 'GET') => (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        resolve(res.data)
      },
      fail: function(err) {
        reject(err)
      }
    });
  })
}

export const get = request('GET');
export const post = request('POST');
export const put = request('PUT');
export const del = request('DELETE');

module.exports = {  
  request: Promise
}
*/
/*let pro = new Promise(function(resolve,reject){
			if(true){
				resolve('请求成功')
			}else{
				reject('请求失败')
			}
		});
*/
import Promise from 'es6-promise.min';

function request(url,data){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: data,
      header: {
        //'Content-Type': 'application/json'
      },
      async : false,
      success: function(res) {
        console.log("success")
        console.info(res)
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.info(res)
        console.log("failed")
      }
    })
  })
}

/*export const request = (url, data) => {
  //console.info(url,data)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.info(res)
        resolve(res.data)
      },
      fail: function(err) {
        console.info(err)
        reject(err)
      }
    });
  })
}
*/

//module.exports.request = request;
//export const get = request('GET');
//export const post = request('POST');
//export const del = request('DELETE');

module.exports.request = request;