<template>
    <router-link :to="navitem.linkto" :class="{ 'hover:bg-blue-700': true }">
        <li class="flex items-center py-2 sm:py-4 px-5">
            <svg-icon :item="navitem.item"></svg-icon>
            <span class="font-semibold sm:hidden lg:block">{{ navitem.name }}</span>
        </li>
    </router-link>    
</template>
<script>
export default {
    props: {
        navitem: {
            type: Object,
            required: true,
        }
    },
    components: {
        
    }
}
</script>
<style scoped>
    .router-link-exact-active {
        background-color: #2b6cb0;
    }
</style>