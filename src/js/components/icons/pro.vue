<template>
    <div class="relative hidden sm:block">
        <button type="button" class="block focus:outline-none">
            <span class="block h-8 w-8 overflow-hidden rounded-full border-2  border-gray-600 xl:border-gray-300">
                <img src="/" class="h-full w-full object-cover">
            </span>
        </button>
        <div class="hidden">
            <button type="button" class="z-30 block fixed inset-0 w-full h-full cursor-default"></button>
            <div class="absolute z-40 right-0">
                <div class="mt-3 bg-white xl:border rounded-lg w-48 py-2 shadow-xl">
                    <a href="#account" class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-indigo-500">Account settings</a>
                    <a href="#support" class="block hover:text-white text-gray-800 mt-0 px-4 py-2 hover:bg-indigo-500">Support</a>
                    <a href="#sign-out" class="block hover:text-white text-gray-800 mt-0 px-4 py-2 hover:bg-indigo-500">Sign out</a>
                </div>
            </div>
        </div>
    </div>
</template>