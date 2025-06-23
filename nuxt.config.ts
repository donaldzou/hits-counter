// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@pinia/nuxt', 'nuxt-security'],
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap-icons/font/bootstrap-icons.min.css',
        'animate.css/animate.css',
        '~/assets/css/main.css'
    ],
    nitro: {
        experimental: {
            websocket: true
        }
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: "Hits Counter | Website Visit Tracker With an Image",
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                {
                    name: 'google-site-verification',
                    content: 'DZAz-h1AemdJo4_S2hJddtHRNkapwEd1dTYW-R7N018'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/Icon-1.png' },
            ],
            script: [
                {
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2283617751904576',
                    crossorigin: 'anonymous',
                    async: true
                }
            ]
        }
    },
    routeRules: {
        '/api/history': {
            security: {
                corsHandler: {
                    origin: '*'
                }
            }
        },
        '/api/hit': {
            security: {
                corsHandler: {
                    origin: '*'
                }
            }
        }
    }
})