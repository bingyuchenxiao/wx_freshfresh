// page/component/order/index.js
var app = getApp()
Page({
  data:{
    userInfo: "",
    filter: {page: 1,pagesize: 10,filter: 'all'},
    order: {
      orderlist : [],
      ordertotal : 0
    },
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
    console.info(options)
    var filter = options.filter ? options.filter : this.data.filter.filter
    wx.setStorageSync('filter',filter)
    var that = this
    if(!app.globalData.hasLogin){
      app.getUserInfo(function(userInfo){
        //更新数据
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

  getUserOrderList: function(){
    var that = this
    var filter = wx.getStorageSync('filter')
    wx.request({
        url: `${app.globalData.host}customer.account.getuserorderlist`,
        data: {
          token: app.globalData.userInfo.userToken,
          filter: filter,
          page: that.data.filter.page,
          pagesize: that.data.filter.pagesize
        },
        success: function(result){
          if(result.data.result == 1){
            var list = that.data.order.orderlist
            if(result.data.data.orderlist.length){
              for(let order of result.data.data.orderlist){
                list.push(order)
              }
            }
            
            that.setData({
              order: {orderlist: list,ordertotal: result.data.data.ordertotal},
              loadingHidden: true,
              filter: {page: that.data.filter.page+1, pagesize: that.data.filter.pagesize,filter: filter }
            })
            
          }else{
            if(result.data.errorMsg == 'customer donnot exist.'){
                app.getCustomerInfo(function(userInfo){
                  that.setData({
                    userInfo:userInfo
                  })
                  this.getUserOrderList()
                })
            }
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
    this.getUserOrderList()
  }
})