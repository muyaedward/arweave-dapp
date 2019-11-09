import Vue from 'vue'
import Cookies from 'js-cookie'
import Arweave from 'arweave/web'
import { and, or, equals } from 'arql-ops';
const arweave = Arweave.init()

import {
    GET_PUBLICATIONS_REQUEST,
    ADD_PUBLICATION_REQUEST,
    EMPTY_PUBLICATION_REQUEST,
    UPDATE_LOADER_REQUEST,
    GET_PUBLICATIONS_SORTED_REQUEST
} from '../actions/profile'

const state = {
    transactions: []
}

const getters = {
    getAllPublications: state => state.transactions
}

const actions = {
    [GET_PUBLICATIONS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            const trs_query = and(
                equals('App-Name', 'kitabumain'),
                equals('ispublication', 'yes')
            )
            arweave.arql(trs_query).then((kitabu_transactions) => {                
                kitabu_transactions.forEach(kitabu_transaction => {                    
                    arweave.transactions.get(kitabu_transaction).then((transaction) => {
                        arweave.wallets.ownerToAddress(transaction.get('owner')).then((tx_owner) => {                            
                            let tx_data = transaction.get('data', {
                                decode: true,
                                string: true
                            })
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
                            
                            let datx = {
                                txowner: tx_owner,
                                pid: arweavetags_object.kitabupublicationid,
                                txdata: tx_data,
                                arweavetags: arweavetags_object
                            }
                            commit(ADD_PUBLICATION_REQUEST, datx)                            
                        }).catch((err) => {})                        
                    })
                })
                resolve(true)
            }).catch((err) => {})            
        })        
    },
    [GET_PUBLICATIONS_SORTED_REQUEST]: ({ commit }, payload) => {
        commit(EMPTY_PUBLICATION_REQUEST)
        commit(UPDATE_LOADER_REQUEST, true)
        return new Promise((resolve, reject) => {
            if (payload.subject != null && payload.s_term != null) {
                var trs_query = and(
                    equals('App-Name', 'kitabumain'),
                    equals('ispublication', 'yes'),
                    //equals('kitabutitle', payload.s_term),
                    equals('kitabusubject', payload.subject)
                )                
            }

            if (payload.subject != null && payload.s_term == null) {
                var trs_query = and(
                    equals('App-Name', 'kitabumain'),
                    equals('ispublication', 'yes'),
                    equals('kitabusubject', payload.subject)
                )
            }

            if (payload.subject == null && payload.s_term != null) {
                var trs_query = and(
                    equals('App-Name', 'kitabumain'),
                    equals('ispublication', 'yes'),
                    //equals('kitabutitle', payload.s_term),
                )
            }
            arweave.arql(trs_query).then((kitabu_transactions) => {                
                kitabu_transactions.forEach(kitabu_transaction => {                    
                    arweave.transactions.get(kitabu_transaction).then((transaction) => {
                        arweave.wallets.ownerToAddress(transaction.get('owner')).then((tx_owner) => {                            
                            let tx_data = transaction.get('data', {
                                decode: true,
                                string: true
                            })
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
                            
                            let datx = {
                                txowner: tx_owner,
                                pid: arweavetags_object.kitabupublicationid,
                                txdata: tx_data,
                                arweavetags: arweavetags_object
                            }
                            commit(ADD_PUBLICATION_REQUEST, datx)
                            commit(UPDATE_LOADER_REQUEST, false)
                        }).catch((err) => {})                        
                    })
                })
                resolve(true)
            }).catch((err) => {})            
        })        
    }

}

const mutations = {
    [ADD_PUBLICATION_REQUEST]: (state, payload) => {
        state.transactions.push(payload)
    },
    [EMPTY_PUBLICATION_REQUEST]: (state) => {
        state.transactions = []
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}