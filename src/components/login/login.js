import React from "react";
import { Redirect , withRouter } from 'react-router-dom'
import './login.scss'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            isAuthenticated: false,
            user: null,
            isSubmitting: false,
            errorMessage: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.login = this.login.bind(this);
        this.toggleIsSubmitting = this.toggleIsSubmitting.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onSubmit (e) {
        if (this.state.userName !== "") {
            e.preventDefault();
            this.login();
        }
    };
    login () {
        this.toggleIsSubmitting();
        this.setState({
            isAuthenticated: true
        });
    };
    toggleIsSubmitting () {
        this.setState(prevState => ({
            isSubmitting: !prevState.isSubmitting
        }));
    };
    handleInputChange (e ) {
        this.setState({
            userName: e.target.value
        });
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect
                to={{
                    pathname: "/chatwindow",
                        state: { userName: this.state.userName }
                }}
            />
        );
        }

        const isSubmitting = this.state.isSubmitting;


        return (
            <div className="App">
                <h1>Chat App</h1>
                <p>Create an account through your Door dashboard.</p>
                <form className="form" onSubmit={this.onSubmit}>
                    <input onChange={this.handleInputChange} type="text" className="userName"  name="userName" />
                    <span className="error">{this.state.errorMessage}</span>
                    {isSubmitting ? (
                           <span> loading ... </span>
                    ) : (
                    <input className="btn"
                        type="submit"
                        disabled={this.state.userName === ""}
                        value="Join the Door chat"
                            />
                    )}
                </form>
            </div>
    );
    }
}
export default Login;
