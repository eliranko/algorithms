import React from 'react';
import './login.scss';
import GoogleLogin from 'react-google-login';
import Authentication from '../authentication.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Authentication {
    constructor(props) {
        super(props);

        this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    handleGoogleSignIn(user) {
        const profile = user.getBasicProfile();

        this.submit('/api/login', {
            type: 'google',
            email: profile.getEmail(),
            token: user.tokenId
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.submit('/api/login', {
            type: 'form',
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <div className="login">
                <form>
                    <TextField id="standard-basic" className="form-item" label="Email" value={this.state.email} onChange={this.onEmailChange} />
                    <TextField id="standard-basic" className="form-item" label="Password" type="password" value={this.state.password} onChange={this.onPasswordChange} />
                    <Button
                        className="form-item"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={this.handleFormSubmit}>
                        Login
                    </Button>
                </form>

                <hr />
                <GoogleLogin
                    clientId="118125402303-4bpg5nf80olg1pnr4plej9qd2a9ulrmg"
                    onSuccess={this.handleGoogleSignIn}
                    theme="dark"
                    className="g-signin"
                />
            </div >
        );
    }
}

export default Login;