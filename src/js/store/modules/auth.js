import Vue from 'vue'
import Cookies from 'js-cookie'
import Arweave from 'arweave/web'
import Errors from '../../modules/errors'
const arweave = Arweave.init()
import {
    AUTH_REQUEST,
    AUTH_REQUEST_ERROR,
    AUTH_REQUEST_SUCCESS,
    LOGOTUSUCCESS_REQUEST,
    AUTH_LOGOUT_DISPATCH,
} from '../actions/auth'

const state = {
    aw_address: Cookies.get('aw_address'),
    aw_address_key: Cookies.get('aw_address_key'),
    status: 'idle',
    hasLoadedOnce: false,
    errors: new Errors()
}

const getters = {
    isAuthenticated: state => !!state.aw_address,
    authStatus: state => state.status,
    getArweaveKey: state => state.aw_address_key,
    authErrors: state => state.errors,
}

const actions = {
    [AUTH_REQUEST]: ({ commit }, jwk) => {              
        return new Promise((resolve, reject) => {
            arweave.wallets.jwkToAddress(jwk).then((address) => {
                Cookies.set('aw_address', address, {
                    expires: 1
                })
                Cookies.set('aw_address_key', jwk, {
                    expires: 1
                })
                //dispatch()// Get profile name, country, organization
                commit(AUTH_REQUEST_SUCCESS, address)
                resolve(address)
            })
            .catch((err) => {
                Cookies.remove('aw_address')
                Cookies.remove('aw_address_key')
                commit(AUTH_REQUEST_ERROR, err)
                reject(err)
            })
        })
    },
    [AUTH_LOGOUT_DISPATCH]: ({ commit }) => {
        Cookies.remove('aw_address')
        Cookies.remove('aw_address_key')
        commit(LOGOTUSUCCESS_REQUEST)
        return true
    }
}

const mutations = {
    [AUTH_REQUEST_SUCCESS]: (state, aw_address) => {
        state.errors.clear()
        state.status = 'success'
        state.aw_address = aw_address
        state.hasLoadedOnce = true
    },
    [LOGOTUSUCCESS_REQUEST]: (state) => {
        state.errors.clear()
        state.status = 'idle'
        state.hasLoadedOnce = false
    },
    [AUTH_REQUEST_ERROR]: (state, err) => {
        let errors = err.errors ? err.errors : {}
        if (err.message == "Cannot read property 'replace' of undefined") {
            errors.invalid_credentials = ['The user credentials were incorrect.']
        }
        state.errors.record(errors)
        state.status = 'error'
        state.hasLoadedOnce = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}