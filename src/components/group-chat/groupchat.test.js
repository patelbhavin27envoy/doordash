import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Rooms } from '../rooms'
import {Groupchat} from "./index";

describe("GroupChat Component :: ", () => {

    let userName = "test-1";
    let roomUsers ="user1, user2, user3";
    const mockSuccessResponse = [
        {"name":"Analytics","id":1},
        {"name":"Business","id":2},
        {"name":"Design","id":3},
        {"name":"Engineering","id":4},
        {"name":"HR","id":5},
        {"name":"Operations","id":6},
        {"name":"Special Ops","id":7}];

    const mockMessages = [{"name":"Ryan","message":"ayyyyy","id":"gg35545","reaction":null},{"name":"Nick","message":"lmao","id":"yy35578","reaction":null},{"name":"Danielle","message":"leggooooo","id":"hh9843","reaction":null},{"name":"{userName}","message":"hello","id":"nrrNG73M","reaction":null},{"name":"{userName}","message":"how are yout?","id":"g-Sea5UN","reaction":null},{"name":"{userName}","message":"asdf","id":"-WocXgWA","reaction":null},{"name":"userName","message":"asdfsadf","id":"yry_pnjv","reaction":null},{"name":"userName","message":"asdf","id":"UqkYSE1n","reaction":null},{"name":"aaaa","message":"asdfasf","id":"jjITz82w","reaction":null},{"name":"aaaa","message":"hello how do you do ? ","id":"K4881kl2","reaction":null},{"name":"aaaa","message":"afadsfas","id":"7fRoYer7","reaction":null},{"name":"kindacook","message":"kinda cool","id":"FXtFu3qb","reaction":null},{"name":"kindacook","message":"repeat after me .","id":"VZdSD4nY","reaction":null},{"name":"aaaa","message":"heloadf","id":"yMuK4uHq","reaction":null},{"name":"kindacook","message":"nice to see you","id":"DSdVlHp2","reaction":null},{"name":"kindacook","message":"hoasdfl","id":"-6pvP4pY","reaction":null},{"name":"kindacook","message":"asfasd","id":"6eJajSBE","reaction":null},{"name":"kindacook","message":"asdf","id":"Tj5MSYgvQ","reaction":null},{"name":"njnjn","message":"akadaf","id":"kOczghYy","reaction":null},{"name":"njnjn","message":"afdafa","id":"nvh1OhLV","reaction":null}];


    it("should render without throwing an error", () => {

        expect(
            renderer
                .create(
                    <Groupchat userName={userName} room={mockSuccessResponse[0]} roomUsers={roomUsers} />
                )).not.toBe(null);
    });

    it("should render ", () => {
        const component = mount(
            <Groupchat userName={userName} room={mockSuccessResponse[0]} roomUsers={roomUsers} />
    );
        expect(component).toMatchSnapshot();
    });


    it("should make the service call for messages", () => {

        // define the response
        const mockRooms = [
            {"name":"Analytics","id":1},
            {"name":"Business","id":2},
            {"name":"Design","id":3},
            {"name":"Engineering","id":4},
            {"name":"HR","id":5},
            {"name":"Operations","id":6},
            {"name":"Special Ops","id":7}];


        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/rooms';
        const mockJsonPromise = Promise.resolve(mockMessages);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4
        let component = mount(
            <Groupchat userName={userName} room={mockSuccessResponse[0]} roomUsers={roomUsers} />
        );

        component.setState({
            groupMessage: mockMessages ,
            room: {
                id: 1, name : 'Analytics'
            }});
        component.update();

        component.setState({
            groupMessage: mockMessages ,
            room: {
                id: 1, name : 'Analytics'
            }});
        component.update();

        // basic checks
        expect(component.find('.msg').length).toEqual(20);
        expect(component.find('.chatList').text()).toContain(' Ryan  ayyyyy  Nick  lmao  Danielle  leggooooo  {userName}  hello  {userName}  how are yout?  {userName}  asdf  userName  asdfsadf  userName  asdf  aaaa  asdfasf  aaaa  hello how do you do ?   aaaa  afadsfas  kindacook  kinda cool  kindacook  repeat after me .  aaaa  heloadf  kindacook  nice to see you  kindacook  hoasdfl  kindacook  asfasd  kindacook  asdf  njnjn  akadaf  njnjn  afdafa ');
    });


    it("should make the service call with Error for get Message", () => {

        const mockMessages =  {
            status: false,
            code: 400
        };

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/rooms/1/messages';
        const mockJsonPromise = Promise.reject(null);
        const mockFetchPromise = Promise.reject({
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4
        let component = mount(
            <Groupchat userName={userName} room={mockSuccessResponse[0]} roomUsers={roomUsers} />
        );

        component.update();

        // basic checks
        expect(component.find('.msg').length).toEqual(0);
        expect(component.find('.chatList').text())
            .toContain("");
    });


    it("should make the service call with for getMessage and sendMessage", () => {

        // let's mock the service call
        let endPoint = 'http://localhost:8080/api/rooms/1/messages';
        let mockJsonPromise = Promise.resolve(mockMessages);
        let mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4
        let component = mount(
            <Groupchat userName={userName} room={mockSuccessResponse[0]} roomUsers={roomUsers} />
        );

        component.update();

        // basic checks
        component.find('input').simulate('change',
            { target: {name: 'usermessage', value: 'Hello'} } );
        component.find('form')
            .simulate('submit', { preventDefault () {} });

        let mockSendMessages =  [{
            message: "John Doe Message",
            id: 401,
            name: 'JohnDoe'
        }];

        mockJsonPromise = Promise.resolve(mockSendMessages);
        mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4

        console.log(component.debug());

    });

});

