/* eslint-disable complexity */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import { Button } from '@material-ui/core'
import DogInfo from './Profile/DogInfo'

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
            return <EditProfile closeEdit={this.closeEdit} />;
        } else {
            return (
                <>
                <Button onClick={this.openEdit} variant = "contained" color = "primary">Edit Profile</Button>
                <div id="profileContainer">
                    <div id="profileBody">
                        <h3>{user.firstName} and {user.dog.dogName}</h3>
                        <img src={user.userImage1} />
                        <div className = "userInfoBox">
                            <div>Owner Name and Age: {user.firstName}, age {user.age}</div>
                            <div>Location: {user.city}, {user.state}</div>
                        </div>
                        <DogInfo dog = {dog} />
                        <br />
                        <div>Meet the Dog:
                            <div>Interests: {user.dog.dogInterests[0]}</div>
                        </div>
                        <br />
                        <div>Meet the Owner:
                            <div>Age: {user.age}</div>
                            <div>Interests: {user.userInterests[0]}</div>
                            <div>Profession: {user.profession}</div>
                        </div>

                        <img src={user.userImage2} />
                        <img src={user.dogImage} />
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
