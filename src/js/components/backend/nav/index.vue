<template>
    <div class="border-b-2 sm:border-0 border-gray-100 pb-2">
        <ul class="flex flex-col">
            <nav-item :navitem="{ linkto: '/publications', item: { class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2', type: 'list-icon', viewbox: '0 0 512 512' }, active: false, name: 'Publications' }"></nav-item>
            <nav-item :navitem="{ linkto: '/submit', item: { class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2', type: 'upload-icon', viewbox: '0 0 512 512' }, active: false, name: 'Submit a paper' }"></nav-item>
            <nav-item :navitem="{ linkto: '/subjects', item: { class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2', type: 'list-icon', viewbox: '0 0 512 512' }, active: false, name: 'Browse Subjects' }"></nav-item>
            <nav-item :navitem="{ linkto: '/authors', item: { class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2', type: 'users-icon', viewbox: '0 0 640 512' }, active: false, name: 'Authors' }"></nav-item>
            <nav-item :navitem="{ linkto: '/search', item: { class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2', type: 'search-icon', viewbox: '0 0 512 512' }, active: false, name: 'Search Publications' }"></nav-item>
            <nav-item :navitem="{ linkto: '/donations', item: { class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2', type: 'donate-icon', viewbox: '0 0 512 512' }, active: false, name: 'Donations' }"></nav-item>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import navItem from './items/index'
export default {
    data(){
      return {}
    },
    components: {
        'nav-item': navItem
    },
    computed: {
        ...mapGetters(['getProfile'])
    },
    mounted(){},
    methods: {}
}
</script>