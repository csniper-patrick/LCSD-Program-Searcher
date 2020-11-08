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
    }
}
