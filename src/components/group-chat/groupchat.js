import React from "react";
import { Redirect, withRouter } from "react-router-dom";

import { apiService } from '../../services/apiService';
import './groupchat.scss';

class Groupchat extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            messageText: null,
            groupMessage: [],
            userName : this.props.userName,
            room : this.props.room,
            isAuthenticated: true,
            roomUsers : this.props.roomUsers,
            errorMessage : null
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.getMessages = this.getMessages.bind(this);
        this.initializeRoomForUsers = this.initializeRoomForUsers.bind(this);

        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

     sendMessage() {

        apiService()
            .sendGroupMessage(this.state.userName, this.state.messageText, this.state.room.id)
            .then(
            message => {

                this.setState({
                        groupMessage: [...this.state.groupMessage, message]
                    });

                this.scrollToBottom();
                this.setState({ messageText: null });
            },
            error => {

                if (error.code === "ERR_NOT_A_MEMBER") {
                    console.error("not a member");
                    this.setState({
                        errorMessage : 'You are not signed in'
                    });
                }
            }
        );
    };

    scrollToBottom() {
        //Header
        const header = document.getElementsByClassName("header");
        let headerHeight = 0;
        if(header && header[0]){
            headerHeight = header[0].clientHeight;
        }

        // Message input
        const chatInput = document.getElementsByClassName("chatInputWrapper");
        let chatInputHeight = 0;
        if(chatInput && chatInput[0]){
            chatInputHeight = header[0].clientHeight;
        }

        const chat = document.getElementsByClassName("chatList");
        if(chat && chat[0]) {
            chat[0].scrollTop = chat[0].scrollHeight - headerHeight - chatInputHeight;
        }
    }

    handleSubmit (event) {
        event.preventDefault();
        this.sendMessage();
        event.target.reset();
    };
    handleChange (event) {
        this.setState({ messageText: event.target.value });
    };

    getMessages (roomId) {
        apiService()
            .getGroupMessages(roomId)
            .then(data => {

                this.setState(
                    prevState => ({
                        groupMessage: [...data]
                    }),
                    () => {
                        this.scrollToBottom();
                    }
                );

            })
            .catch((error) => {

                if (error) {
                    this.setState({
                        isAuthenticated: false
                    });
                }
            });
    };

    componentDidMount() {

        if(this.state.roomUsers && this.state.roomUsers === '...') {
            this.initializeRoomForUsers({id:1});
        }

        this.getMessages(this.state.room.id);
        setInterval(() => {
            this.getMessages(this.state.room.id);
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState) {

        if(this.state.room.id !== this.props.room.id ) {
            this.setState({
                room: this.props.room,
                roomUsers : this.props.roomUsers
            });
        }

        if (this.state.room.id !== prevState.room.id && this.state.room.id !== null ) {
            this.getMessages(this.state.room.id);
        }

        if(this.state.groupMessage[0] && prevState.groupMessage[0]
            && this.state.groupMessage[0].length !== prevState.groupMessage[0].length) {
            this.scrollToBottom();
        }

    }


    initializeRoomForUsers(room) {

        apiService()
            .getRoomDetails(room.id)
            .then((data) => {

                this.setState({
                    'roomUsers': data.users,
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

    render() {

        let {userName, roomUsers, room} = this.state;
        let listOfMessages = null;

        console.log("room users", roomUsers);

        if(this.state.groupMessage) {

            listOfMessages = this.state.groupMessage.map((data) => (
                <div key={data.id} >
                {
                    userName === data.name ? (
                        <li className = "self">
                        <div className = "msg">
                            <p> {data.name} </p>
                            <div className = "message.js.temp" > {data.message} < /div>
                            </div>
                        </li>
                    ):(
                        <li className="other">
                            <div className="msg">
                                <p> {data.name} </p>
                                <div className="message.js.temp"> {data.message} </div>
                            </div>
                        </li>
                    )
                }
                </div>
            ));
        }

        return (
            <React.Fragment>
                <div className="chatWindow">
                    <div className="header">
                        <h3 className="name">{room.name}</h3>
                        <div className="users">{roomUsers}</div>
                    </div>
                    <ul className="chat chatList">
                            {listOfMessages}
                    </ul>
                    <div className="chatInputWrapper">
                        <form onSubmit={this.handleSubmit}>
                            <input name="usermessage"
                            className="textarea input"
                            type="text"
                            placeholder="Enter your message..."
                            onChange={this.handleChange}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Groupchat;
