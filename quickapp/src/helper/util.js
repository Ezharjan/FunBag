import webview from '@system.webview'
import prompt from '@system.prompt'
import fetch from '@system.fetch'
import router from '@system.router'
import storage from '@system.storage'
import barcode from '@system.barcode'


/**
 * 显示菜单
 */
function showMenu() {

  const appInfo = require('@system.app').getInfo()
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于'],
    success: function (ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut()
          break
        case 1:
          // 关于
          router.push({
            uri: '/About',
            params: {
              name: appInfo.name,
              icon: appInfo.icon
            }
          })
          break
      
        default:
          prompt.showToast({
            message: 'error'
          })
      }
    }
  })
}


/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  const prompt = require('@system.prompt')
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function (ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function () {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function (errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

/**
 * 获取时间，格式：周几 时：分
 */
function getTime() {
  const now = new Date();
  const date = now.getDate();
  const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
  const week = weeks[date];
  const time = week + " " + now.getHours() + ":" + now.getMinutes();
  return time

}

/**
 * 请求处理
 */
function requestHandle(params) {
  return new Promise((resolve, reject) => {
    fetch.fetch({
      url: params.url,
      method: params.method,
      data: params.data,
      header: params.header
    }).then(response => {
      const result = response.data
      const content = JSON.parse(result.data)
      resolve(content.data);
    }).catch((error, code) => {
      reject(error)
    })
  })
}

/**
 * 退出登录
 */
function quitlogin() {
  setStorage('userLogined', false)
  route2theUrl('Pages/Main', false)

}

/**
 * 存储数据
 */
function setStorage(key, value) {
  // 设置storage
  storage.set({
    key: key,
    value: value,
    fail(data, code) {
      prompt.showToast({
        message: `storage fail:${data}, ${code}`
      })
    }
  })
}
/** 
 * 删除数据
*/
function deleteStorage(key){
storage.delete({
  key: key,
  success: function (data) {
   showToast(`Delete Success!${data}`)
  },
  fail: function (data, code) {
    showToast(`Delete Failed!${data}, ${code}`)
  }
})
}
/**
 * 获取数据
 */
function getStorage(key) {
  return new Promise((resolve, reject) => {
    // 获取storage
    storage.get({
      key,
      success(data) {
        if (data) {
          resolve(data)
        }
      },
      fail(data, code) {

        reject({ data, code })
      }
    })
  })
}
/** 
 * 清除应用数据
*/
function clearStorage() {
  storage.clear()
}
/**
 * 弹窗
 */
function showToast(message = '', dur = 0) {
  if (!message) return
  prompt.showToast({
    message: message,
    dur
  })
}
/**
 * 推送utl跳转
 */
function loadURL(url) {
  webview.loadUrl({
    url: url,
    allowthirdpartycookies: true
  })
}

/**
  *路由跳转
  */
function route2theUrl(url, push = true, params, clear = false) {
  if (push) {
    router.push({
      uri: url,
      params: params
    })
  }
  else {
    router.replace({
      uri: url,
      params: params
    })
  }
  if (clear) {
    router.clear()
  }
}


/**
 * 扫描二维码
 */
function BarCodeScan() {
  barcode.scan({
    success: function (data) {
      const result = data.result;
      //起始数组下标，截取长度
      const machine = { id: '', type: '' }
      machine.id = result.substr(2, 5);
      machine.type = result.substr(0, 2);

      setStorage('machine',machine)
      if (machine.id && machine.type) {
        getStorage('machine').then(result=>{
          showToast(`扫码成功`)
          //showToast(`id:${JSON.parse(result).id},type:${JSON.parse(result).type}`)
        })     
        route2theUrl('Pages/bags', true)
      }
    },
    fail: function (data, code) {
      showToast('Invalid barcode!')
    }
  })
}
export default {
  showMenu,
  createShortcut,
  getTime,
  setStorage,deleteStorage,getStorage, clearStorage,
  requestHandle,
  showToast,
  route2theUrl,
  quitlogin,
  loadURL,
  BarCodeScan,
  

}