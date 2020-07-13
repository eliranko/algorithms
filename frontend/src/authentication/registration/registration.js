import React from 'react';
import './registration.scss';
import Authentication from '../authentication.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import ReCAPTCHA from "react-google-recaptcha";

class Registration extends Authentication {
    constructor(props) {
        super(props);
        this.state.recaptcha = "";

        this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
    }

    handleGoogleSignIn(user) {
        const profile = user.getBasicProfile();

        this.submit('/api/register', {
            type: 'google',
            email: profile.getEmail(),
            token: user.tokenId
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.submit('/api/register', {
            type: 'form',
            email: this.state.email,
            password: this.state.password,
            recaptcha: this.state.recaptcha
        });
    }

    onRecaptchaChange(value) {
        this.setState({ recaptcha: value });
    }

    render() {
        return (
            <div className="registration">
                <form>
                    <TextField id="standard-basic" className="form-item" label="Email" value={this.state.email} onChange={this.onEmailChange} />
                    <TextField id="standard-basic" className="form-item" label="Password" type="password" value={this.state.password} onChange={this.onPasswordChange} />
                    <ReCAPTCHA
                        className="form-item"
                        sitekey="6Le-BrAZAAAAAJp3XAlFcejMoOFVOB1-Eyd_m0-a"
                        onChange={this.onRecaptchaChange}
                    />
                    <Button
                        className="form-item"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={this.handleFormSubmit}>
                        Register
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

export default Registration;