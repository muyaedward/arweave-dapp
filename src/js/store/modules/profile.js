import Vue from 'vue'
import Cookies from 'js-cookie'
import Arweave from 'arweave/web'
const arweave = Arweave.init()
import {
    GET_USERPROFILE_REQUEST,    
    CREATE_TRANSACTION_REQUEST,
    SIGN_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_REQUEST,
    SET_AR_PROFILE_REQUEST,
    SET_AR_PROFILENAME_REQUEST,
    SET_AR_PROFILEORG_REQUEST,
    SET_AR_PROFILECOUNTRY_REQUEST,
    CREATE_SUBMIT_TRANSACTION_REQUEST,
    UPDATE_LOADER_REQUEST,
    ADD_STATUS_ERROR_REQUEST,
    ADD_STATUS_SUCCESS_REQUEST,
    CREATE_SUBMIT_DONATION_TRANSACTION_REQUEST
} from '../actions/profile'

import {
    GET_AR_BALANCE_REQUEST
} from '../actions/balance'

const state = {
    profile: {},
    address: Cookies.get('aw_address'),
    loading_status: false,
    statuserror: '',
    statussuccess: '',
}

const getters = {
    getUserProfile: state => state.profile,
    getStatusError: state => state.statuserror,
    getStatusSuccess: state => state.statussuccess,
    getArweaveAddress: state => state.address,
    getLoadingStatus: state => state.loading_status
}

const actions = {
    [GET_USERPROFILE_REQUEST]: ({ commit, dispatch }, tx_address) => {
        return new Promise((resolve, reject) => {
            arweave.transactions.get(tx_address).then(transaction => {
                var arweavetags_object = {}
                transaction.get('tags').forEach(tag => {
                    var tag_name = tag.get('name', {
                        decode: true,
                        string: true
                    })
                    var tag_value = tag.get('value', {
                        decode: true,
                        string: true
                    })
                    arweavetags_object[tag_name] = tag_value
                })
                dispatch(GET_AR_BALANCE_REQUEST, Cookies.get('aw_address')).then((bal) => {
                    commit(SET_AR_PROFILE_REQUEST, arweavetags_object)
                    resolve(arweavetags_object)
                })                
            })
        })        
    },

    [CREATE_TRANSACTION_REQUEST]: ({ commit }, payload) => {       
        return new Promise((resolve, reject) => {
            arweave.createTransaction({ data: 'kitabudata' }, payload.arweaveKey).then((transaction) => {       
                resolve(transaction)
            })            
        })        
    },

    [CREATE_SUBMIT_TRANSACTION_REQUEST]: ({ commit }, payload) => {       
        return new Promise((resolve, reject) => {
            //confirm the address is the same
            arweave.createTransaction({
                data: Buffer.from(payload.data, 'utf8')
            }, payload.arweaveKey).then((transaction) => {
                //commit(SET_AR_BALANCE_REQUEST, thebalance)           
                resolve(transaction)
            })            
        })        
    },

    [CREATE_SUBMIT_DONATION_TRANSACTION_REQUEST]: ({ commit }, payload) => {       
        return new Promise((resolve, reject) => {
            //confirm the address is the same
            arweave.createTransaction({
                target: payload.address,
                quantity: arweave.ar.arToWinston(parseFloat(payload.amount))
            }, payload.arweaveKey).then((transaction) => {
                resolve(transaction)
            })            
        })        
    },

    [SIGN_TRANSACTION_REQUEST]: ({ commit }, payload) => { 
        return new Promise((resolve, reject) => {
            arweave.transactions.sign(payload.tx, payload.arweaveKey).then((transaction) => {
                resolve(transaction)
            })
        })
    },

    [SAVE_TRANSACTION_REQUEST]: ({ commit }, transaction) => {
        return new Promise((resolve, reject) => {
            arweave.transactions.post(transaction).then((response) => {
                resolve(response)
            })            
        })
    }
}

const mutations = {
    [SET_AR_PROFILENAME_REQUEST]: (state, payload) => {
        state.profile.profilefullname = payload
    },
    [SET_AR_PROFILEORG_REQUEST]: (state, payload) => {
        state.profile.profileorganization = payload
    },
    [SET_AR_PROFILECOUNTRY_REQUEST]: (state, payload) => {
        state.profile.profilecountry = payload
    },
    [SET_AR_PROFILE_REQUEST]: (state, payload) => {
        state.profile = payload
    },

    [UPDATE_LOADER_REQUEST]: (state, payload) => {
        state.loading_status = payload
    },

    [ADD_STATUS_ERROR_REQUEST]: (state, payload) => {
        state.statuserror = payload
    },

    [ADD_STATUS_SUCCESS_REQUEST]: (state, payload) => {
        state.statussuccess = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}