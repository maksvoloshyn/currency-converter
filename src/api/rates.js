import {buildRequestUrl, get} from '@/api/utils';

const baseUrl = 'http://api.exchangeratesapi.io/v1';
const defaultParams = {access_key: process.env.VUE_APP_API_KEY};

const requestUrl = buildRequestUrl(baseUrl, defaultParams);

function transformAvailableRates([symbols, {rates, base}]) {
    return {
        rates,
        base,
        currencies: Object.keys(rates).map(code => ({code, name: symbols[code]})),
    };
}

export function getLatestRates(params = {}) {
    const url = requestUrl('/latest', params);

    return get(url).then(({rates, base}) => ({rates, base}));
}

export function getSymbols() {
    const url = requestUrl('/symbols');

    return get(url).then(({symbols}) => symbols);
}

export function getAvailableRates() {
    return Promise.all([getSymbols(), getLatestRates()]).then(transformAvailableRates);
}
