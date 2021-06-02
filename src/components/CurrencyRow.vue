<template>
    <div>
        <select :value="code" @change="updateCode($event.target.value)">
            <option v-for="{name, code} in currencies" :key="code" :value="code">{{ code }} - {{ name }}</option>
        </select>
        <input :value="amount" type="number" @input="updateValue($event.target.value)" step=".01" />
    </div>
</template>

<script>
    export default {
        name: 'CurrencyRow',

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
