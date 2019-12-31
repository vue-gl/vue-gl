/* eslint-env browser */
/* global Vue, VueGL */
window.jtd.onReady(() => {
  Object.keys(VueGL).forEach((key) => Vue.component(key, VueGL[key]));
  document.querySelectorAll('.code-example').forEach((el) => new Vue({ el }));
});
