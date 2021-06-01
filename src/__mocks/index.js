import latestMock from '@/__mocks/latest';
import symbolsMock from '@/__mocks/symbols';

export function mockedGet(url = '') {
    let mockedValue;

    switch (true) {
        case url.includes('/latest'):
            mockedValue = latestMock;
            break;
        case url.includes('/symbols'):
            mockedValue = symbolsMock;
            break;
        default:
            mockedValue = {};
    }

    return Promise.resolve(mockedValue);
}

export function isMocked() {
    return window.localStorage.getItem('api_is_mocked') !== null;
}
