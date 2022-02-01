import { mount } from "enzyme";


import App from './App';

describe("App testing", () => {
  test('renders learn react link', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('h1').text()).toContain("Deliverator")
  });
});
