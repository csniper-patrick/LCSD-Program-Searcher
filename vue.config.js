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
