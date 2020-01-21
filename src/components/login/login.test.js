import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Login } from '../login'

describe("Login Component :: ", () => {

    it("should render without throwing an error", () => {
        expect(
            renderer.create(<Login />)
        ).not.toBe(null);
    });

    it("should render ", () => {
        const component = mount(<Login />);
        expect(component).toMatchSnapshot();
    });

    it("should change name. ", () => {

        const component = mount(<Login />);

        expect(component.find('div').length).toEqual(1);
        expect(component.find('h1').length).toEqual(1);
        expect(component.find('h1').text()).toContain('Chat App');

        expect(component.find('input').length).toEqual(2);
        expect(component.find('p').length).toEqual(1);
        expect(component.find('p').text()).toContain('Create an account through your Door dashboard.');

        component.find('.userName').simulate('change', {target: {name: 'userName', value: 'John'}});
        component.find('.btn').simulate('click');

    });


    it("should check login button click. ", () => {

        const component = shallow(<Login />);
        const instance = component.instance();
        instance.state.userName ="test";
        jest.spyOn(instance, 'login');
        instance.login();
        expect(instance.login).toHaveBeenCalled();

        expect(component.state('isSubmitting')).toBe(true);

        instance.onSubmit({
            preventDefault: () => {
            }
        });

        expect(component.state('isAuthenticated')).toBe(true);
    });

});

