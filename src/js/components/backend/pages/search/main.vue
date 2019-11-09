<template>
  <div class="w-full">
        <div class="mb-3">
            <h1 class="text-3xl text-gray-800 font-semibold">Search academic publications</h1>
            <p>Below is a list of all publications, sort the the publications by country, subject and title</p>
        </div>
        <div class="bg-white w-full">
            <div class="full mb-3">
                <div class="flex flex-row">
                    <div class="relative w-4/12">
                        <select required name="sortBySubject" v-model="sortBySubject" :class="{ 'bg-gray-200 appearance-none border rounded rounded-r-none rounded-b-none w-full py-3 px-4 leading-tight focus:outline-none focus:bg-white border-blue-500 text-gray-700 focus:border-blue-700': true }">
                            <option value="">All subjects</option>
                            <option v-for="(subje, index) in subjectlist" :key="index" :value="subje">{{ subje }}</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div class="relative w-4/12">
                        <country-select name="sortBycountry" v-model="sortBycountry" :placeholder="'All countries'" :country="sortBycountry" topCountry="US" :class="{ 'bg-gray-200 appearance-none border w-full py-3 px-4 leading-tight focus:outline-none focus:bg-white border-blue-500 text-gray-700 focus:border-blue-700': true }" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <input type="text" required name="sortBytitle" v-model="sortBytitle" placeholder="Search publication by title" :class="{ 'bg-gray-200 appearance-none border rounded rounded-l-none rounded-b-none w-full py-3 px-4 leading-tight focus:outline-none focus:bg-white border-blue-500 text-gray-700 focus:border-blue-700': true }">
                </div>
            </div>
            <table class="w-full flex flex-col">
                <tbody class="w-full">
                    <tr v-for="(publication, index) in getAllpapers" :key="index" class="px-4 py-2 flex w-full hover:bg-gray-300 justify-between border-dotted border-b-4 border-gray-600 pb-3">
                        <td class="w-9/12 flex flex-row items-center">
                            <div class="mr-2">
                                <svg class="fill-current w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"/>
                                </svg>
                            </div>
                            <div>
                                <a href="#" class="text-blue-500 hover:underline">{{ publication.arweavetags.kitabutitle }}</a>
                                <span class="flex flex-row items-center text-left">
                                    <p class="italic font-semibold mr-2">{{ publication.arweavetags.kitabufullnmame }}, {{ publication.arweavetags.kitabuorganisation }} {{ publication.arweavetags.kitabucountry }} </p>
                                    <aweave-country-flag :country='publication.arweavetags.kitabucountry' size='normal'/>
                                </span>
                                <p><a href="#" class="text-blue-500 hover:underline">{{ publication.arweavetags.kitabusubject }}</a>: Publication id: <a href="#" class="text-blue-500 hover:underline">{{ publication.arweavetags.kitabupublicationid }}</a> Published on: <span class="text-indigo-700 italic">8th November 2019 02:53 AM</span></p>
                            </div>                            
                        </td>
                        <td class="w-3/12 flex items-center pl-3">
                            <button  @click.prevent="downloadPublication(publication.txdata, publication.arweavetags.kitabupublicationid)" class="bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-1 px-1 border border-green-500 hover:border-transparent rounded  inline-flex items-center mr-5">
                                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                                <span>Download</span>
                            </button>
                            <button @click.prevent="openDonateModal(publication.txowner)" class="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded  inline-flex items-center">
                                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"/></svg>
                                <span>Donate</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="w-full text-left">
                </tfoot>
            </table>
        </div>     
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
    GET_PUBLICATIONS_REQUEST,
    EMPTY_PUBLICATION_REQUEST
} from '../../../../store/actions/profile'
import vueCountryRegionSelect from 'vue-country-region-select'
import { log } from 'util'
Vue.use(vueCountryRegionSelect)
export default {
    data(){
        return{
            subjectlist: [
                'Mathematics',
                'Physics',
                'Chemistry',
                'Agriculture',
                'Computer science',
                'Engineering'
            ],            
            sortBySubject: '',
            sortBycountry: '',
            sortBytitle: ''
        }
    },
    components: {},
    computed: {
        ...mapGetters(['getAllPublications']),

        getAllpapers (){
            if (this.sortBytitle != '') {
                return _.uniqWith(this.getAllPublications, _.isEqual)
            } else {
                return _.uniqWith(this.getAllPublications, _.isEqual)
            }            
        }
    },
    mounted() {
        this.$store.dispatch(GET_PUBLICATIONS_REQUEST).then((resp) => {
            //console.log('got')
        })  
    },
    methods: {        
        openDonateModal(address){
          this.$modal.show('donate', {arAddressPassed: address})          
        },

        downloadPublication(pdfdata, pid){
            if (pid === undefined) {
                pid = Math.floor((Math.random()*99999999) + 10000000)
            }
            var link = document.createElement('a')
            link.href = pdfdata
            link.setAttribute('download', 'publication-' + pid + '.pdf')
            document.body.appendChild(link)
            link.click()
        }
    },

    beforeRouteLeave(to, from, next) {
        this.$store.commit(EMPTY_PUBLICATION_REQUEST)
        if (this.getAllPublications === undefined || this.getAllPublications.length == 0) {
            next()
        } else {
            next(false)
        }
    }
}
</script>