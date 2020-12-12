/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { registerUser } from '../store/user'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, DOG_INTERESTS, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'
import PhotoUpload from '../components/PhotoUpload'
// import {createObjForPref, createObjForPref2} from '../../utils/preferencesObjFuncs'

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
    this.tempUserInterests = []
    this.tempDogInterests = []
    this.tempUserInterestsPrefs = []
    this.tempUserProfessionPrefs = []
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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
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

  async photoUpload(photoObj){
    console.log(photoObj)
    await this.setState(photoObj)
    console.log('picurl', this.state.userImage1)
  }

  onSubmit (e) {
    e.preventDefault();
    console.log('current state in Registration is: ', this.state)
    this.props.registerUser(this.state)
  }

  render() {
    const {user} = this.props
    let userAgePrefRanges = [ <option value="none" selected disabled hidden>Select an Option</option> ]
    for (let minRange = MIN_USER_AGE; minRange < MAX_USER_AGE; minRange += AGE_RANGE + 1) {
      userAgePrefRanges.push(
      <option type="userAgePrefMinRange" name="userAgePrefMinRange" value={minRange} onChange={this.onChange}>
        {minRange} - {minRange + AGE_RANGE}
      </option>
      )
    }
    if (user.userEmail) {
      return (
        <Redirect to ="/" />
      )
    }
    else {
      return (
        <div id="signInContainer">
          <div id="signInForm">
            <h3>Registration Form</h3>
              First Name:
              <input type="firstName" name = "firstName" onChange={this.onChange} />
              <p />
              Last Name:
              <input type="lastName" name = "lastName" onChange={this.onChange} />
              <p />
              Email:
              <input type="email" name = "userEmail" onChange={this.onChange} />
              <p />
              Password:
              <input type="password" name = "password" onChange={this.onChange} />
              <p />
              City:
              <input type="city" name = "city" onChange={this.onChange} />
              <p />
              State:
              <select id="stateList" name="state" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <p />
              Zip code:
              <input type="zipCode" name = "zipCode" onChange={this.onChange} />
              <p />
              <h3>A bit more about you...</h3>
              Age: <input type="age" name = "age" onChange={this.onChange} />
              <p />
              Profession:
              <select id="profession" name="profession" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
              </select>
              <p />
              Interest 1:
              <select id="userInterestsList" name="userInterestsList" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p />
              Interest 2:
              <select id="userInterestsList" name="userInterestsList" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p />
              Interest 3:
              <select id="userInterestsList" name="userInterestsList" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p />
              Upload a picture of yourself! (png, jpg format) <PhotoUpload type="owner" photoUpload={this.photoUpload} />
              {this.state.userImage1.length ? <img src={this.state.userImage1} width="150" /> : null }
              <h3>Tell us more about your dog!</h3>
              Name:
              <input type="dogName" name = "dogName" onChange={this.onChange} />
              <p />
              Breed:
              <select id="breed" name="breed" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {BREEDS.map(breed => (<option key = {breed} value={breed}>{breed}</option>))}
              </select>
              <p />
              Dog Age:
              <input type="dogAge" name="dogAge" onChange={this.onChange} />
              <p />
              Energy Level:
              <select id="energyLevel" name="energyLevel" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="1">1 (Lowest)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (Highest)</option>
              </select>
              <p />
              Weight (lbs):
              <input type="weight" name = "weight" onChange={this.onChange} />
              <p />
              Neutered?
              <select id="neutered" name="neutered" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              <p />
              Your dog's primary interest:
              <select id="dogInterestsList" name="dogInterestsList" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {DOG_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p />
              Upload a picture of your dog! (png, jpg format) <PhotoUpload type="dog" photoUpload={this.photoUpload} />
              {this.state.dogImage.length ? <img src={this.state.dogImage} width="150" /> : null }
              <p />
              Maximum distance between you and your new pup friends:
              <select id="distanceFromLocation" name="distanceFromLocation" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {MAX_DISTANCES.map(distance => (<option key = {distance} value={distance}>{distance}</option>))}
              </select>
              <p />
              Does your new dog friend need to be neutered?
              <select id="isNeuteredDealbreaker" name="isNeuteredDealbreaker" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value={true}>I only want to be matched with neutered dogs</option>
                <option value={false}>I can be matched with dogs regardless of neutered status</option>
              </select>

              <h3>Spice up your profile</h3>
              <h4>Answer a few prompts to help personalize your profile and ensure matches</h4>
              If your dog could speak it would say....
              <br />
              <textarea name="dogSpeak" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange} />
              <p />
              Your favorite thing to do with your pup is...
              <br />
              <textarea name="favoriteActivityWithDog" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange} />
              <h3>Last step: tell us your preferences!</h3>
              In an ideal world, I'd like to be matched with a
              <select id="dogBreedPref" name="dogBreedPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {BREEDS.map(breed => (<option key={breed} value={breed}>{breed}</option>))}
              </select> breed dog, who is
              <select id="dogAgePref" name="dogAgePref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {DOG_AGE_PREFS.map(agePref => (<option key = {agePref} value={agePref}>{agePref}</option>))}
              </select> in age compared to my dog, has
              <select id="dogEnergyLevelPref" name="dogEnergyLevelPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="1">1 (Lowest)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (Highest)</option>
              </select> energy level, and is 
              <select id="dogWeightPref" name="dogWeightPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {DOG_WEIGHT_PREFS.map(weightPref => (<option key = {weightPref} value={weightPref}>{weightPref}</option>))}
              </select> in size compared to my dog.
              <br />
              I'd like to be matched with a pet owner who works in 
              <select id="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
              </select> 
              or 
              <select id="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
              </select>,
              has interests in 
              <select id="userInterestsPref" name="userInterestsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
               or 
              <select id="userInterestsPref" name="userInterestsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>, 
              and is in the age range of 
              <select>{userAgePrefRanges}</select>.
              <p />
              <button className="submit" type="submit" onClick={this.onSubmit}>Register</button>
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
