<template>
    <div class="flex flex-col sm:flex-row w-full flex-auto">
        <currency-select
            class="sm:mr-2 mb-2 sm:mb-0"
            :code="code"
            :currencies="currencies"
            @change="updateCode"
        ></currency-select>
        <currency-input
            :disabled="!code"
            :amount="amount"
            :aria-label="`Amount of ${code}`"
            @change="updateValue"
        ></currency-input>
    </div>
</template>

<script>
    import CurrencyInput from '@/components/CurrencyInput';
    import CurrencySelect from '@/components/CurrencySelect';

    export default {
        name: 'currency-row',

        components: {
            'currency-input': CurrencyInput,
            'currency-select': CurrencySelect,
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
