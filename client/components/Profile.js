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
    }

    componentDidMount() {
        console.log(this.props.user)
    };

    openEdit(){
        this.setState({
            edit: true
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
            console.log('trying to edit')
            return <EditProfile/>;
        } else {
            return (
                //take our <br> lines after CSS
                <div>
                    <div onClick={this.openEdit}>Edit Profile</div>
                    <div id='user'>User Profile<br></br>
                        <img src={user.userImage2} width={300} height={250}></img>
                        <div>Name: {user.firstName} {user.lastName}</div>
                        <div>Email: {user.userEmail}</div>
                        <div>Address: {user.city}, {user.state} {user.zipCode}</div>
                        <div>Age: {user.age}</div>
                        <div>Profession: {user.profession}</div>
                        <div>Interests: 
                            {user.userInterests.reduce((acc, interest) => {
                                    return acc + ' ' + interest
                                }, '')
                            }
                        </div>
                    </div><br></br>
                    <div id='dog'>Dog Profile<br></br>
                        <img src={user.dogImage} width={300} height={250}></img>
                        <div>Name: {dog.dogName}</div>
                        <div>Breed: {dog.breed}</div>
                        <div>Weight: {dog.weight}</div>
                        <div>Age: {dog.dogAge}</div>
                        <div>Energy Level: {dog.energyLevel}</div>
                        <div>Neutered: 
                            {
                                dog.neutered ? ' Yes' : ' No'
                            }
                        </div>
                        <div>Interests: 
                            {dog.dogInterests.reduce((acc, interest) => {
                                    return acc + ' ' + interest
                                }, '')
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