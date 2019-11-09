<template>
    <div class="mt-3 xl:border w-64 flex flex-col">
        <div class="bg-blue-700 flex flex-col text-white text-sm font-semibold pb-2 py-2 leading-snug">
            <span class="px-2">{{ getUserProfile.profilefullname }}</span>
            <span class="px-2">{{ getUserProfile.profileorganization }}</span>
            <span class="px-2">{{ getUserProfile.profilecountry }}</span>
            <div class="flex flex-col py-2 cursor-pointer">
                <notifications group="copytoclipboard" />
                <span id="arKey" 
                    @mouseover="showcopykey = true" @mouseleave="showcopykey = false"
                    v-show="!showcopykey"
                    class="px-2 font-normal">{{ getTheAddress.short }}....</span>
                <span v-show="showcopykey"
                        v-clipboard:copy="getTheAddress.long"
                        v-clipboard:success="onAddressCopy"
                        v-clipboard:error="onAddressError" class="px-2 font-bold text-center">Copy to clipboard</span>
            </div>            
        </div>
        <div class="bg-white flex items-center justify-between">
            <ul class="flex flex-col w-full">
            <li class="flex items-center justify-between py-3 border-b border-gray-400 px-2">
                <span class="w-2/3 text-sm">Bal: <span class="font-semibold">{{ getAwBalance != null ? getAwBalance.ar : 0 }} AR</span></span>
                <a href="#" class="w-1/3 text-sm text-blue-400 font-semibold cursor-pointer">Add funds</a>
            </li>            
            <a @click.prevent="logoutUser()" class="py-3 hover:bg-blue-100 border-b border-gray-400 flex items-center px-2 cursor-pointer">
                <svg-icon :item="{ class: 'fill-current text-blue-400 h-4 w-4 mr-2', type: 'power-off-icon', viewbox: '0 0 512 512' }"></svg-icon>
                <span class="text-gray-800 font-normal lg:block">Log out</span>
            </a>
            </ul>
        </div>        
    </div>
</template>
<script>
import Vue from 'vue'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification' 
Vue.use(Notifications)
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
import {
    AUTH_LOGOUT_DISPATCH
} from '../../../store/actions/auth'
export default {
    data(){
        return{
            showcopykey: false
        }
    },
    computed: {
        ...mapGetters(['getUserProfile', 'getAwBalance']),
        getTheAddress(){
            let address = Cookies.get('aw_address')
            if (address == undefined) {
                return {
                    long: 0,
                    short: 0
                }
            } else {
                return {
                    long: address,
                    short: address.substring(0, 20)
                }
            }
        }
    },
    mounted(){},
    methods: {
        onAddressCopy: function (e) {
            this.$notify({
                group: 'copytoclipboard',
                type: 'success',
                title: 'Success',
                text: 'Arweave address copied successfully'
            })
        },
        onAddressError: function (e) {
            this.$notify({
                group: 'copytoclipboard',
                type: 'error',
                title: 'Error',
                text: 'Error copying arweave address'
            })
        },
        logoutUser() {
            this.$store.dispatch(AUTH_LOGOUT_DISPATCH).then((resp) => {
                if (resp) {
                    this.$router.push({
                        name: 'aw-home'
                    })
                }
            })
        }
    }
}
</script>