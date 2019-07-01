import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';

export default class AuthenticationComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginView: true,
            registerView: false,
            resetView: false
        };
        this.toggleView = this.toggleView.bind(this);
        this.authAPI = `${config.server.url}/api/user`;
    }
    toggleView(view) {
        switch(view) {
            case 'signin': this.setState({loginView: true, registerView: false, resetView: false}); break;
            case 'signup': this.setState({loginView: false, registerView: true, resetView: false}); break;
            case 'reset': this.setState({loginView: false, registerView: false, resetView: true}); break;
        }
    }
    navigate2course = () => {
        this.props.history.push('/course');
    }
    render() {
        let currentView;
        if(this.state.loginView) {
            currentView = <SignInComponent changeView={this.toggleView} authAPI={this.authAPI} navigate={this.navigate2course} />
        } else if(this.state.registerView) {
            currentView = <SignUpComponent changeView={this.toggleView} authAPI={this.authAPI} />
        } else if(this.state.resetView) {
            currentView = <ResetPasswordComponent changeView={this.toggleView} authAPI={this.authAPI} />
        }
        return (
            <div id="logreg-forms">
                {currentView} 
                <br />
            </div>
        )
    }
}

class SignInComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleChange = (event) => {
        const name = event.target.getAttribute('name');
        const state = this.state;
        state[name] = event.target.value;
        this.setState(state);
    }
    handleSignIn = () => {
        const username = this.state.username;
        const password = this.state.password;
        if(username && password) {
            axios.post(`${this.props.authAPI}/authenticate`, {
                username, password
            }).then(response => {
                const data = response.data;
                if(data.token) {
                    localStorage.setItem('user', JSON.stringify(data));
                    this.props.navigate();
                } else {

                }
            }).catch(error => console.error(error))
        }
    }
    render(){
        return (
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal" style={{"textAlign": "center"}}> Sign in</h1>
                <input type="text" className="form-control" placeholder="Username / Email address" required="" autoFocus="" name="username" value={this.state.username} onChange={this.handleChange} />
                <input type="password"className="form-control" placeholder="Password" required="" name="password" value={this.state.password} onChange={this.handleChange} />

                <button className="btn btn-success btn-block" type="button" onClick={this.handleSignIn.bind(this)}>
                    <i className="fas fa-sign-in-alt"></i> Sign in</button>
                <a href="javascript:void(0)" id="forgot_pswd" onClick={()=>this.props.changeView('reset')}>Forgot password?</a>
                <hr />

                <button className="btn btn-primary btn-block" type="button" id="btn-signup" onClick={()=>this.props.changeView('signup')}>
                    <i className="fas fa-user-plus"></i> Sign up New Account</button>
            </form>
        )
    }
}

class SignUpComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            repeatpass: ''
        }
    }
    handleChange = (event) => {
        const name = event.target.getAttribute('name');
        const state = this.state;
        state[name] = event.target.value;
        this.setState(state);
    }
    handleSignUp = () => {
        const name = this.state.name;
        const email = this.state.email;
        const username = this.state.username;
        const password = this.state.password;
        const repeatpass = this.state.repeatpass;

        if(name && email && username && password && password === repeatpass) {
            axios.post(`${this.props.authAPI}/register`, {
                name, email, username, password
            }).then(response => {
                if(response.error) {

                } else if(response.status) {
                    this.props.changeView('signin');
                } else {

                }
            }).catch(error => console.error(error))
        }
    }
    render(){
        return (
            <form className="form-signup">
                <input type="text" name="name" className="form-control" placeholder="Full name" required="" autoFocus="" value={this.state.name} onChange={this.handleChange} />
                <input type="text" name="username" className="form-control" placeholder="User name" required="" autoFocus="" value={this.state.username} onChange={this.handleChange} />
                <input type="email" name="email" className="form-control" placeholder="Email address" required autoFocus="" value={this.state.email} onChange={this.handleChange} />
                <input type="password" name="password" className="form-control" placeholder="Password" required autoFocus="" value={this.state.password} onChange={this.handleChange} />
                <input type="password" name="repeatpass" className="form-control" placeholder="Repeat Password" required autoFocus="" value={this.state.repeatpass} onChange={this.handleChange} />

                <button className="btn btn-primary btn-block" type="button" onClick={this.handleSignUp.bind(this)}>
                    <i className="fas fa-user-plus"></i> Sign Up</button>
                <a href="javascript:void(0)" id="cancel_signup" onClick={()=>this.props.changeView('signin')}>
                    <i className="fas fa-angle-left"></i> Back</a>
            </form>
        )
    }
}

class ResetPasswordComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <form className="form-reset">
                <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
                <a href="javascript:void(0)" id="cancel_reset" onClick={()=>this.props.changeView('signin')}>
                    <i className="fas fa-angle-left"></i> Back</a>
            </form>
        )
    }
}