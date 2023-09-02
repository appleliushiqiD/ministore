// pages/commodity/commodity.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactTitle: app.globalData.contactTitle,
    commodityInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    var baseinfo = wx.getStorageSync('baseinfo');
    if(baseinfo){
      this.setData({ contactTitle: baseinfo.contactTitle });
    }else{
      wx.cloud.callFunction({
        name: 'getBaseInfo',
      }).then(res=>{
        // console.log(res);
        var { data, errMsg } = res.result;
        if(errMsg=='collection.get:ok'&&data.length>0){
          wx.setStorageSync('baseinfo', data[0]);
          this.setData({ contactTitle: data[0].contactTitle })
        }else{
          wx.showModal({
            title: '再次初始化',
            content: '初始化失败',
            showCancel: false
          })
        }
      })
    }
    var { _id } = options;
    wx.cloud.callFunction({
      name: 'getCommodityInfo',
      data: { _id: _id }
    }).then(res=>{
      // console.log(res);
      var { data, errMsg } = res.result;
      if(errMsg=='document.get:ok'){
        this.setData({ commodityInfo: data })
      }else{
        wx.showModal({
          title: '获取商品信息',
          content: '获取失败',
          showCancel: false,
          complete: (res) => {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})