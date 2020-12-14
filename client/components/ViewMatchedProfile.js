/* eslint-disable complexity */
import React from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import DogInfo from './Profile/DogInfo'
import UserInfo from './Profile/UserInfo'
import TabBar from './Profile/TabBar'

class ViewMatchedProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        const { dog } = this.props.user;
        return (
            <div id="profileContainer">
                
                <div id="profileBody">
                    <h3>{user.firstName} and {user.dog.dogName}</h3>
                    <img src={user.userImage1} />
                    <img src={user.userImage2} />
                    <img src={user.dogImage} />
                </div>
                <div id="infoBody">
                    <UserInfo user = {user} />
                    <DogInfo dog = {dog} />
                </div>
            </div>
        );
    }
}

export default (ViewMatchedProfile);
