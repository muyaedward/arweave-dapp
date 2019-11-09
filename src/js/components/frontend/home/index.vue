<template>
  <div class="flex flex-col">
    <profile-modal></profile-modal>
    <donation-modal></donation-modal>
    <div class="z-0 relative min-h-64" style="background-image: url('img/publication.jpg'); background-size: cover; background-position: center center;">
        <div class="z-10 absolute h-full w-full t-0 r-0" style="background-color: rgba(11, 15, 41, 0.95);"></div>
        <div class="flex flex-col">
          <div id="homenavhomework" class="h-16 z-40 w-full t-0 flex items-center justify-between px-5 sm:px-10 md:px-20 lg:px-24 xl:px-32 py-3 lg:py-2 shadow">
              <div class="w-40 sm:w-56">
                  <router-link to="/" class="block">
                    <h1 class="px-6 text-white hover:text-blue-400 flex flex-row items-center">
                        <span class="text-4xl font-extrabold mr-1">Kitabu</span>
                        <svg class="fill-current w-6 h-6 mt-3 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"/>
                        </svg>
                    </h1>
                  </router-link>
              </div>
              <div class="flex justify-center items-center">
                  <ul class="hidden sm:hidden lg:flex lg:flex-row lg:items-center pt-3 text-white uppercase">
                      <li class="px-3 font-medium">
                          <a class="cursor-pointer hover:text-blue-600" v-scroll-to="'#homePublications'">How it works</a>
                      </li>
                      <li class="px-3 font-medium">
                          <a class="cursor-pointer hover:text-blue-600" v-scroll-to="'#homePublications'">Publications</a>
                      </li>
                  </ul>
                  <a href="#" class="bg-blue-600 block md:hidden border border-gray-900 text-gray-300 text-xs px-2 py-1 rounded uppercase cursor-pointer">
                      Sign in
                  </a>
              </div>
          </div>
          <div id="signInHeader" class="z-10 pb-4 min-h-full w-full px-5 sm:px-10 md:px-20 lg:px-24 xl:px-32 pt-4 md:pt-12 mt-0 sm:mt-1 md:mt-3 text-center md:text-left">
              <div class="flex flex-col md:flex-row md:items-center">
                  <div class="w-full md:w-1/2 text-white">
                      <h6 class="text-xl sm:text-lg md:text-2xl md:text-4xl sm:leading-snug md:leading-normal lg:leading-relaxed">The best Article/Journals publishing platform</h6>
                      <p class="pt-3 text-sm md:text-base lg:text-lg sm:leading-snug md:leading-normal lg:leading-relaxed">Publish your papers for free without the worry of them getting deleted. Kitabu is a publishing platform that allows publishers to submit their papers for free. Kitabu is powered by Arweave</p>
                  </div>
                  <div class="w-full md:w-1/2 text-center">
                    <label v-if="!isAuthenticated" class="bg-blue-700 hover:bg-blue-500 text-xl text-white font-bold py-3 px-4 cursor-pointer rounded inline-flex items-center">
                      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"/>
                      </svg>
                      <span>Sign in to your account</span>
                      <input class="hidden" required type="file" ref="keyArWeave" @change="loadfileWithJson" accept="application/json" />
                    </label>
                    <router-link to="/submit" class="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-4 px-5 rounded inline-flex items-center" v-else>
                      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                      </svg>
                      <span>Submit article</span>
                    </router-link>
                  </div>
              </div>
          </div>
        </div>        
    </div>
    <div class="text-center pt-8 px-5 sm:px-10 md:px-20 lg:px-24 xl:px-32">
        <div v-if="getStatusSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Important information!</strong>
            <span class="block sm:inline">{{ getStatusSuccess }}</span>
            <span @click.prevent="removeAlert()" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>

        <div v-if="getStatusError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Important information!</strong>
            <span class="block sm:inline">{{ getStatusError }}</span>
            <span @click.prevent="removeAlert()" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>

        <h1 class="text-4xl text-blue-800 font-semibold">The best platform to publish your articles</h1>
        <p class="text-lg">Submit work under a Creative Commons license or under Open Access, original work under a CC BY-NC 4.0 license</p>
    </div>
    <div class="w-full flex flex-row px-5 sm:px-10 md:px-20 lg:px-24 xl:px-32 mt-4 py-3 border-b border-gray-500">
        <div class="w-2/12">
            <home-subjects></home-subjects>
        </div>
        <div id="homePublications" class="w-10/12 px-3">
            <home-publications></home-publications>
        </div>
    </div>
    <div class="w-full bg-gray-400 flex flex-row items-center px-5 sm:px-10 md:px-20 lg:px-24 xl:px-32 mt-auto">
        <div class="w-full pb-6 pt-6 text-center">
            <p>Submit work under a <a target="_blank" href="https://creativecommons.org/licenses/" class="text-blue-700">Creative Commons license</a> or under <a class="text-blue-700" href="https://en.wikipedia.org/wiki/Open_access" target="_blank">Open Access</a>, original work under a <a class="text-blue-700" href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a> license</p>
            <p>Powered by <a class="text-blue-700 font-semibold" href="https://arweave.org">ArWeave</a></p>
        </div>
    </div> 
  </div> 
