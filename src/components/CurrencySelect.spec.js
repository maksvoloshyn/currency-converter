import {shallowMount} from '@vue/test-utils';
import CurrencySelect from '@/components/CurrencySelect';

const currenciesMock = [
    {code: 'UAH', name: 'Ukrainian hryvna'},
    {code: 'EUR', name: 'Euro'},
    {code: 'USD', name: 'United States Dollar'},
];

function factory() {
    return shallowMount(CurrencySelect, {
        propsData: {
            currencies: currenciesMock,
            code: 'EUR',
        },
    });
}

describe('CurrencySelect', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = factory();
    });

    it('renders correct template', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    describe('when select element emits `change` event', () => {
        it('emits `change` event with a given value', async () => {
            wrapper.find('[value="UAH"]').setSelected();

            expect(wrapper.emitted('change')[0][0]).toBe('UAH');
        });
    });
});
