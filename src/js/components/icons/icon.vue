<template>
    <svg :class="item.class" xmlns="http://www.w3.org/2000/svg" :viewBox="item.viewbox">
        <address-book-icon :is="item.type"></address-book-icon>
        <bars-icon :is="item.type"></bars-icon>
        <caret-up-icon :is="item.type"></caret-up-icon>
        <chevron-down-icon :is="item.type"></chevron-down-icon>
        <clock-icon :is="item.type"></clock-icon>
        <cog-icon :is="item.type"></cog-icon>
        <credit-card-icon :is="item.type"></credit-card-icon>
        <cubes-icon :is="item.type"></cubes-icon>
        <gift-icon :is="item.type"></gift-icon>
        <globe-africa-icon :is="item.type"></globe-africa-icon>
        <life-ring-icon :is="item.type"></life-ring-icon>
        <paper-plane-icon :is="item.type"></paper-plane-icon>
        <pencil-ruler-icon :is="item.type"></pencil-ruler-icon>
        <power-off-icon :is="item.type"></power-off-icon>
        <share-square-icon :is="item.type"></share-square-icon>
        <sliders-h-icon :is="item.type"></sliders-h-icon>
        <times-icon :is="item.type"></times-icon>
        <upload-icon :is="item.type"></upload-icon>
        <users-icon :is="item.type"></users-icon>
        <wallet-icon :is="item.type"></wallet-icon>
        <list-icon :is="item.type"></list-icon>
        <search-icon :is="item.type"></search-icon>
        <donate-icon :is="item.type"></donate-icon>
    </svg>
</template>
<script>
import addressBookIcon from "./address-book/index.vue"
import barsIcon from "./bars/index.vue"
import caretUpIcon from "./caret-up/index.vue"
import chevronDownIcon from "./chevron-down/index.vue"
import clockIcon from "./clock/index.vue"
import cogIcon from "./cog/index.vue"
import creditCardIcon from "./credit-card/index.vue"
import cubesIcon from "./cubes/index.vue"
import giftIcon from "./gift/index.vue"
import globeAfricaIcon from "./globe-africa/index.vue"
import lifeRingIcon from "./life-ring/index.vue"
import paperPlaneIcon from "./paper-plane/index.vue"
import pencilRulerIcon from "./pencil-ruler/index.vue"
import powerOffIcon from "./power-off/index.vue"
import shareSquireIcon from "./share-square/index.vue"
import slidersHIcon from "./sliders-h/index.vue"
import timesIcon from "./times/index.vue"
import walletIcon from "./wallet/index.vue"
import uploadIcon from "./upload/index.vue"
import usersIcon from "./users/index.vue"
import listIcon from "./list/index.vue"
import searchIcon from "./search/index.vue"
import donateIcon from "./donate/index.vue"
export default {
    props: {
        item: {
            type: Object,
            required: true,
            default: {
                class: 'fill-current text-gray-400 h-5 w-5 sm:h-6 sm:w-6 mr-2',
                type: 'upload-icon',
                viewbox: '0 0 24 24'
            }
        }
    },
    components: {
        'address-book-icon': addressBookIcon,
        'bars-icon': barsIcon,
        'caret-up-icon': caretUpIcon,
        'chevron-down-icon': chevronDownIcon,
        'clock-icon': clockIcon,
        'cog-icon': cogIcon,
        'credit-card-icon': creditCardIcon,
        'cubes-icon': cubesIcon,
        'gift-icon': giftIcon,
        'globe-africa-icon': globeAfricaIcon,
        'life-ring-icon': lifeRingIcon,
        'paper-plane-icon': paperPlaneIcon,
        'pencil-ruler-icon': pencilRulerIcon,
        'power-off-icon': powerOffIcon,
        'share-square-icon': shareSquireIcon,
        'sliders-h-icon': slidersHIcon,
        'times-icon': timesIcon,
        'wallet-icon': walletIcon,
        'upload-icon': uploadIcon,
        'users-icon': usersIcon,
        'list-icon': listIcon,
        'search-icon': searchIcon,
        'donate-icon': donateIcon,
    }
}
</script>