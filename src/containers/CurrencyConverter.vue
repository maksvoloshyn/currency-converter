<template>
    <div>
        <div>Converter</div>
        <exchange-options
            v-if="dataIsLoaded"
            :currencies="currencies"
            :rates="rates"
            :base-currency="base"
        ></exchange-options>
    </div>
</template>

<script>
    import {getAvailableRates} from '@/api/rates';
    import ExchangeOptions from '@/components/ExchangeOptions';

    export default {
        name: 'CurrencyConverter',

        components: {
            'exchange-options': ExchangeOptions,
        },

        data() {
            return {
                rates: {},
                currencies: [],
                base: 'EUR',
                dataIsLoaded: false,
            };
        },

        created() {
            getAvailableRates().then(({rates, base, currencies}) => {
                this.rates = rates;
                this.base = base;
                this.currencies = currencies;
                this.dataIsLoaded = true;
            });
        },
    };
</script>

<style scoped>
    option + option {
        display: none;
    }
</style>
