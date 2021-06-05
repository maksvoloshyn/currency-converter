import {buildRequestUrl, get} from '@/api/utils';

const baseUrl = 'https://openexchangerates.org/api';
const defaultParams = {app_id: process.env.VUE_APP_API_KEY};

const requestUrl = buildRequestUrl(baseUrl, defaultParams);

function transformAvailableRates([symbols, {rates, base}]) {
    return {
        rates,
        base,
        currencies: Object.keys(rates).map(code => ({code, name: symbols[code]})),
    };
}

export function getLatestRates(params = {}) {
    const url = requestUrl('/latest.json', params);

    return get(url).then(({rates, base}) => ({rates, base}));
}

export function getSymbols() {
    const url = requestUrl('/currencies.json');

    return get(url).then(({symbols}) => symbols);
}

export function getAvailableRates() {
    return Promise.all([getSymbols(), getLatestRates()]).then(transformAvailableRates);
}
