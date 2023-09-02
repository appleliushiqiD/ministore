var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flowing: false,
    baseInfo: app.globalData,
    commoditiesInfo: []
  },

  /** 点击切换列表样式 */
  tapTransform(){
    this.setData({ flowing: !this.data.flowing })
  },

  /** 点击商品跳转到详情页 */
  tapCommodity(res){
    // console.log(res);
    var { _id } = res.currentTarget.dataset.commodityinfo
    wx.navigateTo({
      url: '../commodity/commodity?_id='+_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData);
    var baseinfo = wx.getStorageSync('baseinfo');
    if(baseinfo){
      wx.setNavigationBarTitle({
        title: baseinfo.title,
      })
      this.setData({ baseInfo: baseinfo });
    }else{
      wx.cloud.callFunction({
        name: 'getBaseInfo',
      }).then(res=>{
        // console.log(res);
        var { data, errMsg } = res.result;
        if(errMsg=='collection.get:ok'&&data.length>0){
          wx.setStorageSync('baseinfo', data[0]);
          wx.setNavigationBarTitle({
            title: data[0].title,
          })
          this.setData({ baseInfo: data[0] })
        }else{
          wx.showModal({
            title: '再次初始化',
            content: '初始化失败',
            showCancel: false
          })
        }
      })
    }
    
    wx.cloud.callFunction({
      name: 'getCommodities'
    }).then(res=>{
      // console.log(res);
      var { data } = res.result;
      this.setData({ commoditiesInfo: data })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})