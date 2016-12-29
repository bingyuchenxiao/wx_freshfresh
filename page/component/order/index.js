// page/component/order/index.js
var app = getApp()
Page({
  data:{
    filter: {page: 1,pagesize: 10,filter: 'all'},
    order: {},
    loadingHidden : false,
    toastHidden: {
      hidden: true,
      errorMsg: '请求异常'
    }
  },
  toastChange: function(){
    this.setData({
      toastHidden:{
        hidden: true
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.info(app.globalData)
    var that = this
    if(!app.globalData.hasLogin){
      app.getUserInfo(function(userInfo){
        //更新数据
        console.info(3333)
        /*that.setData({
          userInfo:userInfo
        })*/
      }) 
      console.info(4444444)
      console.info(app.globalData.userInfo)
    }
    that.getUserOrderList()
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
  getUserOrderList: function(){
    console.info(666666666666)
    console.info(this)
    var that = this
    wx.request({
        url: `${app.globalData.host}customer.account.getuserorderlist`,
        data: {
          token: app.globalData.userInfo.userToken,
          filter: that.data.filter.filter,
          page: that.data.filter.page,
          pagesize: that.data.filter.pagesize
        },
        success: function(result){
          console.log(result)
          if(result.data.result == 1){
            that.setData({
              order: result.data.data,
              loadingHidden: true,
              filter: {page: that.data.filter.page+1, pagesize: that.data.filter.pagesize,filter: that.data.filter.filter }
            })
            //typeof cb == "function" && cb(that.globalData.userInfo)
          }else{
            that.setData({
              toastHidden: {
                hidden: false,
                errorMsg: result.data.errMsg
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
  onReachBottom: function(){
    console.info('bottom------------')
    //var oprions = {'filter':'all','pagesize':this.data.pagesize,"page":this.data.page}
    this.getUserOrderList()
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