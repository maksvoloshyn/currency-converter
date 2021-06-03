<template>
    <div>
        <select :value="code" @change="updateCode($event.target.value)">
            <option :value="null">Select currency</option>
            <option v-for="{name, code} in currencies" :key="code" :value="code">{{ code }} - {{ name }}</option>
        </select>
        <currency-input :disabled="!code" :amount="amount" @change="updateValue"></currency-input>
    </div>
</template>

<script>
    import CurrencyInput from '@/components/CurrencyInput';

    export default {
        name: 'CurrencyRow',

        components: {
            'currency-input': CurrencyInput,
        },

        props: {
            currencies: {
                type: Array,
                required: true,
            },

            amount: {
                type: Number,
                default: 0,
            },

            code: {
                type: String,
                default: null,
            },
        },

        methods: {
            updateValue(value) {
                this.$emit('update:amount', value);
            },

            updateCode(code) {
                this.$emit('update:code', code);
            },
        },
    };
</script>

<style scoped></style>
