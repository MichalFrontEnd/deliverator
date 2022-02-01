import { shallow, mount } from "enzyme";

import FeeForm from './FeeForm'

describe("testing Input Form", () => {
    test('render a form', () => {
        const wrapper = shallow(<FeeForm />);
        wrapper.find('form');
    });

    test('render a button with text containing word calculate', () => {
        const wrapper = shallow(<FeeForm />);
        expect(wrapper.find('.calculate-fee-btn').text()).toContain("Calculate")
    });

});