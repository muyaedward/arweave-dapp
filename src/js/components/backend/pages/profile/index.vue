<template>
    <div class="min-h-full bg-blue-100 antialiased sm:flex sm:items-stretch sm:h-full">
        <arwave-modals></arwave-modals>
        <div id="headernav" class="bg-blue-600 text-gray-300 w-full sm:w-16 lg:w-56 sm:h-full">
        <div class="flex sm:bg-blue-500 flex-col">
            <div class="flex sm:shadow justify-start items-center px-5 py-2">
            <div class="mr-3 cursor-pointer sm:hidden" @click="toggleMenu()">
                <svg-icon v-if="!menuOpen" :item="{ class: 'fill-current text-white h-8 w-8', type: 'bars-icon', viewbox: '0 0 512 512' }"></svg-icon>
                <svg-icon v-if="menuOpen" :item="{ class: 'fill-current text-white h-8 w-8', type: 'times-icon', viewbox: '0 0 512 512' }"></svg-icon>
            </div>          
            <router-link to="/" class="sm:py-4">
                <h1 class="px-6 hidden sm:block text-white hover:text-blue-400 flex flex-row items-center">
                    <span class="text-4xl hidden lg:block font-extrabold mr-1">Kitabu</span>
                    <svg class="fill-current lg:hidden w-6 h-6 mt-3 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"/>
                    </svg>
                </h1>
                <span class="text-xl font-bold sm:hidden">Kitabu</span>
            </router-link>
            </div>
            <transition name="slide">
            <div :class="{ 'sm:bg-blue-600 py-2 sm:flex sm:flex-col': true, 'hidden': !menuOpen }">
                <arwave-navigation></arwave-navigation>
            </div>
            </transition>
        </div>
        </div>
        <div class="sm:flex-1">
            <div id="profile" class="bg-white shadow flex justify-between px-3">
                <arwave-top-navigation></arwave-top-navigation>        
                <div class="w-1/3">
                <div @click="toggleProfile()" class="z-50 flex items-center justify-center float-right py-4 text-blue-700 hover:text-blue-500 md:mr-3 cursor-pointer">
                    <svg :class="{ 'rounded-full h-12 w-12 mr-1': true, 'border-2 border-blue-500': profileOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                        <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                    </svg>
                    <svg-icon :item="{ class: 'fill-current h-3 w-3', type: 'chevron-down-icon', viewbox: '0 0 512 512' }"></svg-icon>
                </div>
                <div v-show="profileOpen" class="absolute z-20 right-0 mt-16 xs:mr-2 sm:mr-5">
                    <arwave-account-profile></arwave-account-profile>              
                </div>
                </div>
            </div>
            <div id="content" class="bg-transparent px-8 py-6">
                <div id="content" class="relative">
                    <loading :active.sync="getLoadingStatus" 
                        :can-cancel="false"
                        :opacity="0.9"
                        :background-color="'#e2e8f0'"
                        :is-full-page="false">
                    </loading>
                    <div class="w-full">
                        <h1 class="text-3xl text-gray-800 font-semibold">Profile</h1>
                        <p>User profile</p>
                    </div>
                </div>
            </div>
        </div>    
  </div> 
</template>
<script>
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import arwaveModals from '../../../../components/modals/index'
import arwaveNavigation from '../../../../components/backend/nav/index'
import arwaveTopNavigation from '../../../../components/backend/nav/topnav'
import arwaveAccountProfile from '../../../../components/backend/nav/account-profile'
export default {
    data(){
      return {
        menuOpen: false,
        profileOpen: false
      }
    },
    components: {
        'arwave-modals': arwaveModals,
        'arwave-navigation': arwaveNavigation,
        'arwave-top-navigation': arwaveTopNavigation,
        'arwave-account-profile': arwaveAccountProfile,
        Loading
    },
    computed: {
        ...mapGetters(['getUserProfile', 'getLoadingStatus', 'isAuthenticated'])
    },
    methods: {
      toggleMenu(){
        this.menuOpen = !this.menuOpen
      },
      toggleProfile(){
        this.profileOpen = !this.profileOpen
      }
    }
}
</script>