module.exports = {
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
      port:'9000'
    }

  },
  runtimeCompiler: true,
};
