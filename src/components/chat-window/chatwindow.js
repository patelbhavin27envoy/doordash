import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';

import './chatwindow.scss';
import { Groupchat } from "../group-chat";
import { Rooms } from "../rooms";
import {apiService} from "../../services/apiService";


/* For Redux
* import { connect } from 'react-redux'
* import { actions } from '../../actions'
*/

class ChatWindow extends Component {

    constructor(props) {

        super(props);
        let uName = null;
        if(this.props.location && this.props.location.state) {
            uName = this.props.location.state.userName;
        }
        this.state = {
            rooms: '',
            room: {id:1, name:'Analytics'},
            userName: uName,
            error: null,
            users: this.props.users
        };

        this.roomChangeHandler = this.roomChangeHandler.bind(this);
        this.listOfUsers = this.listOfUsers.bind(this);
    }

    componentDidMount() {

        this.setState({
            'error': null,
            'loading' : true
        });

        this.roomChangeHandler(this.state.room);
    }

    isLoading() {
        return this.state.error === null && this.state.venues === null;
    }

    listOfUsers (users) {
        let roomUsers = '';
        users.forEach((user,index) => {
            if(index != users.length-1) {
                roomUsers += user + (', ');
            } else {
                roomUsers += user ;
            }
        });
        return roomUsers;
    }

    roomChangeHandler(room) {

        this.setState({
            room : room
        });

        apiService()
            .getRoomDetails(room.id)
            .then((data) => {

                this.setState({
                    'users': data.users,
                    'error': null,
                    'loading' : false
                });

            })
            .catch((error) => {

                this.setState({
                    rooms : null,
                    error: 'Sorry! we had some problem with your request.',
                    'loading' : false
                })
            });
    }

    render(){

        const {rooms, userName, error, users, room} = this.state;
        let roomUsers  = '...';
        if(users) {
            roomUsers = this.listOfUsers(users);
        }

        if(roomUsers) {
            return (
                <div className="row container-flex flex-row">

                    <Rooms userName={userName} roomChange={ (room) => {this.roomChangeHandler(room)} } />

                    <div className="right">
                        <div className="chat-header">
                            <div className="room-window">
                               <Groupchat userName={userName} room={this.state.room} roomUsers={roomUsers} />
                            </div>
                        </div>
                    </div>

                </div>
            )

        }
    }

}

export default  withRouter(ChatWindow);
