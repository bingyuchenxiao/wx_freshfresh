import Promise from '../libs/es6-promise';
export const request = (method = 'GET') => (url, data) => {
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