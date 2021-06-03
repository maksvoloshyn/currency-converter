const formatterForSignificantDigits = new Intl.NumberFormat(navigator.language, {minimumSignificantDigits: 1});
const formatterForFractionDigits = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function localiseExchangeValue(value) {
    // If a result of the conversion couldn't be rounded up to one hundredth,
    // the result will be return with all fractions
    if (value < 0.005 && value > 0) {
        return formatterForSignificantDigits.format(value);
    }

    return formatterForFractionDigits.format(value);
}
