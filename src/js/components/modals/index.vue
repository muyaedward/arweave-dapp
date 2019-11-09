<template>
    <div>        
        <profile-modal></profile-modal>
        <donation-modal></donation-modal>
    </div>
</template>
<script>
import profileModal from './profile'
import donationModal from './donate'
export default {
    data(){
      return {}
    },
    components: {
        'profile-modal': profileModal,
        'donation-modal': donationModal
    },
    computed: {},
    mounted(){},
    methods: {}
}
</script>