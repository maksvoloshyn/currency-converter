<template>
    <div id="app" class="mt-14 text-center">
        <CurrencyConverter />
    </div>
</template>

<script>
    import CurrencyConverter from '@/containers/CurrencyConverter';

    export default {
        name: 'App',
        components: {
            CurrencyConverter,
        },
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
