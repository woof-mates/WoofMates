/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux'
import { editProfile } from '../store/user'
import UserRegistration from '../registration/UserRegistration'
import UserInfo from '../registration/UserInfo'
import DogInfo from '../registration/DogInfo'
import DealbreakersPreferences from '../registration/DealbreakersPreferences'
import { Button } from '@material-ui/core';

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
      populated: false
    }
    this.tempUserInterests = [];
    this.tempDogInterests = [];

    this.onSubmit = this.onSubmit.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
    this.updateData = this.updateData.bind(this)
  }

  componentDidMount(){
    if (this.props.user && !this.state.populated){
      const { firstName, lastName, userEmail, age, profession, userImage1, dogImage, city, state, zipCode, userInterests } = this.props.user;
      const { dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests } = this.props.user.dog
      const { isNeuteredDealbreaker, distanceFromLocation } = this.props.user.preference
      const { dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref } = this.props.user.userpref
      const { dogSpeak, favoriteActivityWithDog } = this.props.user.prompt
      this.setState({
        firstName, lastName, userEmail, age, profession, userImage1, dogImage, city, state, zipCode, userInterests,
        dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests,
        dogSpeak, favoriteActivityWithDog,
        isNeuteredDealbreaker, distanceFromLocation,
        dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref,
        populated: true
      });
    }
  }
  onSubmit (e) {
    e.preventDefault();
    const { userEmail } = this.state
    this.setState({
      userEmail: userEmail.toLowerCase()
    })
    const userProfile = this.state
    this.props.updateUser(this.props.user.id, userProfile)
    this.props.closeEdit();
  }
  photoUpload(photoObj){
    this.setState(photoObj)
  }
  updateData(userInput){
    this.setState(userInput)
  }
  render() {
    if (!this.state.populated) return null;
    return (
      <div id="updateProfileContainer">
        <div id="userUpdateForm">
          <p className="error">{this.state.message}</p>
          <UserRegistration updateData={this.updateData} info={this.state} type="edit" />
          <UserInfo updateData={this.updateData} goBack={this.goBack} info={this.state} photoUpload={this.photoUpload} type="edit" />
          <DogInfo updateData={this.updateData} goBack={this.goBack} info={this.state} photoUpload={this.photoUpload} type="edit" />
          <DealbreakersPreferences updateData={this.updateData} goBack={this.goBack} info={this.state} type="edit" />
          <div className="submit-button">
            <Button type="submit" variant="contained" color="secondary" onClick={this.onSubmit}>Update</Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
    user: state.user
})

const mapDispatch = dispatch => ({
  updateUser: (userId, userProfile ) => dispatch(editProfile(userId, userProfile))
})

export default connect(mapState, mapDispatch)(EditProfile);
