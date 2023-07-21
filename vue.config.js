module.exports = {
    publicPath: '/hw_ui',
    pluginOptions: {
        i18n: {
            locale: 'ko-KR',
            fallbackLocale: 'en-US',
            localeDir: 'locales',
            enableInSFC: true
        }
    },
    configureWebpack: {
        devServer: {
            disableHostCheck: true,
        }

    },
    runtimeCompiler: true,
};