</template>
<script>
import { mapGetters } from 'vuex'
import {
    AUTH_REQUEST
} from '../../.../../../store/actions/auth'
import Arweave from 'arweave/web'
import { and, or, equals } from 'arql-ops'
import Cookies from 'js-cookie'
import donationModal from '../../modals/donate'
import profileModal from '../../modals/profile'
import homePublications from './publications'
import homeSubjects from './subjects'
const arweave = Arweave.init()
import {
    GET_USERPROFILE_REQUEST,
    GET_PUBLICATIONS_REQUEST,
    EMPTY_PUBLICATION_REQUEST,
    ADD_STATUS_ERROR_REQUEST,
    ADD_STATUS_SUCCESS_REQUEST
} from '../../../store/actions/profile'

import {
    GET_AR_BALANCE_REQUEST
} from '../../../store/actions/balance'
export default {
    data(){
      return {
        arweaveKey: null
      }
    },
    components: {
        'home-publications': homePublications,
        'home-subjects': homeSubjects,
        'profile-modal': profileModal,
        'donation-modal': donationModal
    },
    computed: {
        ...mapGetters(['getStatusError', 'getStatusSuccess']),
        isAuthenticated(){
            let address = Cookies.get('aw_address')
            if (address == undefined) {
                return false              
            }else{
                return true
            }
        }
    },
    mounted(){},
    methods: {
        removeAlert(){
            this.$store.commit(ADD_STATUS_ERROR_REQUEST, '')
            this.$store.commit(ADD_STATUS_SUCCESS_REQUEST, '')
        },
        loadfileWithJson() {            
            let file = this.$refs.keyArWeave.files[0]
            if(!file || file.type !== 'application/json') return
            let reader = new FileReader()
            reader.readAsText(file, "UTF-8")
            reader.onload =  evt => {
                this.arweaveKey = JSON.parse(evt.target.result)
                this.$store.dispatch(AUTH_REQUEST, this.arweaveKey).then((response) => {
                const userAddedDetailsQuery = and(
                    equals('from', response),
                    equals('App-Name', 'kitabufirsttt'),
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
                                this.$store.dispatch(GET_AR_BALANCE_REQUEST, response).then((balance) => {
                                    resolve(balance)
                                    this.$router.push({
                                        name: 'aw-publications'
                                    })
                                })
                            })
                        }
                    }).catch((err) => {})
                })              
                }).catch((error) => {})          
            }
            reader.onerror = evt => { console.error(evt) }        
      }
    }
}
</script>
<style>
</style>