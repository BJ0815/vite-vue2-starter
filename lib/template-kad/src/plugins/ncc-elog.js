const isProd = /104\.com\.tw/.test(window.location.hostname)

const injectScript = () => {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script')
    tag.src = 'https://static.104.com.tw/104i/js/api/log/e104.log.latest.js'
    tag.onload = () => {
      setTimeout(resolve, 1000)
    }
    tag.onerror = reject
    document.getElementsByTagName('body')[0].appendChild(tag)
  })
}
const dispatchLog = () => {
  if (!(window._elog && isProd)) return
  console.log('dispatch ncc log')

  window._elog.push({
    web: '104_bank',
    track: ['viewPage'],
    ext: {
      custno: process.env.VUE_APP_CUSTOMER_ID
    }
  })
}

export default {
  async install (Vue, options) {
    Vue.prototype.$dispatchNccLog = dispatchLog

    if (window.__PRERENDER_PROCESSING || !isProd) return
    try {
      await injectScript()
      dispatchLog()
    } catch (e) {
      console.error(e)
    }
  }
}
