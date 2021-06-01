<template>
    <div>
        <div>Converter</div>
        <div>{{ rates }}</div>
    </div>
</template>

<script>
    import {getAvailableRates} from '@/api/rates';

    export default {
        name: 'CurrencyConverter',

        data() {
            return {
                rates: null,
            };
        },

        async created() {
            const rates = await getAvailableRates();

            this.rates = rates;
        },
    };
</script>

<style scoped></style>
