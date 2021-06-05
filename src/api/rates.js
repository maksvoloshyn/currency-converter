import {buildRequestUrl, get} from '@/api/utils';

const baseUrl = 'https://openexchangerates.org/api';
const defaultParams = {app_id: process.env.VUE_APP_API_KEY};

const requestUrl = buildRequestUrl(baseUrl, defaultParams);

function transformAvailableRates([currencies, {rates, base}]) {
    return {
        rates,
        base,
        currencies: Object.keys(rates).map(code => ({code, name: currencies[code]})),
    };
}

export function getLatestRates(params = {}) {
    const url = requestUrl('/latest.json', params);

    return get(url).then(({rates, base}) => ({rates, base}));
}

export function getCurrencies() {
    const url = requestUrl('/currencies.json');

    return get(url);
}

export function getAvailableRates() {
    return Promise.all([getCurrencies(), getLatestRates()]).then(transformAvailableRates);
}
