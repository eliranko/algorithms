import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Header from './header/Header.js';
import ShortestPath from './shortest_path/ShortestPath.js';
import NotFound from './not_found.js';
import Registration from './authentication/registration/registration.js';
import Profile from './profile/profile.js';
import Login from './authentication/login/login.js';
import * as JwtDecode from 'jwt-decode';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`/api/users/${JwtDecode(token).userID}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (!res.ok) {
                console.error('error fetching user');
                return;
            }

            res.json().then(user => this.setState({ user: user }));
        });
    }

    render() {
        return (
            <div className="App">
                <Header user={this.state.user} />
                <Router>
                    <Switch>
                        <Route path="/shortest">
                            <ShortestPath cableApp={this.props.cableApp} />
                        </Route>
                        <Route path="/registration">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/profile">
                            <Profile user={this.state.user} />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;