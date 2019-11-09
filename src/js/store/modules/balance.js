import Vue from 'vue'
import Cookies from 'js-cookie'
import Arweave from 'arweave/web'
const arweave = Arweave.init()
import {
    GET_AR_BALANCE_REQUEST,
    SET_AR_BALANCE_REQUEST,
    SET_AR_BALANCE_REQUEST_ERROR
} from '../actions/balance'

const state = {
    balance: null,
    error: null
}

const getters = {
    getAwBalance: state => state.balance
}

const actions = {
    [GET_AR_BALANCE_REQUEST]: ({ commit }, address) => {
        return new Promise((resolve, reject) => {
            arweave.wallets.getBalance(address).then((balance) => {
                let thebalance = {
                    winston: balance,
                    ar: arweave.ar.winstonToAr(balance)
                }
                commit(SET_AR_BALANCE_REQUEST, thebalance)
                resolve(thebalance)
            })
            .catch((err) => {              
                commit(SET_AR_BALANCE_REQUEST_ERROR, err)
                reject(err)
            })
        })
    }
}

const mutations = {
    [SET_AR_BALANCE_REQUEST]: (state, payload) => {
        state.balance = payload
    },
    [SET_AR_BALANCE_REQUEST_ERROR]: (state, payload) => {
        state.error = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}