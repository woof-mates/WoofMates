import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditProfile from './EditProfile';

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
    };

    closeEdit(){
        this.setState({
            edit: false
        });
    };

    render() {
        const { user } = this.props;
        const { dog } = this.props.user;

        if (!user.id) {
            return (
                <div>
                    <Link to='/login'>Please Log In To Review Your Profile</Link>
                </div>
            );
        } else if (this.state.edit) {
            return <EditProfile closeEdit={this.closeEdit}/>;
        } else {
            return (
                //take our <br> lines after CSS
                <div>
                    <div onClick={this.openEdit}>Edit Profile</div>
                    <div id='user'>User Profile<br></br>
                        <img src={user.userImage1} width={300} height={250}></img>
                        <div>Name: {user.firstName} {user.lastName}</div>
                        <div>Email: {user.userEmail}</div>
                        <div>Address: {user.city}, {user.state} {user.zipCode}</div>
                        <div>Age: {user.age}</div>
                        <div>Profession: {user.profession}</div>
                        <div>Interests: 
                            {user.userInterests.reduce((acc, interest, i) => {
                                    if (i === 0) return acc + interest
                                    else return acc + ', ' + interest
                                }, '')
                            }
                        </div>
                    </div><br></br>
                    <div id='dog'>Dog Profile<br></br>
                        <img src={user.dogImage} width={300} height={250}></img>
                        <div>Name: {dog ? dog.dogName : ''}</div>
                        <div>Breed: {dog ? dog.breed: ''}</div>
                        <div>Weight: {dog ? dog.weight: ''}</div>
                        <div>Age: {dog ? dog.dogAge: ''}</div>
                        <div>Energy Level: {dog ? dog.energyLevel : ''}</div>
                        <div>Neutered: 
                            {
                                dog ? dog.neutered ? ' Yes' : ' No'
                                : ''
                            }
                        </div>
                        <div>Interests: 
                            {dog ? dog.dogInterests.reduce((acc, interest, i) => {
                                    if (i === 0) return acc + interest
                                    else return acc + ', ' + interest
                                }, '')
                                : ''
                            }
                        </div>
                    </div>
                </div>
            );
        };
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Profile);