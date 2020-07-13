import React from 'react';
import './Header.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logoff from '../authentication/logoff/logoff.js';

class Header extends React.Component {
    logoff() {
        Logoff.logoff();
    }

    userView() {
        return (
            <>
                <Button color="inherit" href="/profile">Profile</Button>
                <Button color="inherit" onClick={this.logoff}>Logoff</Button>
            </>
        );
    }

    noUserView() {
        return (
            <>
                <Button color="inherit" href="/registration">Register</Button>
                <Button color="inherit" href="/login">Login</Button>
            </>
        );
    }

    render() {
        return (
            <AppBar position="static" className="header">
                <Toolbar>
                    <div className="container">
                        <div className="left">
                            <Typography variant="h6" className="typography">Algorithms</Typography>
                            <Button color="inherit" href="/shortest">Shortest path</Button>
                        </div>
                        <div className="right">
                            {
                                this.props.user ? this.userView() : this.noUserView()
                            }
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;