// page/component/order/index.js
var app = getApp()
Page({
  data:{
    order: {},
    loadingHidden : false,
    toastHidden: {
      hidden: true,
      errorMsg: '请求异常'
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.info(app.globalData)
    var that = this
    if(!app.globalData.hasLogin){

    }
    wx.request({
      url: 'http://test1.freshfresh.com/mobile/v4/index/uri/customer.account.getuserorderlist',
      data: {
        token: app.globalData.userInfo.userToken,
        filter: options.filter,
        page: options.page,
        pagesize: options.pagesize
      },
      success: function(result){
        console.log(result)
        if(result.data.result == 1){
          that.setData({
            order: result.data.data,
            loadingHidden: true
          })
          //typeof cb == "function" && cb(that.globalData.userInfo)
        }else{
          that.setData({
            toastHidden: {
              hidden: false,
              errorMsg: result.errMsg
            }
          })
          console.log('用户获取订单列表失败！' + result.errMsg)
        }	
      },
      fail: function(fresult){
        console.info(111111)
        console.log(fresult)
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  //图片滚动
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})