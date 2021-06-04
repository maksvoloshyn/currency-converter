module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: ['**/src/**/*.spec.js'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,vue}'],
    testEnvironment: 'jsdom',
};
