/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { registerUser } from '../store/user'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, DOG_INTERESTS, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'
import PhotoUpload from '../components/PhotoUpload'
import UserRegistration from './UserRegistration'
import UserInfo from './UserInfo'
import DogInfo from './DogInfo'
import DealbreakersPreferences from './DealbreakersPreferences'

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
    this.tempUserInterests = []
    this.tempDogInterests = []
    this.tempUserInterestsPrefs = []
    this.tempUserProfessionPrefs = []
    this.state = {
      step: 0,
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
      neutered: '', //required
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
      dogImage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.goBack = this.goBack.bind(this);
  }
   async updateData(userInfo){
    userInfo.step = this.state.step + 1
    console.log('incoming',userInfo)
    await this.setState(userInfo)
    console.log(this.state)
    if (this.state.step === 4) this.props.registerUser(this.state)
  }

  goBack(){
    this.setState({ step: this.state.step - 1 })
  }

  onChange (e) {
    if (e.target.name === 'userInterestsList') {
      this.tempUserInterests.push(e.target.value)
      this.setState({
        userInterests: this.tempUserInterests
      })
    }

    else if (e.target.name === 'userEmail') {
      let newEmail = e.target.value.toLowerCase()
      this.setState({
        userEmail: newEmail
      })
    }

    else if (e.target.name === 'dogInterestsList') {
      this.tempDogInterests.push(e.target.value)
      this.setState({
        dogInterests: this.tempDogInterests
      })
    }

    else if (e.target.name === 'userProfessionsPref') {
      this.tempUserProfessionPrefs.push(e.target.value)
      this.setState({
        userProfessionsPref: this.tempUserProfessionPrefs
      })
    }

    else if (e.target.name === 'userInterestsPref') {
      this.tempUserInterestsPrefs.push(e.target.value)
      this.setState({
        userInterestsPref: this.tempUserInterestsPrefs
      })
    }

    else if (this.arrForNums.includes(e.target.name)) {
      this.setState({
        [e.target.name]: Number(e.target.value)
      })
    }

    else if (e.target.name === 'neutered') {
      let neuteredBool = (e.target.value === 'true')
      this.setState({
        [e.target.name]: neuteredBool
      })
    }

    else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  render() {
    const {user} = this.props
    const { step } = this.state
    if (user.userEmail) {
      return (
        <Redirect to ="/profile" />
      )
    }
    else {
      return (
        <div id="signUpContainer">
          <div id="signUpForm">
            <p>Fields marked with * are required</p>
           {
            {
              0: <UserRegistration updateData={this.updateData} />,
              1: <UserInfo updateData={this.updateData} goBack={this.goBack} photoUpload={this.photoUpload} />,
              2: <DogInfo updateData={this.updateData} goBack={this.goBack} photoUpload={this.photoUpload} />,
              3: <DealbreakersPreferences updateData={this.updateData} goBack={this.goBack} />
            }[step]
           }
          </div>
        </div>
      )
    }
  }
}

const mapState = state => (
  {
    user: state.user
  }
)

const mapDispatch = (dispatch) => {
  return {
    registerUser: (userInfo) => dispatch(registerUser(userInfo))
  }
}

export default connect(mapState, mapDispatch)(Registration);
