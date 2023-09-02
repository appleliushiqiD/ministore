// app.js
App({
  globalData: {
    title: '香芋紫',
    topTitle: '逛逛世界',
    contactTitle: '联系老板',
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }
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
      }else{
        wx.showModal({
          title: '初始化',
          content: '初始化失败',
          showCancel: false
        })
      }
    })
  }
});
