jest.mock('@/utils', () => ({
    localiseExchangeValue: jest.fn().mockImplementation(value => value),
    parseFormattedNumber: jest.fn().mockImplementation(value => value),
}));

import {shallowMount} from '@vue/test-utils';
import CurrencyInput from '@/components/CurrencyInput';
import {parseFormattedNumber, localiseExchangeValue} from '@/utils';

function factory() {
    return shallowMount(CurrencyInput, {
        propsData: {
            amount: 12,
        },
        attachTo: document.body,
    });
}

describe('CurrencyInput', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = factory();
    });

    it('renders correct template', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    describe('when input element emits `input` event', () => {
        it('emits `change` event with a given value', async () => {
            parseFormattedNumber.mockReturnValue(15);
            await wrapper.find('input').setValue('15');

            expect(parseFormattedNumber).toHaveBeenCalledWith('15');
            expect(wrapper.emitted('change')[0][0]).toBe(15);
        });
    });

    describe('when input gets focus', () => {
        beforeEach(() => {
            wrapper.find('input').element.focus();
        });

        describe('and parent sets a new amount', () => {
            beforeEach(async () => {
                localiseExchangeValue.mockReturnValue('15.00');
                await wrapper.find('input').setValue('15a');
                await wrapper.setProps({amount: 15});
            });

            it('keeps current value of the input', () => {
                expect(wrapper.element.value).toBe('15a');
            });

            describe('and when input loses focus', () => {
                beforeEach(() => {
                    wrapper.find('input').trigger('blur');
                });

                test('sets value of the input to the given amount', () => {
                    expect(wrapper.element.value).toBe('15.00');
                });
            });
        });
    });
});
