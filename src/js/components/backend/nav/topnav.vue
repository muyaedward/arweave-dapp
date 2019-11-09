<template>
    <div class="w-2/3 flex">
        <router-link to="/submit" :class="{ 'flex items-center mr-6 xs:mr-1 sm:mr-2 cursor-pointer': true }">
            <div class="xs:flex xs:items-center text-gray-700 hover:text-blue-600 py-4 px-1 sm:py-6 xs:px-1 sm:px-1 md:px-3">
                <svg :class="{ 'fill-current h-6 w-6 xs:mr-1': true, 'routericon': true }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                </svg>
                <span :class="{ 'hidden xs:block uppercase text-xs sm:text-sm md:text-base font-semibold': true, 'routeractive': true }">Submit a paper</span>
            </div>
        </router-link>
        <router-link to="/authors" :class="{ 'flex items-center mr-6 xs:mr-1 sm:mr-2 cursor-pointer': true }">
            <div class="xs:flex xs:items-center text-gray-700 hover:text-blue-600 py-4 px-1 sm:py-6 xs:px-1 sm:px-1 md:px-3">
                <svg :class="{ 'fill-current h-6 w-6 xs:mr-1': true, 'routericon': true }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
                </svg>
                <span :class="{ 'hidden xs:block uppercase text-xs sm:text-sm md:text-base font-semibold': true, 'routeractive': true }">Authors</span>
            </div>
        </router-link>
        <router-link to="/subjects" :class="{ 'flex items-center mr-6 xs:mr-1 sm:mr-2 cursor-pointer': true }">
            <div class="xs:flex xs:items-center text-gray-700 hover:text-blue-600 py-4 px-1 sm:py-6 xs:px-1 sm:px-1 md:px-3">
                <svg :class="{ 'fill-current h-6 w-6 xs:mr-1': true, 'routericon': true }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/>
                </svg>
                <span :class="{ 'hidden xs:block uppercase text-xs sm:text-sm md:text-base font-semibold': true, 'routeractive': true }">Browse subjects</span>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
    .router-link-exact-active {
        border-bottom-width: 2px;
        border-color: #63b3ed;
    }

    .router-link-exact-active .routeractive {
        color: #3182ce;
    }

    .router-link-exact-active .routericon {
        color: #3182ce;
    }

    
</style>