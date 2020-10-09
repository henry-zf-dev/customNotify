// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animate from 'animate.css';
import CustomNotify from './components/customNotify';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(animate);
Vue.prototype.$customNotify = CustomNotify;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
