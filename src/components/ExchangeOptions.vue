<template>
    <div class="flex flex-col sm:items-center">
        <div v-for="(option, index) in exchangeOptions" :key="index" class="flex items-center py-3 w-11/12 sm:w-auto">
            <exchange-option
                :currencies="currencies"
                v-bind="option"
                @update:amount="updateBaseAmount($event, option.code)"
                @update:code="updateCurrencyForExchange($event, index)"
            ></exchange-option>
            <button
                v-show="canRemoveExchangeOption"
                class="ml-3 p-2 rounded-full"
                aria-label="Remove currency"
                @click="removeExchangeOption(index)"
            >
                &#10006;
            </button>
        </div>

        <button class="bg-blue-600 border font-bold px-3 py-2 rounded-lg text-white mt-4" @click="addExchangeOption">
            Add currency
        </button>
    </div>
</template>

<script>
    import ExchangeOption from '@/components/ExchangeOption';

    const DEFAULT_EXCHANGE_CURRENCY = 'USD';

    export default {
        name: 'exchange-options',

        components: {
            'exchange-option': ExchangeOption,
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
                    amount: (currency && this.amountInBaseCurrency * this.rates[currency]) || 0,
                }));
            },

            canRemoveExchangeOption() {
                return this.exchangeOptions.length > 2;
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

            addExchangeOption() {
                this.currenciesForExchange.push(null);
            },

            removeExchangeOption(index) {
                this.currenciesForExchange.splice(index, 1);
            },
        },
    };
</script>

<style scoped></style>
