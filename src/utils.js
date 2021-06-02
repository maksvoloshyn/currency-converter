const defaultLocale = navigator.language;

export function getUniqueId(prepend = '') {
    return `${prepend}_${Math.random().toString(36).substr(2, 9)}`;
}

export function localiseExchangeValue(value, locale = defaultLocale) {
    const formatter = new Intl.NumberFormat(locale);

    return formatter.format(value);
}

export function roundTo2Digits(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}
