/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux'
import { editProfile } from '../store/user'
import { PROFESSIONS, USER_INTERESTS, BREEDS, DOG_INTERESTS} from '../../constants'
import PhotoUpload from './PhotoUpload'
import UserRegistration from '../registration/UserRegistration'
import UserInfo from '../registration/UserInfo'
import DogInfo from '../registration/DogInfo'
import DealbreakersPreferences from '../registration/DealbreakersPreferences'
import { Button } from '@material-ui/core';

// on change could update the state rather than next button
// bring back the cancel / change button on edit component

class EditProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '', //required
      lastName: '',
      userEmail: '', //required
      password: '', //required
      city: '',
      state: '',
      zipCode: 0, //required
      age: null,
      profession: '',
      userInterests: [],
      dogSpeak: '',
      favoriteActivityWithDog: '',
      dogName: '', //required
      breed: '', //required
      dogAge: 0, //required
      energyLevel: 3,
      weight: 0, //required
      neutered: null, //required
      dogInterests: [],
      dogBreedPref: '',
      dogAgePref: '',
      dogEnergyLevelPref: null,
      dogWeightPref: '',
      distanceFromLocation: 5,
      userAgePrefMinRange: null,
      userProfessionsPref: [],
      userInterestsPref: [],
      isNeuteredDealbreaker: null,
      userImage1: '',
      dogImage: '',
      // firstName: '',
      // lastName: '',
      // userEmail: '',
      // city: '',
      // state: '',
      // zipCode: '',
      // age: '',
      // profession: '',
      // userInterests: '',
      // dog: {
      //   dogInterests: []
      // },
      // userImage1: '',
      // dogImage: '',
    }
    this.tempUserInterests = [];
    this.tempDogInterests = [];

    this.onSubmit = this.onSubmit.bind(this);
    this.userOnChange = this.userOnChange.bind(this);
    this.dogOnChange = this.dogOnChange.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
  }

  componentDidMount(){
    if (this.props.user){
      const { firstName, lastName, userEmail, age, profession, userImage1, dogImage, city, state, zipCode, userInterests } = this.props.user;
      const { dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests } = this.props.user.dog
      const { isNeuteredDealbreaker, distanceFromLocation } = this.props.user.preference
      const { dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref } = this.props.user.userpref

      this.setState({
        firstName, lastName, userEmail, age, profession, userImage1, dogImage, city, state, zipCode, userInterests,
        dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, 
        isNeuteredDealbreaker, distanceFromLocation,
        dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref
      });
      // this.tempUserInterests = userInterests;
      // this.tempDogInterests = dog.dogInterests;
    }
  }

  userOnChange (e) {
    if (e.target.name === "userInterestsList1") {
      this.tempUserInterests[0] = e.target.value
    } else if (e.target.name === "userInterestsList2") {
      this.tempUserInterests[1] = e.target.value
    } else if (e.target.name === "userInterestsList3") {
      this.tempUserInterests[2] = e.target.value
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  dogOnChange (e) {
    const { dog } = this.state

    dog[e.target.name] = e.target.value

    if (e.target.name === "dogInterestsList1") {
      this.tempDogInterests[0] = e.target.value
      dog.dogInterests = this.tempDogInterests
    } else if (e.target.name === "dogInterestsList2") {
      this.tempDogInterests[1] = e.target.value
      dog.dogInterests = this.tempDogInterests
    } else if (e.target.name === "dogInterestsList3") {
      this.tempDogInterests[2] = e.target.value
      dog.dogInterests = this.tempDogInterests
    }
    this.setState({
      dog
    })
  }

  onSubmit (e) {
    e.preventDefault();
    const { userEmail } = this.state
    this.setState({
      userEmail: userEmail.toLowerCase()
    })
    const userProfile = this.state
    this.props.updateUser(this.props.user.id, userProfile)
    console.log('user has been updated', this.props.user)
    this.props.closeEdit();
  }

  photoUpload(photoObj){
    this.setState(photoObj)
  }

  updateData(userInfo){
    this.setState(userInfo)
  }

  render() {
    const {dog, firstName} = this.state
    if ( !firstName ) return null;
    return (
        <div id="updateProfileContainer">
          <h3>Update Profile</h3>
          <div id="userUpdateForm">
            <p className="error">{this.state.message}</p>
            <UserRegistration updateData={this.updateData} info={this.state} type="edit" />
            <UserInfo updateData={this.updateData} goBack={this.goBack} info={this.state} photoUpload={this.photoUpload} type="edit" />
            <DogInfo updateData={this.updateData} goBack={this.goBack} info={this.state} photoUpload={this.photoUpload} type="edit" />
            <DealbreakersPreferences updateData={this.updateData} goBack={this.goBack} info={this.state} type="edit" />
            <Button className="submit-button" type="submit" variant="contained" color="secondary" onClick={this.onSubmit}>Update</Button>
          </div>
          {/* <button onClick={this.props.closeEdit}>Cancel</button> */}
        </div>
    )
  }
}

const mapState = state => (
  {
    user: state.user
  }
)

const mapDispatch = (dispatch) => ({
  updateUser: (userId, userProfile ) => dispatch(editProfile(userId, userProfile))
})

export default connect(mapState, mapDispatch)(EditProfile);
