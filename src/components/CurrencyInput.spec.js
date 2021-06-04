import {shallowMount} from '@vue/test-utils';
import CurrencyInput from '@/components/CurrencyInput';

function factory() {
    return shallowMount(CurrencyInput, {
        propsData: {
            amount: 12,
        },
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
            await wrapper.find('input').setValue('15');

            expect(wrapper.emitted('change')[0][0]).toBe(15);
        });
    });
});
