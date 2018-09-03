Page({

  /**
   * 页面的初始数据
   */
  data: {
    idBack: 'back',
    idClear: 'rest',
    idReverse: 'reverse',
    idAdd: '+',
    idReduce: '-',
    idNine: '9',
    idOne: '1',
    idTwo: '2',
    idThree: '3',
    idFour: '4',
    idFive: '5',
    idSix: '6',
    idSeven: '7',
    idEight: '8',
    idZore:'0',
    idHistory: 'history',
    idSpot: '.',
    idRide: '×',
    idExcept: '÷',
    idOver: '=',
    dataResult: '0',
    lastIsOperator: false,
    arr: [],
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
  /**
   * 点击按钮出发事件
   */
  clickButton: function(even) {
    var id = even.target.id;
    if (id == this.data.idBack) {//退格
      var data = this.data.dataResult;
      if (data == 0) {
        return;
      }
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "-") {
        data = 0;
      }
      this.setData({ dataResult: data });
      this.data.arr.pop();
    } else if (id == this.data.idClear) {//清屏
      this.setData({ dataResult: "0" });
      this.data.arr.length = 0;
    } else if (id == this.data.idReverse) {//正负号
      var data = this.data.dataResult;
      if (data == 0) {
        return;
      }
      var firstWord = data.substring(0, 1);
      if (firstWord == "-") {
        data = data.substring(1, data.length);
        this.data.arr.shift();
      } else {
        data = "-" + data;
        this.data.arr.unshift("-");
      }
      this.setData({ dataResult: data });

    } else if (id == this.data.idOver) {// =
      var data = this.data.dataResult;
      if (data == 0) {
        return;
      }
      var lastWord = data.substring(data.length - 1, data.length);
      if (isNaN(lastWord)) {
        return;
      }
      var num = "";

      var lastOperator;
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.idSpot || arr[i] == this.data.idReverse) {
          num += arr[i];
        } else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0]) * 1.0;
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          if (optarr[1] == this.data.idExcept) {
            result += Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idReduce) {
            result -= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idRide) {
            result *= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idExcept) {
            result /= Number(optarr[i + 1]);
          }
        }
      }

      this.data.logs.push(data + "=" + result);
      wx.setStorageSync('callogs', this.data.logs);
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({ dataResult: result + "" });

    } else {

      if (id == this.data.idExcept || id == this.data.idReduce || id == this.data.idRide || id == this.data.idExcept) {
        if (this.data.lastIsOperator == true || this.data.dataResult == 0) {
          return;
        }

      }

      var sd = this.data.dataResult;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ dataResult: data });
      this.data.arr.push(id);

      if (id == this.data.idExcept || id == this.data.idReduce || id == this.data.idRide || id == this.data.idExcept) {
        this.setData({ lastIsOperator: true });
      } else {
        this.setData({ lastIsOperator: false });
      }
    }
  },
  /**
   * 跳转历史
  */
  history: function () {
    wx.navigateTo({
      url: '../history/history',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})