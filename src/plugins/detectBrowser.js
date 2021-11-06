import { detect } from "detect-browser";

export default {
  install(Vue) {
    Vue.prototype.$browser = detect();
  },
};
