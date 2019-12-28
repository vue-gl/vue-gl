/* eslint-env browser */
/* global Vue, VueGL */
window.jtd.onReady(() => {
  Object.keys(VueGL).forEach((key) => Vue.component(key, VueGL[key]));
  if (window.vueOpts) window.vueOpts.forEach((opt) => new Vue(opt));
});
