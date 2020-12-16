/* eslint-disable complexity */
import React from 'react';
import DogInfo from './Profile/DogInfo'
import UserInfo from './Profile/UserInfo'
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Cards from './Profile/Cards'

class ViewMatchedProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, closeProfileView } = this.props;
        const { dog } = this.props.user;
        return (
            <div id="profileContainer">
                <div id="profileBody">
                    <IconButton onClick={closeProfileView} >
                        <KeyboardReturnIcon/>
                    </IconButton>
                    <h3>{user.firstName} and {user.dog.dogName}</h3>
                    <Cards user = {user} />
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
