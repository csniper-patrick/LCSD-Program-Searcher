module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath: ( process.env.NODE_ENV === 'production' && typeof process.env.CI_PROJECT_NAME !== 'undefined' ) ? '/' + process.env.CI_PROJECT_NAME + '/' : '/',
    devServer: {
        proxy: {
            '/lcsd': {
                target: 'https://www.lcsd.gov.hk/',
                changeOrigin: true,
                pathRewrite: {"^/lcsd": ""}
            },
        }
    },
    pwa: {
        name: '康體班小幫手',
        themeColor: '#448aff',
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [
                {
                    urlPattern: ( typeof process.env.VUE_APP_PROG_JSON_PROXY_LINK !== 'undefined' )? process.env.VUE_APP_PROG_JSON_PROXY_LINK :'https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json',
                    handler: 'NetworkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'api-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                }, 
                {
                    urlPattern: new RegExp('^https://fonts.'),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'fonts'
                    }
                },
                {
                    urlPattern: new RegExp('^https://cdn.jsdelivr.net'),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'material-icons'
                    }
                }
            ],
        }
    }
}
