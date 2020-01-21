import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Rooms } from '../rooms'

describe("Rooms Component :: ", () => {

    let userName = "test-1";
    let roomChangeHandler = (room) => {
        return room;
    };

    it("should render without throwing an error", () => {

        expect(
            renderer.create(
                <Rooms userName={userName} roomChange={ (room) => {roomChangeHandler(room)} } />
            )
        ).not.toBe(null);
    });

    it("should render ", () => {
        const component = mount(
            <Rooms userName={userName} roomChange={ (room) => {roomChangeHandler(room)} } />
        );
        expect(component).toMatchSnapshot();
    });


    it("should check basic elements of the component. ", () => {

        const component = mount(
            <Rooms userName={userName} roomChange={ (room) => {roomChangeHandler(room)} } />
        );

        expect(component.find('.left').length).toEqual(1);
        expect(component.find('.wrapper').length).toEqual(1);
        expect(component.find('.sidebar-header').length).toEqual(1);
        expect(component.find('.name').text()).toContain('test-1');
        expect(component.find('.online-time').text()).toContain('was online 1 hour before');

        // Assert
        expect(component.state('loading')).toBe(true);
        expect(component.state('error')).toBe(null);

    });


    it("should make the service call for rooms", () => {

        // define the response
        const mockSuccessResponse = [
            {"name":"Analytics","id":1},
            {"name":"Business","id":2},
            {"name":"Design","id":3},
            {"name":"Engineering","id":4},
            {"name":"HR","id":5},
            {"name":"Operations","id":6},
            {"name":"Special Ops","id":7}];

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/rooms';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4
        let component = mount(
            <Rooms userName={userName} roomChange={ (room) => { roomChangeHandler(room) } } />
        );

        // jest.spyOn(Rooms.prototype, 'onRoomChange');
        // const spyDidMount = jest.spyOn(Rooms.prototype,"componentDidMount");
        component.setState({
            rooms: mockSuccessResponse ,
            room: {
                id: 1, name : 'Analytics'
            }});
        component.update();

        // basic checks
        expect(component.find('.online-time').text()).toContain('was online 1 hour before');
        // Assert
        expect(component.state('loading')).toBe(true);
        expect(component.state('error')).toBe(null);

        // check the dept names
        expect(component.find('.left').text()).toContain('Engineering');
        expect(component.find('.left').text()).toContain('Analytics');
        expect(component.find('.left').text()).toContain('Business');
        expect(component.find('.left').text()).toContain('Design');
        expect(component.find('.left').text()).toContain('HR');
        expect(component.find('.left').text()).toContain('Operations');
        expect(component.find('.left').text()).toContain(' Special Ops');
        component.find('.rooms').childAt(0).simulate('click');
    });

});

