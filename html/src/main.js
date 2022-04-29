import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  data() {
    return {
      ws: new WebSocket(`wss://desert-smart-apology.glitch.me/`)
    }
  }
}).$mount('#app')
