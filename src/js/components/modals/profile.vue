<template>
    <modal name="profile" :width="320" :height="520">
        <div class="p-5">
            <notifications group="profileupdate" />
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3" role="alert">
                <p><span class="font-bold">Important: </span> The following data <span class="font-bold underline">CAN NOT BE CHANGED</span>. Kindly do not submit more than once, wait for network confirmation</p>
            </div>
            <ValidationObserver ref="savekitabuprofile" tag="form" v-slot="{ invalid }" @submit.prevent="saveProfile()" class="w-full flex flex-col sm:flex-row sm:flex-wrap text-left">
                <div class="flex flex-col px-1 w-full mb-3">
                    <label class="tracking-wide text-gray-700 font-bold mb-2" for="profilefullname">
                        Full name
                    </label>
                    <ValidationProvider name="Full name" rules="required" v-slot="{ errors, classes }">
                        <input type="text" required  name="profilefullname" v-model="profilefullname" placeholder="Full name" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                        <span class="text-sm text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="flex flex-col px-1 w-full mb-3">
                    <label class="tracking-wide text-gray-700 font-bold mb-2" for="profileorganization">
                        Institution/Organization
                    </label>
                    <ValidationProvider name="Full name" rules="required" v-slot="{ errors, classes }">
                        <input type="text" required name="profileorganization" v-model="profileorganization" placeholder="Institution/Organization" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                        <span class="text-sm text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                
                <div class="flex flex-col px-1 w-full mb-3">
                    <label class="tracking-wide text-gray-700 font-bold mb-2" for="country">
                        Country
                    </label>
                    <ValidationProvider name="Full name" rules="required" v-slot="{ errors, classes }">
                        <div class="relative">
                            <country-select required name="country" v-model="profilecountry" :country="profilecountry" topCountry="US" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }" />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        <span class="text-sm text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>                        
                <div class="flex flex-col px-1 w-full mb-5">
                    <button type="submit" :class="{ 'bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded inline-flex justify-center items-center sm:float-right cursor-pointer': true, 'opacity-50 cursor-not-allowed': invalid | waitfortransaction }">
                        <span class="text-lg mr-2" v-html="buttontext"></span>                    
                        <svg class="fill-current w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                        </svg>
                    </button>
                </div>
            </ValidationObserver>
        </div>        
    </modal>
</template>
<script>
import Vue from 'vue'
import vueCountryRegionSelect from 'vue-country-region-select'
import {
    CREATE_TRANSACTION_REQUEST,
    SIGN_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_REQUEST,
    ADD_STATUS_SUCCESS_REQUEST,
    ADD_STATUS_ERROR_REQUEST
} from '../../store/actions/profile'
import Cookies from 'js-cookie'
Vue.use(vueCountryRegionSelect)
export default {
    data(){
        return{
            profilefullname: '',
            profileorganization: '',
            profilecountry: '',
            arweaveKey: null,
            waitfortransaction: false,
            buttontext : 'Update kitabu profile'
        }
    },
    methods: {
        async saveProfile() {
            const isValid = await this.$refs.savekitabuprofile.validate()
            if (isValid) {
                this.waitfortransaction = true
                this.buttontext = 'Submitting your profile'
                //Save the profile
                let addresskey = Cookies.get('aw_address_key')
                this.arweaveKey = JSON.parse(addresskey)
                let postdata = {
                    'name': this.profilefullname,
                    'organization': this.profileorganization,
                    'country': this.profilecountry,
                    'arweaveKey': this.arweaveKey
                }
                this.$store.dispatch(CREATE_TRANSACTION_REQUEST, postdata).then((transaction) => {
                    transaction.addTag('profilefullname', postdata.name)
                    transaction.addTag('profileorganization', postdata.organization)
                    transaction.addTag('profilecountry', postdata.country)
                    transaction.addTag('App-Name', 'kitabumain')
                    transaction.addTag('kitabuprofiletrue', 'yes')                    
                    let signdata = {
                        tx: transaction,
                        arweaveKey: postdata.arweaveKey
                    }
                    this.$store.dispatch(SIGN_TRANSACTION_REQUEST, signdata).then((txresp) => {
                        this.$store.dispatch(SAVE_TRANSACTION_REQUEST, transaction).then((response) => {
                            this.buttontext = 'Waiting for confirmation'
                            //Set time out to wait for the transaction to be loaded to the network. This is just a hack, we are assuming the transaction will complete in 10 sec.
                            //Enable the button for resubmit. Wait as the paper is submitted
                            this.waitfortransaction = false,
                            this.buttontext = 'Update kitabu profile'
                            //Notify the user that the paper has been submitted successfully, and redirect to home/publications
                            this.$store.commit(ADD_STATUS_SUCCESS_REQUEST, 'Profile transaction was successful, kindly allow time for confirmation')
                            this.$modal.hide('profile')
                            this.$scrollTo('#signInHeader')                            
                        })
                    })                    
                }).catch((err) => {})                
            }
        }
    }
}
</script>