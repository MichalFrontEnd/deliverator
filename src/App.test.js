import { render, screen } from '@testing-library/react';
import { shallow } from "enzyme";


import App from './App';
import InputForm from "./layouts/InputForm";

describe("App testing", () => {
  //just to get it off my back. later test for components or smh
  test('renders learn react link', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toContain("Deliverator")
  });
});
