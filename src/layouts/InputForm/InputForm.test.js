import { shallow, mount } from "enzyme";

import InputForm from './InputForm'


describe("testing Input Form", () => {
    //let wrapper;
    //beforeEach = () => {
    //    wrapper = shallow(<InputForm />);
    //}
    test('render a form ', () => {
        const wrapper = shallow(<InputForm />);
        wrapper.find('form');
    });

    test('render a button with text containing word calculate ', () => {
        const wrapper = shallow(<InputForm />);
        expect(wrapper.find('.calculate-fee-btn').text()).toContain("Calculate")
    });

});