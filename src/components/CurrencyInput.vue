<template>
    <input
        class="border px-3 py-2 rounded-lg"
        :value="inputValue"
        @input="updateValue($event.target.value)"
        @focus="toggleActiveState(true)"
        @blur="toggleActiveState(false)"
    />
</template>

<script>
    import {localiseExchangeValue, parseFormattedNumber} from '@/utils';

    export default {
        name: 'currency-input',

        props: {
            amount: {
                type: Number,
                default: 0,
            },
        },

        data() {
            return {
                isInputActive: false,
                inputValue: '',
            };
        },

        computed: {
            isInputActiveAndAmount() {
                return [this.isInputActive, this.amount];
            },
        },

        watch: {
            isInputActiveAndAmount: {
                handler([isInputActive, amount]) {
                    if (!isInputActive) {
                        this.inputValue = localiseExchangeValue(amount);
                    }
                },
                immediate: true,
            },
        },

        methods: {
            updateValue(value) {
                this.inputValue = value;
                this.$emit('change', parseFormattedNumber(value));
            },

            toggleActiveState(state) {
                this.isInputActive = state;
            },
        },
    };
</script>
