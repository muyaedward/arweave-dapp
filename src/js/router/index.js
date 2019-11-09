import Vue from 'vue';
import VueRouter from 'vue-router'
import {store} from '../store'
Vue.use(VueRouter)

import {
    GET_PUBLICATIONS_REQUEST,
    UPDATE_LOADER_REQUEST
} from '../store/actions/profile'

import {
    AUTH_LOGOUT_DISPATCH
} from '../store/actions/auth'

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticatedAndGetPublications = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        return new Promise((resolve, reject) => {
            store.dispatch(GET_PUBLICATIONS_REQUEST).then((resp) => {
                if (resp) {                    
                    next()
                    resolve(resp)
                    return
                }
            }).catch((error) => {
                //Logout user
                store.dispatch(AUTH_LOGOUT_DISPATCH)
                reject(error)
                next('/')
            })
        })        
    }
    next('/')
}

import AwHome from '../components/frontend/home/index.vue'
import AwSubmit from '../components/backend/pages/submit/index.vue'
import AwProfile from '../components/backend/pages/profile/index.vue'
import AwSubjects from '../components/backend/pages/subjects/index.vue'
import AwAuthors from '../components/backend/pages/authors/index.vue'
import AwSearch from '../components/backend/pages/search/index.vue'
import AwDonations from '../components/backend/pages/donations/index.vue'
import AwPublications from '../components/backend/pages/publications/index.vue'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'aw-home',
            component: AwHome
        },
        
        {
            path: '/submit',
            name: 'aw-submit',
            component: AwSubmit,
            beforeEnter: ifAuthenticated
        },        
        {
            path: '/profile',
            name: 'aw-profile',
            component: AwProfile,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/subjects',
            name: 'aw-subjects',
            component: AwSubjects,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/authors',
            name: 'aw-authors',
            component: AwAuthors,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/search',
            name: 'aw-search',
            component: AwSearch,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/donations',
            name: 'aw-donations',
            component: AwDonations,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/publications',
            name: 'aw-publications',
            component: AwPublications,
            beforeEnter: ifAuthenticatedAndGetPublications
        },
    ]    
})

router.beforeEach((to, from, next) => {
    if (to.name) {
        store.commit(UPDATE_LOADER_REQUEST, true)
    }
    next()
})
router.afterEach((to, from) => {
    store.commit(UPDATE_LOADER_REQUEST, false)
})

export default router