/* eslint-disable complexity */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import DogInfo from './Profile/DogInfo'
import UserInfo from './Profile/userInfo'
import TabBar from './Profile/TabBar'
import Cards from './Profile/Cards'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    openEdit(){
        this.setState({
            edit: true
        });
    }

    closeEdit(){
        this.setState({
            edit: false
        });
    }

    render() {
        const { user } = this.props;
        const { dog } = this.props.user;

        if (!user.id) {
            return (
                <div id="chatContainer">
                    <div id="chatBody">
                        <Link id="notLoggedInMessage" to='/login'>Please Log In To See Your Profile</Link>
                    </div>
                </div>
            );
        } else if (this.state.edit) {
            return (
            <>
                <TabBar tabNumber = {0} openEdit = {this.openEdit} closeEdit = {this.closeEdit}/>
                <EditProfile closeEdit={this.closeEdit} />
            </>
            )
        } else {
            return (
                <>
                <TabBar tabNumber = {1} openEdit = {this.openEdit} closeEdit = {this.closeEdit}/>
                <div id="profileContainer">
                    <div id="profileBody">
                        <h3>{user.firstName} and {user.dog.dogName}</h3>
                        <Cards user = {user} />
                    </div>
                    <div id="infoBody">
                        <UserInfo user = {user} />
                        <DogInfo dog = {dog} />
                    </div>
                </div>

                </>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Profile);
