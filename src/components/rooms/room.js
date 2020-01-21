import React, { Component } from 'react';
import {apiService} from "../../services/apiService";
import './room.scss';

class Rooms extends Component {

    constructor(props){

        super(props);

        this.state = {
            rooms : null,
            error: null,
            loading: true,
            room : null,
            userName : this.props.userName
        };

        this.onRoomChange = this.onRoomChange.bind(this);
    }


    componentDidMount() {

        this.setState({
            'error': null,
            'loading' : true
        });

        apiService()
            .getRooms()
            .then((data) => {

                this.setState({
                    'rooms': data,
                    'error': null,
                    'loading' : false,
                    'room' : data[0]
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

    onRoomChange(room) {
       this.props.roomChange(room);
    }

    render() {

        let {userName,rooms} = this.state;

        let roomElements = null;
        if(rooms) {
            roomElements = rooms.map( (room) => {
                let clsName = 'room room-' + room.id;
                return <div className={clsName} key={room.id} onClick={ () => this.onRoomChange(room)}> {room.name} </div>
            });
        } else {
            roomElements = <div className="error"> Sorry ! something went wrong </div>
        }

        return (
            <>
            <div className="left">
                <div className="wrapper">
                    <div className="sidebar-header">
                        <div className="user">
                            <h3 className="name">{userName}</h3>
                            <div className="online-time">was online 1 hour before</div>
                        </div>
                    </div>

                    <ul className="list-unstyled components justify-content-center">
                        <div className="rooms">
                            {roomElements}
                        </div>
                    </ul>
                </div>
            </div>
            </>
        );
    }

}

export default Rooms;
