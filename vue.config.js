module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/currency-converter/' : '/',
    chainWebpack: config => {
        config.plugin('define').tap(([options]) => {
            return [
                {
                    ...options,
                    'process.env': {
                        ...options['process.env'],
                        VUE_APP_API_KEY: JSON.stringify(process.env.VUE_APP_API_KEY),
                    },
                },
            ];
        });
    },
};
