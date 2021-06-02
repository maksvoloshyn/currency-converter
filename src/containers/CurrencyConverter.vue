<template>
    <div>
        <div>Converter</div>
        <currency-rows
            v-if="dataIsLoaded"
            :currencies="currencies"
            :rates="rates"
            :base-currency="base"
        ></currency-rows>
    </div>
</template>

<script>
    import {getAvailableRates} from '@/api/rates';
    import CurrencyRows from '@/components/CurrencyRows';

    export default {
        name: 'CurrencyConverter',

        components: {
            'currency-rows': CurrencyRows,
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
