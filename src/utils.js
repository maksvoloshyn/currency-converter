const formatterForSignificantDigits = new Intl.NumberFormat(navigator.language, {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 4,
});
const formatterForFractionDigits = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
const EXAMPLE_NUMBER = 12345;

export function localiseExchangeValue(value) {
    // If a result of the conversion couldn't be rounded up to one hundredth,
    // the result will be return with 4 significant digits
    if (value < 0.005 && value > 0) {
        return formatterForSignificantDigits.format(value);
    }

    return formatterForFractionDigits.format(value);
}

function findByProp(collection, prop, value) {
    return collection.find(element => element[prop] === value);
}

export function parseFormattedNumber(formatted = '') {
    const formatGroups = formatterForFractionDigits.formatToParts(EXAMPLE_NUMBER);
    const groupSign = findByProp(formatGroups, 'type', 'group').value;
    const decimalSign = findByProp(formatGroups, 'type', 'decimal').value;
    let normalizedValue = formatted;

    if (groupSign) {
        normalizedValue = formatted.replaceAll(groupSign, '');
    }

    if (decimalSign) {
        normalizedValue = normalizedValue.replace(decimalSign, '.');
    }

    return parseFloat(normalizedValue);
}
