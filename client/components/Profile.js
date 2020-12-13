/* eslint-disable complexity */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import DogInfo from './Profile/DogInfo'
import UserInfo from './Profile/UserInfo'
import TabBar from './Profile/TabBar'

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
        if (!user || !dog){
            return <div>Loading</div>
        }

        if (!user.id) {
            return (
                <div>
                    <Link to="/login">Please Log In To Review Your Profile</Link>
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
                        <img src={user.userImage1} />
                        <img src={user.userImage2} />
                        <img src={user.dogImage} />
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
