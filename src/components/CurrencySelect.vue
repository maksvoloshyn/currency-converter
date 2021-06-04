<template>
    <select
        class="border px-3 py-2 rounded-lg bg-white"
        aria-label="Currency selector"
        :value="code"
        @change="onCurrencyChange($event.target.value)"
    >
        <option :value="null">Select currency</option>
        <option v-for="{name, code} in currencies" :key="code" :value="code">{{ code }} - {{ name }}</option>
    </select>
</template>

<script>
    export default {
        name: 'currency-select',

        props: {
            currencies: {
                type: Array,
                required: true,
            },

            code: {
                type: String,
                default: null,
            },
        },

        methods: {
            onCurrencyChange(value) {
                this.$emit('change', value);
            },
        },
    };
</script>
