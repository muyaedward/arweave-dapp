<template>
    <div class="w-full">
        <notifications group="publication" />
        <h1 class="text-3xl text-gray-800 font-semibold">Submit a paper</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum enim, molestias nesciunt alias voluptates velit? Provident harum voluptatum laborum? Minus similique quis eaque perferendis molestias debitis enim ducimus consequuntur quisquam.</p>
        <div class="w-full pt-4 flex">
            <div class="w-full sm:w-1/2">
                <ValidationObserver ref="arweaveSubmitPaper" tag="form" v-slot="{ invalid }" @submit.prevent="submitPaper()" class="w-full flex flex-col sm:flex-row sm:flex-wrap text-left">
                    <div class="flex flex-col px-1 w-full mb-3">
                        <label class="tracking-wide text-gray-700 font-bold mb-2" for="arweavetitle">
                            Title
                        </label>
                        <ValidationProvider name="Title" rules="required" v-slot="{ errors, classes }">
                            <input type="text" required  name="arweavetitle" v-model="arweavetitle" placeholder="Title" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                            <span class="text-sm text-red-500">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                    <div class="flex flex-col px-1 w-full mb-3">
                        <label class="tracking-wide text-gray-700 font-bold mb-2" for="arweavesubject">
                            Subject
                        </label>
                        <ValidationProvider name="Subject" rules="required" v-slot="{ errors, classes }">
                            <div class="relative">
                                <select required name="arweavesubject" v-model="arweavesubject" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                                    <option value="">Please select a subject</option>
                                    <option v-for="(subje, index) in subjectlist" :key="index" :value="subje">{{ subje }}</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            <span class="text-sm text-red-500">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="flex flex-col px-1 w-full mb-3">
                        <label class="tracking-wide text-gray-700 font-bold mb-2" for="arweavecontent">
                            Article Content <span class="text-sm italic">Markdown Supported - Optional</span>
                        </label>
                        <ValidationProvider name="Message" rules="" v-slot="{ errors, classes }">
                            <textarea name="arweavecontent" v-model="arweavecontent" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }"></textarea>
                            <span class="text-sm text-red-500">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="flex flex-col px-1 w-full mb-3">
                        <label class="tracking-wide text-gray-700 font-bold mb-2" for="profileorganization">
                            Arweave publication <span class="text-sm italic">(Only accept pdf files)</span>
                        </label>
                        <ValidationProvider name="Arweave publication" rules="ext:pdf" v-slot="{ errors, classes }">
                            <input required type="file" ref="pdfPublishRef" accept="application/pdf" @change="loadfilePdf" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                            <span class="text-sm text-red-500">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="px-1 w-full mb-3">
                        <ValidationProvider name="Licenses" rules="agreetoterms" v-slot="{ errors, classes }">
                            <label for="licenseAgreecheckbox" class="tracking-wide text-gray-700 font-bold mb-2">
                                <input type="checkbox"  id="licenseAgreecheckbox" v-model="licenseAgree">
                                <span :class="{'text-sm': true, 'text-red-500': classes.invalid }">Published work under a <a target="_blank" href="https://creativecommons.org/licenses/" :class="{'text-blue-700': classes.valid, 'text-red-500': classes.invalid }">creative Commons license</a> or under <a :class="{'text-blue-700': classes.valid, 'text-red-500': classes.invalid }" href="https://en.wikipedia.org/wiki/Open_access" target="_blank">open Access</a>, original work under a <a :class="{'text-blue-700': classes.valid, 'text-red-500': classes.invalid }" href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a> license</span>
                            </label>
                        </ValidationProvider>                        
                    </div>
                    <div class="flex flex-col px-1 w-full mb-5">
                        <button type="submit" :class="{ 'bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded inline-flex justify-center items-center sm:float-right cursor-pointer': true, 'opacity-50 cursor-not-allowed': invalid | waitfortransaction }">
                            <span class="text-xl" v-html="buttontext"></span>                    
                            <svg class="fill-current w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                            </svg>
                        </button>
                    </div>
                </ValidationObserver>
            </div>
            <div class="w-full sm:w-1/2 p-4">
                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3" role="alert">
                    <p><span class="font-bold">Important: </span> Kindly do not submit more than once, wait for confirmation.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
    CREATE_TRANSACTION_REQUEST,
    SIGN_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_REQUEST,
    ADD_STATUS_ERROR_REQUEST,
    ADD_STATUS_SUCCESS_REQUEST,
    CREATE_SUBMIT_TRANSACTION_REQUEST
} from '../../../../store/actions/profile'
import { extend } from 'vee-validate'
import Cookies from 'js-cookie'
export default {
    data(){
        return{
            arweavetitle: '',
            arweavecontent: '',
            arweavesubject: '',
            licenseAgree: false,
            arweavePublishPaperData: null,
            arweaveKey: null,
            subjectlist: [
                'Mathematics',
                'Physics',
                'Chemistry',
                'Agriculture',
                'Computer science',
                'Engineering'
            ],
            waitfortransaction: false,
            buttontext : 'Submit a paper'
        }
    },
    computed: {
        ...mapGetters(['getUserProfile'])
    },
    created(){
        extend('agreetoterms', {
            validate: value => {
                return value == true
            },
            message: 'You must agree to license agreement'
        })
    },
    methods: {
        removeAlert(){
            this.$store.commit(ADD_STATUS_ERROR_REQUEST, '')
            this.$store.commit(ADD_STATUS_SUCCESS_REQUEST, '')
        },
        loadfilePdf() {            
            let file = this.$refs.pdfPublishRef.files[0]
            if(!file || file.type !== 'application/pdf') return
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload =  evt => {
                this.arweavePublishPaperData = evt.target.result
            }
            reader.onerror = evt => {
                console.error(evt)
            }       
        },
        async submitPaper() {
            const isValid = await this.$refs.arweaveSubmitPaper.validate()            
            if (isValid) {
                this.waitfortransaction = true
                this.buttontext = 'Submitting your paper'
                let addresskey = Cookies.get('aw_address_key')              
                this.arweaveKey = JSON.parse(addresskey)
                //Save the profile
                let postdata = {
                    'data': this.arweavePublishPaperData,
                    'arweaveKey': this.arweaveKey
                }
                this.$store.dispatch(CREATE_SUBMIT_TRANSACTION_REQUEST, postdata).then((transaction) => {
                    transaction.addTag('kitabutitle', this.arweavetitle)
                    transaction.addTag('kitabusubject', this.arweavesubject)
                    transaction.addTag('kitabupublicationid', Math.floor((Math.random()*99999) + 10000))
                    transaction.addTag('kitabufullnmame', this.getUserProfile.profilefullname)
                    transaction.addTag('kitabuorganisation', this.getUserProfile.profileorganization)
                    transaction.addTag('kitabucountry', this.getUserProfile.profilecountry)
                    transaction.addTag('postdate', new Date())
                    transaction.addTag('articledata', this.arweavecontent)
                    transaction.addTag('ispublication', 'yes')                    
                    transaction.addTag('Content-Type', 'application/pdf')
                    transaction.addTag('App-Name', 'kitabuproduction')
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
                            this.buttontext = 'Submit a paper'
                            //Notify the user that the paper has been submitted successfully, and redirect to home/publications
                            this.$store.commit(ADD_STATUS_SUCCESS_REQUEST, 'Publication transaction was successful, kindly allow time for confirmation')
                            this.$router.push({
                                name: 'aw-publications'
                            })
                        })
                    })                    
                }).catch((err) => {
                    this.waitfortransaction = false,
                    this.buttontext = 'Submit a paper'
                })                
            }
        }
    }
}
</script>