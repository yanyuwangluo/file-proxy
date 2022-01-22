/*
 * @Date: 2022-01-22 10:32:50
 * @LastEditors: 烟雨
 * @LastEditTime: 2022-01-22 10:34:04
 * @FilePath: \file-proxy-master\chrome-app\background.js
 */
const baseURI = "https://www.yanyu.ltd/"
// 生成右键菜单
function addContextMenu (id, title) {
  chrome.contextMenus.create({
    id: id,
    title: title,
    contexts: ['link']
  })
}

// 弹出chrome通知
function showNotification (id, opt) {
  chrome.notifications.create(id, opt, function (notifyId) {
    return notifyId
  })
  setTimeout(function () {
    chrome.notifications.clear(id, function () {})
  }, 3000)
}

function downFile(id, url){
    window.open(baseURI + "/" + id + "/" + url.link)
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  downFile(info.menuItemId, {
    link: info.linkUrl
  })
})

function openMain () {
  const index = chrome.extension.getURL('src/options.html')
  chrome.tabs.getAllInWindow(undefined, function (tabs) {
    tabs.forEach(tab => {
      if (tab.url && tab.url === index) {
        chrome.tabs.update(tab.id, { selected: true })
      }
    })
    chrome.tabs.create({ url: index })
  })
}
chrome.browserAction.onClicked.addListener(function () {
  openMain()
})

chrome.notifications.onClicked.addListener(function () {
  openMain()
})

chrome.contextMenus.removeAll(() => {
  addContextMenu("cfworker","cfworker 加速下载")
})

