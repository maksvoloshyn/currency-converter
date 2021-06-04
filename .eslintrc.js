module.exports = {
    root: true,

    env: {
        node: true,
        'jest/globals': true,
    },

    extends: ['plugin:vue/essential', 'eslint:recommended'],

    plugins: ['jest'],

    parserOptions: {
        parser: 'babel-eslint',
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
};
