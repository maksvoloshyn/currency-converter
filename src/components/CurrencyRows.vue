<template>
    <div>
        <currency-row
            v-for="(option, index) in exchangeOptions"
            :key="index"
            :currencies="currencies"
            v-bind="option"
            @update:amount="updateBaseAmount($event, option.code)"
            @update:code="updateCurrencyForExchange($event, index)"
        ></currency-row>
    </div>
</template>

<script>
    import CurrencyRow from '@/components/CurrencyRow';
    // import {roundTo2Digits} from '@/utils';

    const DEFAULT_EXCHANGE_CURRENCY = 'USD';

    export default {
        name: 'currency-rows',

        components: {
            'currency-row': CurrencyRow,
        },

        props: {
            rates: {
                type: Object,
                default: () => ({}),
            },

            baseCurrency: {
                type: String,
            },

            currencies: {
                type: Array,
                default: () => [],
            },
        },

        data() {
            const defaultExchangeCurrency = this.rates[DEFAULT_EXCHANGE_CURRENCY]
                ? DEFAULT_EXCHANGE_CURRENCY
                : this.currencies[0].code;

            return {
                pairs: [],
                currenciesForExchange: [this.baseCurrency, defaultExchangeCurrency],
                amountInBaseCurrency: 1,
            };
        },

        computed: {
            exchangeOptions() {
                return this.currenciesForExchange.map(currency => ({
                    code: currency,
                    amount: this.amountInBaseCurrency * this.rates[currency],
                }));
            },
        },

        methods: {
            updateBaseAmount(value, code) {
                const normalisedValue = typeof value === 'string' ? parseFloat(value) : value;

                this.amountInBaseCurrency = normalisedValue / this.rates[code];
            },

            updateCurrencyForExchange(code, index) {
                this.currenciesForExchange.splice(index, 1, code);
            },
        },
    };
</script>

<style scoped></style>
