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
    import {localiseExchangeValue} from '@/utils';

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
                interactionValue: '',
            };
        },

        computed: {
            inputValue() {
                return this.isInputActive ? this.interactionValue : localiseExchangeValue(this.amount);
            },
        },

        methods: {
            updateValue(value) {
                this.interactionValue = value;
                this.$emit('change', parseFloat(value));
            },

            toggleActiveState(state) {
                this.isInputActive = state;
            },
        },
    };
</script>
