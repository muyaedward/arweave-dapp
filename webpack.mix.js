const mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js')
    .postCss('src/css/main.css', 'public/css', [
        require('tailwindcss')
    ])
    .setPublicPath('public');