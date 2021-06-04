jest.mock('@/api/rates', () => ({
    getAvailableRates: jest.fn().mockReturnValue(new Promise(() => {})),
}));

import {shallowMount} from '@vue/test-utils';
import CurrencyConverter from '@/containers/CurrencyConverter';
import {getAvailableRates} from '@/api/rates';

const ExchangeOptionsStub = {
    render: jest.fn(),
    props: ['currencies', 'rates', 'baseCurrency'],
};

function factory() {
    return shallowMount(CurrencyConverter, {
        stubs: {
            'exchange-options': ExchangeOptionsStub,
        },
    });
}

const currenciesMock = [{AED: 'United Arab Emirates Dirham', AFN: 'Afghan Afghani', ALL: 'Albanian Lek'}];
const ratesMock = {EUR: 1, AED: 0.24, AFN: 2.33};
const baseMock = 'USD';

describe('CurrencyConverter', () => {
    let wrapper;

    it('invokes getAvailableRates from api/rates ', () => {
        factory();

        expect(getAvailableRates).toHaveBeenCalled();
    });

    describe('promise from getAvailableRates', () => {
        describe('when it is pending', () => {
            it('does not render ExchangeOptions', () => {
                wrapper = factory();
                expect(wrapper.findComponent(ExchangeOptionsStub).exists()).toBe(false);
            });
        });

        describe('when it is resolved', () => {
            beforeEach(() => {
                getAvailableRates.mockResolvedValue({
                    currencies: currenciesMock,
                    rates: ratesMock,
                    base: baseMock,
                });

                wrapper = factory();
            });

            it('renders ExchangeOptions with correct props', () => {
                expect(wrapper.findComponent(ExchangeOptionsStub).props()).toEqual({
                    currencies: currenciesMock,
                    rates: ratesMock,
                    baseCurrency: baseMock,
                });
            });
        });
    });
});
