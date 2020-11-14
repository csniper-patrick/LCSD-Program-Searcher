module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
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
        name: 'LCSD Program searcher',
        themeColor: '#448aff',
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [{
                urlPattern: new RegExp('^https://cors-anywhere.herokuapp.com/'),
                handler: 'networkFirst',
                    options: {
                    networkTimeoutSeconds: 20,
                    cacheName: 'api-cache',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            }],
        }
    }
}
