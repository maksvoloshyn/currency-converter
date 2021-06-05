import latestMock from '@/__mocks/latest';
import currenciesMock from '@/__mocks/currencies';

export function mockedGet(url = '') {
    let mockedValue;

    switch (true) {
        case url.includes('/latest'):
            mockedValue = latestMock;
            break;
        case url.includes('/currencies'):
            mockedValue = currenciesMock;
            break;
        default:
            mockedValue = {};
    }

    return Promise.resolve(mockedValue);
}

export function isMocked() {
    return Boolean(window.localStorage.getItem('api_is_mocked'));
}
