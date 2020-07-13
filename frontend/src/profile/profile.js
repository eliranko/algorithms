import React from 'react';
import './profile.scss';

class Profile extends React.Component {
    userView() {
        return (
            <p>{JSON.stringify(this.props.user)}</p>
        )
    }

    noUserView() {
        return (
            <p>No user</p>
        );
    }

    render() {
        return (
            <div className="profile">
                {this.props.user ? this.userView() : this.noUserView()}
            </div>
        );
    }
}

export default Profile;