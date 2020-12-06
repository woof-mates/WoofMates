import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { registerUser } from '../store/user'
import {INITIAL_PREF_POINTS_BREED, INITIAL_PREF_POINTS_OTHER, PROFESSIONS, DOG_WEIGHTS, USER_INTERESTS, BREEDS, DOG_AGES, MAX_DISTANCES, DOG_INTERESTS} from '../../constants'
import {createBreedsObjForPref, createAgesObjForPref, createEnergyLevelObjForPref, createWeightObjForPref, createUserAgesObjForPref, createProfessionsObjForPref} from '../../utils/preferencesObjFuncs'


class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.tempUserInterests = []
    this.tempDogInterests = []
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
      dogBreed: '',
      dogAgeForPref: null,
      dogEnergyLevel: null,
      dogWeight: null,
      distanceFromLocation: 5,
      userAge: null,
      userProfessionsPref: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange (e) {
    if (e.target.name === "userInterestsList") {
      this.tempUserInterests.push(e.target.value)
      this.setState({
        userInterests: this.tempUserInterests
      })
    }
    else if (e.target.name === "dogInterestsList") {
      this.tempDogInterests.push(e.target.value)
      this.setState({
        dogInterests: this.tempDogInterests
      })
    }
    else if (e.target.name === "dogBreed") {
      let newBreedsObj = createBreedsObjForPref();
      newBreedsObj[e.target.value] = INITIAL_PREF_POINTS_BREED;
      this.setState({
        dogBreed: newBreedsObj
      })
    }

    else if (e.target.name === "dogAgeForPref") {
      let newAgesObj = createAgesObjForPref();
      newAgesObj[e.target.value] = INITIAL_PREF_POINTS_OTHER;
      this.setState({
        dogAgeForPref: newAgesObj
      })
    }

    else if (e.target.name === "dogEnergyLevel") {
      let newEnergyLevelsObj = createEnergyLevelObjForPref();
      newEnergyLevelsObj[e.target.value] = INITIAL_PREF_POINTS_OTHER;
      this.setState({
        dogEnergyLevel: newEnergyLevelsObj
      })
    }

    else if (e.target.name === "dogWeight") {
      let newWeightLevelsObj = createWeightObjForPref();
      newWeightLevelsObj[e.target.value] = INITIAL_PREF_POINTS_OTHER;
      this.setState({
        dogWeight: newWeightLevelsObj
      })
    }

    else if (e.target.name === "userAge") {
      let newUserAgePrefObj = createUserAgesObjForPref();
      newUserAgePrefObj[e.target.value] = INITIAL_PREF_POINTS_OTHER;
      this.setState({
        userAge: newUserAgePrefObj
      })
    }

    else if (e.target.name === "userProfessionsPref") {
      let newUserProfPrefObj = createProfessionsObjForPref();
      newUserProfPrefObj[e.target.value] = INITIAL_PREF_POINTS_OTHER;
      this.setState({
        userProfessionsPref: newUserProfPrefObj
      })
    }

    else if (e.target.name === "age" || e.target.name === "dogAge" || e.target.name === "energyLevel" || e.target.name === "weight" || e.target.name === "distanceFromLocation") {
      this.setState({
        [e.target.name]: Number(e.target.value)
      })
    }

    else if (e.target.name === "neutered") {
      let neuteredBool = (e.target.value === "true")
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

  async onSubmit (e) {
    e.preventDefault();
    console.log('current state in Registration is: ',this.state)
    let {firstName, lastName, userEmail, password, city, state, zipCode, age, profession, userInterests, dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogBreed, dogAgeForPref, dogEnergyLevel, dogWeight, distanceFromLocation, userAge, userProfessionsPref} = this.state
    userEmail = userEmail.toLowerCase()
    this.props.registerUser(firstName, lastName, userEmail, password, city, state, zipCode, age, profession, userInterests, dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogBreed, dogAgeForPref, dogEnergyLevel, dogWeight, distanceFromLocation, userAge, userProfessionsPref)
    console.log('user in the store is now ', this.props.user)
  }

  componentDidMount() {
  }

  render() {
    const {user} = this.props
    if (user.userEmail) {
      return (
        <Redirect to ="/"></Redirect>
      )
    }
    else {
      return (
        <div id="signInContainer">
          <div id="signInForm">
            <h3>Registration Form</h3>
              First Name:
              <input type="firstName" name = "firstName" onChange={this.onChange} />
              <p></p>
              Last Name:
              <input type="lastName" name = "lastName" onChange={this.onChange} />
              <p></p>
              Email:
              <input type="email" name = "userEmail" onChange={this.onChange} />
              <p></p>
              Password:
              <input type="password" name = "password" onChange={this.onChange} />
              <p></p>
              City:
              <input type="city" name = "city" onChange={this.onChange} />
              <p></p>
              State:
              <select id="stateList" name="state" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
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
              <p></p>
              Zip code:
              <input type="zipCode" name = "zipCode" onChange={this.onChange} />
              <p></p>
              <h3>A bit more about you...</h3>
              Age: <input type="age" name = "age" onChange={this.onChange} />
              <p></p>
              Profession: <select id="profession" name="profession" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
              </select>
              <p></p>
              Interest 1: <select id="userInterestsList" name="userInterestsList" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p></p>
              Interest 2: <select id="userInterestsList" name="userInterestsList" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p></p>
              Interest 3: <select id="userInterestsList" name="userInterestsList" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <h3>Tell us more about your pup!</h3>
              Name:
              <input type="dogName" name = "dogName" onChange={this.onChange} />
              <p></p>
              Breed:
              <select id="breed" name="breed" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {BREEDS.map(breed => (<option key = {breed} value={breed}>{breed}</option>))}
              </select>
              <p></p>
              Dog Age:
              <input type="dogAge" name="dogAge" onChange={this.onChange} />
              <p></p>
              Energy Level:
              <select id="energyLevel" name="energyLevel" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              <option value="1">1 (Lowest)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (Highest)</option>
              </select>
              <p></p>
              Weight (lbs):
              <input type="weight" name = "weight" onChange={this.onChange} />
              <p></p>
              Neutered?
              <select id="neutered" name="neutered" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
              </select>
              <p></p>
              Your dog's primary interest:
              <select id="dogInterestsList" name="dogInterestsList" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {DOG_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
              </select>
              <p></p>
              Maximum distance between you and your new pup friends:
              <select id="distanceFromLocation" name="distanceFromLocation" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {MAX_DISTANCES.map(distance => (<option key = {distance} value={distance}>{distance}</option>))}
              </select>

              <h3>Spice up your profile</h3>
              <h4>Answer a few prompts to help personalize your profile and ensure matches</h4>
              If your dog could speak it would say....
              <br></br>
              <textarea name="dogSpeak" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange}></textarea>
              <p></p>
              Your favorite thing to do with your pup is...
              <br></br>
              <textarea name="favoriteActivityWithDog" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange}></textarea>
              <h3>Last step: tell us your preferences!</h3>
              In an ideal world, I'd like to be matched with a
              <select id="dogBreed" name="dogBreed" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {BREEDS.map(breed => (<option key={breed} value={breed}>{breed}</option>))}
              </select> pup who is
              <select id="dogAgeForPref" name="dogAgeForPref" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {DOG_AGES.map(age => (<option key = {age} value={age}>{age}</option>))}
              </select>
              years old, has
              <select id="dogEnergyLevel" name="dogEnergyLevel" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              <option value="1">1 (Lowest)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (Highest)</option>
              </select> energy and weighs <select id="dogWeight" name="dogWeight" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {DOG_WEIGHTS.map(weight => (<option key = {weight} value={weight}>{weight}</option>))}
              </select> pounds. I'd like to be matched with a pet owner who works in <select id="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
              <option value="none" selected disabled hidden>
              Select an Option</option>
              {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
              </select> and is <input type="userAge" name="userAge" onChange={this.onChange} /> years old.
              <p></p>
              <button className="submit" type="submit" onClick={this.onSubmit}>Register</button>
          </div>
        </div>
      )
    };
  }
}

const mapState = state => (
  {
    user: state.user
  }
)

const mapDispatch = (dispatch) => {
  return {
    registerUser: (firstName, lastName, userEmail, password, city, state, zipCode, age, profession, userInterests, dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogBreed, dogAgeForPref, dogEnergyLevel, dogWeight, distanceFromLocation, userAge, userProfessionsPref) => dispatch(registerUser(firstName, lastName, userEmail, password, city, state, zipCode, age, profession, userInterests, dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogBreed, dogAgeForPref, dogEnergyLevel, dogWeight, distanceFromLocation, userAge, userProfessionsPref))
  }
}

export default connect(mapState, mapDispatch)(Registration);
