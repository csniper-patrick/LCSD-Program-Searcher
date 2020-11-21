import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    render: h => h(App),
    beforeCreate() {
        this.$store.dispatch('retrive_local_storage');
    },
}).$mount('#app')
