import {isMocked, mockedGet} from '@/__mocks';

export function encodeParams(params = {}) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export function buildRequestUrl(baseUrl, defaultParams) {
    return (path, params = {}) => {
        const paramsAsString = encodeParams({...defaultParams, ...params});

        return `${baseUrl}${path}?${paramsAsString}`;
    };
}

export function get(url) {
    return isMocked() ? mockedGet(url) : fetch(url, {mode: 'cors'}).then(response => response.json());
}
