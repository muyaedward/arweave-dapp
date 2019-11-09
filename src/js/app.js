import Vue from 'vue'
window._ = require('lodash')
import Cookies from 'js-cookie'
Vue.component('arweave-portal', require('./App.vue').default)
Vue.component('svg-icon', require('./components/icons/icon.vue').default)
import { store } from './store'
import router from './router'
import vmodal from 'vue-js-modal'
var VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})
Vue.use(vmodal)
import ArweaveCountryFlag from 'vue-country-flag'
Vue.component('aweave-country-flag', ArweaveCountryFlag)
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate'
import {    
    ext,
    email,
    digits,
    numeric,
    required,
    alpha_num,
    alpha_spaces
} from 'vee-validate/dist/rules'

extend('ext', ext)
extend('email', email)
extend('digits', digits)
extend('numeric', numeric)
extend('required', required)
extend('alpha_num', alpha_num)
extend('alpha_spaces', alpha_spaces)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
import Arweave from 'arweave/web'
import { and, or, equals } from 'arql-ops'
const arweave = Arweave.init()
import {
    GET_USERPROFILE_REQUEST
} from './store/actions/profile'

import {
    GET_AR_BALANCE_REQUEST
} from './store/actions/balance'

const arweaveportal = new Vue({
    el: '#arweave-portal',
    store,
    router,
    mounted(){     
        //check whether the user has added name, country and organization
        if (Cookies.get('aw_address') != undefined) {
            const userAddedDetailsQuery = and(
                equals('from', Cookies.get('aw_address')),
                equals('App-Name', 'kitabumain'),
                equals('kitabuprofiletrue', 'yes')
            )
            var updateProfile = new Promise((resolve, reject) => {
                arweave.arql(userAddedDetailsQuery).then((results) => {
                    if (results === undefined || results.length == 0) {
                        //No transaction hence load profile modal
                        this.$modal.show('profile')
                    } else {
                        //Profile loaded no other action needed
                        this.$store.dispatch(GET_USERPROFILE_REQUEST, results[0]).then((resp) => {
                            this.$store.dispatch(GET_AR_BALANCE_REQUEST, Cookies.get('aw_address')).then((balance) => {
                                resolve(balance)
                            })
                        })
                    }
                }).catch((err) => {})
            })            
        }
    }
})