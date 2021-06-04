import {shallowMount} from '@vue/test-utils';
import ExchangeOptions from '@/components/ExchangeOptions';

const ExchangeOptionStub = {
    template: '<span>{{code}} - {{amount}}</span>',
    props: ['currencies', 'code', 'amount'],
};

function factory() {
    return shallowMount(ExchangeOptions, {
        propsData: {
            currencies: currenciesMock,
            rates: ratesMock,
        },
        stubs: {
            'exchange-option': ExchangeOptionStub,
        },
    });
}

const currenciesMock = [{UAH: 'Ukrainian hryvna', EUR: 'Euro', USD: 'United States Dollar'}];
const ratesMock = {
    EUR: 1,
    UAH: 33,
    USD: 1.2,
};

describe('ExchangeOptions', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = factory();
    });

    it('renders correct template', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    describe('when `Add currency button is clicked`', () => {
        beforeEach(() => {
            return wrapper.find('#add-currency').trigger('click');
        });

        it('renders a new ExchangeOption component with nullish values', () => {
            const newOption = wrapper.findAllComponents(ExchangeOptionStub).at(2);

            expect(newOption.exists()).toBe(true);
            expect(newOption.props()).toEqual({
                currencies: currenciesMock,
                code: null,
                amount: 0,
            });
        });

        it('shows remove buttons for each option', () => {
            const removeButtons = wrapper.findAll('[aria-label="Remove currency"]');

            expect(removeButtons.length).toBe(3);

            removeButtons.wrappers.forEach(wrapper => {
                expect(wrapper.isVisible()).toBe(true);
            });
        });

        describe('when ExchangeOption emits `update:code`', () => {
            beforeEach(() => {
                const target = wrapper.findAllComponents(ExchangeOptionStub).at(2);

                target.vm.$emit('update:code', 'UAH');
            });

            it('updates its code and amount props to meet new currency', async () => {
                expect(wrapper.findAllComponents(ExchangeOptionStub).at(2).props()).toEqual({
                    currencies: currenciesMock,
                    code: 'UAH',
                    amount: 33,
                });
            });

            describe('when ExchangeOption emits `update:amount`', () => {
                it('updates amounts for all options to meet new exchange value', async () => {
                    const [optionA, optionB, optionC] = wrapper.findAllComponents(ExchangeOptionStub).wrappers;

                    await optionA.vm.$emit('update:amount', 10);

                    expect(optionA.props()).toEqual({
                        currencies: currenciesMock,
                        code: 'EUR',
                        amount: 10,
                    });

                    expect(optionB.props()).toEqual({
                        currencies: currenciesMock,
                        code: 'USD',
                        amount: 12,
                    });

                    expect(optionC.props()).toEqual({
                        currencies: currenciesMock,
                        code: 'UAH',
                        amount: 330,
                    });
                });
            });

            describe('when remove button is clicked', () => {
                beforeEach(() => {
                    wrapper.findAll('[aria-label="Remove currency"]').at(1).trigger('click');
                });

                it('removes relevant option', () => {
                    const options = wrapper.findAllComponents(ExchangeOptionStub);

                    expect(options.length).toBe(2);
                    expect(options.at(0).props('code')).toBe('EUR');
                    expect(options.at(1).props('code')).toBe('UAH');
                });

                it('hides remove buttons', () => {
                    const removeButtons = wrapper.findAll('[aria-label="Remove currency"]');

                    expect(removeButtons.length).toBe(2);

                    removeButtons.wrappers.forEach(wrapper => {
                        expect(wrapper.isVisible()).toBe(false);
                    });
                });
            });
        });
    });
});
