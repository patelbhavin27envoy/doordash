import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { ChatWindow } from '../chat-window'
import { MemoryRouter } from 'react-router-dom';

describe("ChatWindow Component :: ", () => {

    let userName = "test-1";
    let roomChangeHandler = (room) => {
        return room;
    };

    it("should render", () => {

        // Act
        let component = renderer.create(
            <MemoryRouter>
                <ChatWindow />
            </MemoryRouter>
        ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();


        // Act
        component = mount(
            <MemoryRouter>
                <ChatWindow />
            </MemoryRouter>
        );

        expect(component.find('.error').text())
            .toContain('Sorry ! something went wrong');
        expect(component.find('.chatList').text())
            .toContain("");
    });


    it("should make the service call for rooms", () => {

        // define the response
        const usersData = [ 'user-1', 'user-2', 'user-3'];

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/rooms';
        const mockJsonPromise = Promise.resolve(usersData);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4
        let component = mount(
            <MemoryRouter>
                <ChatWindow  users={usersData} />
            </MemoryRouter>
        );

        component.update();
        expect(component.find('.error').text())
            .toContain('Sorry ! something went wrong');
        expect(component.find('.chatList').text())
            .toContain("");

        const rooms = [
            {"name":"Analytics","id":1},
            {"name":"Business","id":2},
            {"name":"Design","id":3},
            {"name":"Engineering","id":4},
            {"name":"HR","id":5},
            {"name":"Operations","id":6},
            {"name":"Special Ops","id":7}];

        component.setState({
            users: usersData ,
            room: {
                id: 1, name : 'Analytics'
            },
            rooms: rooms
            });
        component.update();

        console.log(component.debug());
        expect(component.find('.users').text())
            .toContain("user-1, user-2, user-3");
    });



});

