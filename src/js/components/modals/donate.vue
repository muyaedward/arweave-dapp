<template>
    <modal name="donate" @before-open="beforeDonateModalOpen" :width="320" :height="500">
        <div class="p-5">
            <notifications group="adddonation" />
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3" role="alert">
                <p><span class="font-bold">Important: </span>Kindly do not submit more than once, wait for confirmation.</p>
            </div>
            <ValidationObserver ref="saveDonateArweave" tag="form" v-slot="{ invalid }" @submit.prevent="sendDonation()" class="w-full flex flex-col sm:flex-row sm:flex-wrap text-left">
                <div class="flex flex-col px-1 w-full mb-3">
                    <label class="tracking-wide text-gray-700 font-bold mb-2" for="arweaveaddress">
                        Arweave address
                    </label>
                    <ValidationProvider name="Arweave address" rules="required" v-slot="{ errors, classes }">
                        <input :disabled="true" type="text" required  name="arweaveaddress" v-model="arweaveaddress" placeholder="Arweave address" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white opacity-50 cursor-not-allowed': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                        <span class="text-sm text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="flex flex-col px-1 w-full mb-3">
                    <label class="tracking-wide text-gray-700 font-bold mb-2" for="arweaveamount">
                        Amount in AR
                    </label>
                    <ValidationProvider name="Amount" rules="required|lessthanbalance" v-slot="{ errors, classes }">
                        <input type="text" required name="arweaveamount" v-model="arweaveamount" placeholder="Amount in AR" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }">
                        <span class="text-sm text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="flex flex-col px-1 w-full mb-3">
                    <label class="tracking-wide text-gray-700 font-bold mb-2" for="arweavemessage">
                        Message <span class="text-sm italic">(optional)</span>
                    </label>
                    <ValidationProvider name="Message" rules="alpha_spaces" v-slot="{ errors, classes }">
                        <textarea name="arweavemessage" v-model="arweavemessage" :class="{ 'bg-gray-200 appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white': true, 'border-blue-500': classes.untouched, 'text-gray-700 border-blue-500 focus:border-blue-700': classes.valid, 'text-red-700 border-red-500 focus:border-red-700': classes.invalid }"></textarea>
                        <span class="text-sm text-red-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="flex flex-col px-1 w-full mb-5">
                    <button type="submit" :class="{ 'bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded inline-flex justify-center items-center sm:float-right cursor-pointer': true, 'opacity-50 cursor-not-allowed': invalid | waitfortransaction }">
                        <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"/>
                        </svg>
                        <span class="text-lg" v-html="buttontext"></span>
                    </button>
                </div>
            </ValidationObserver>
        </div>        
    </modal>
</template>
<script>
import { mapGetters } from 'vuex'
import {
    CREATE_TRANSACTION_REQUEST,
    SIGN_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_REQUEST,
    ADD_STATUS_ERROR_REQUEST,
    ADD_STATUS_SUCCESS_REQUEST
} from '../../store/actions/profile'
import {
    GET_AR_BALANCE_REQUEST
} from '../../store/actions/balance'
import { extend } from 'vee-validate'
import Cookies from 'js-cookie'
export default {
    data(){
        return{
            arweaveaddress: '',
            arweaveamount: '',
            arweavemessage: '',
            arweaveKey: null,
            waitfortransaction: false,
            buttontext : 'Send donation'
        }
    }, 
    computed: {
        ...mapGetters(['getAwBalance'])
    },
    mounted(){
        this.$store.dispatch(GET_AR_BALANCE_REQUEST, Cookies.get('aw_address'))
    },
    created(){
        extend('lessthanbalance', {
            validate: value => {
                return value < this.getAwBalance.ar
            },
            message: 'You do not have enough AR'
        })
    },
    methods: {
        beforeDonateModalOpen (event) {
            this.arweaveaddress = event.params.arAddressPassed
        },
        async sendDonation() {
            const isValid = await this.$refs.saveDonateArweave.validate()
            if (isValid) {
                this.waitfortransaction = true
                this.buttontext = 'Submitting donation'
                //Save the profile
                let addresskey = Cookies.get('aw_address_key')              
                this.arweaveKey = JSON.parse(addresskey)
                let postdata = {
                    'address': this.arweaveaddress,
                    'amount': this.arweaveamount,
                    'message': this.arweavemessage,
                    'arweaveKey': this.arweaveKey
                }
                this.$store.dispatch(CREATE_TRANSACTION_REQUEST, postdata).then((transaction) => {
                    transaction.addTag('kitabudonationamount', postdata.amount)
                    transaction.addTag('kitabudonationmessage', postdata.message)
                    transaction.addTag('kitabuadddonation', 'yes')
                    transaction.addTag('App-Name', 'kitabumain')
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
                            this.buttontext = 'Send donation'
                            //Notify the user that the donation was approved submitted successfully, and redirect to home/publications
                            this.$store.commit(ADD_STATUS_SUCCESS_REQUEST, 'Donation transaction was successful, kindly allow time for confirmation')
                            this.$modal.hide('donate')
                            this.$scrollTo('#signInHeader')
                        })
                    })
                }).catch((err) => {})                
            }
        }
    }
}
</script>