// page/component/category/index.js
Page({
  data:{
    navData:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    console.log(options.query)
    var navData = wx.getStorageSync('navData')
    console.log(navData)
    if(navData){
      this.setData({
          navData: navData
      })
    }
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
    
  }
})