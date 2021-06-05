<template>
    <div class="w-full px-4">
        <h1 class="font-semibold mb-7 text-2xl text-gray-700">Currency converter</h1>
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
                base: null,
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
