import Bowser from 'bowser'

export default {
  install (Vue, options) {
    const browser = Bowser.getParser(window.navigator.userAgent)

    Vue.prototype.$browser = {
      ...browser.getBrowser(),
      platform: browser.getPlatformType()
    }
  }
}