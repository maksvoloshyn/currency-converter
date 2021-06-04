import {shallowMount} from '@vue/test-utils';
import ExchangeOption from '@/components/ExchangeOption';

const CurrencySelectStub = {
    template: '<span>{{code}}</span>',
    props: ['currencies', 'code'],
};

const CurrencyInputStub = {
    template: '<span>{{amount}}</span>',
    props: ['currencies', 'amount'],
};

function factory() {
    return shallowMount(ExchangeOption, {
        propsData: {
            currencies: currenciesMock,
            amount: 12,
            code: 'EUR',
        },
        stubs: {
            'currency-input': CurrencyInputStub,
            'currency-select': CurrencySelectStub,
        },
    });
}

const currenciesMock = [{UAH: 'Ukrainian hryvna', EUR: 'Euro', USD: 'United States Dollar'}];

describe('ExchangeOption', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = factory();
    });

    it('renders correct template', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    describe('when the code is null', () => {
        it('sets disabled=true on CurrencyInput', async () => {
            await wrapper.setProps({code: null});

            expect(wrapper.getComponent(CurrencyInputStub).attributes('disabled')).toBe('disabled');
        });
    });

    describe('when CurrencyInput emits `change` event', () => {
        it('emits `update:amount` with a given value', async () => {
            await wrapper.getComponent(CurrencyInputStub).vm.$emit('change', 1033);

            expect(wrapper.emitted('update:amount')[0][0]).toBe(1033);
        });
    });

    describe('when updateCode emits `change` event', () => {
        it('emits `update:code` with a given value', async () => {
            await wrapper.getComponent(CurrencySelectStub).vm.$emit('change', 'USD');

            expect(wrapper.emitted('update:code')[0][0]).toBe('USD');
        });
    });
});
