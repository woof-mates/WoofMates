import React from 'react';
import { connect } from 'react-redux'
import { editProfile } from '../store/user'
import { PROFESSIONS, USER_INTERESTS, BREEDS, DOG_INTERESTS} from '../../constants'

class EditProfile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      firstName: '',
      lastName: '',
      userEmail: '',
      city: '',
      state: '',
      zipCode: '',
      age: '',
      profession: '',
      userInterests: '',
    }

    this.tempUserInterests = userInterests;
    this.tempDogInterests = dog.dogInterests;

    this.onSubmit = this.onSubmit.bind(this);
    this.userOnChange = this.userOnChange.bind(this);
    this.dogOnChange = this.dogOnChange.bind(this);
  }

  componentDidMount(){
    const {firstName, lastName, userEmail, age, profession, userImage1, userImage2, city, state, zipCode, userInterests, dog} = this.props.user;
    this.setstate({firstName, lastName, userEmail, age, profession, userImage1, userImage2, city, state, zipCode, userInterests, dog});
  }

  userOnChange (e) {
    const { dog } = this.state
    if (e.target.name === "userInterestsList1") {
      this.tempUserInterests[0] = e.target.value
      this.setState({
        userInterests: this.tempUserInterests
      })
    } else if (e.target.name === "userInterestsList2") {
      this.tempUserInterests[1] = e.target.value
      this.setState({
        userInterests: this.tempUserInterests
      })
    } else if (e.target.name === "userInterestsList3") {
      this.tempUserInterests[2] = e.target.value
      this.setState({
        userInterests: this.tempUserInterests
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  dogOnChange (e) {
    let { dog } = this.state
    for (let key in dog)  {
      if (key === e.target.name) {
        dog[key] = e.target.value
      }
    }

    if (e.target.name === "dogInterestsList1") {
      this.tempDogInterests[0] = e.target.value
      dog.dogInterests = this.tempDogInterests
      this.setState({
        dog
      })
    } else if (e.target.name === "dogInterestsList2") {
      this.tempDogInterests[1] = e.target.value
      dog.dogInterests = this.tempDogInterests
      this.setState({
        dog
      })
    } else if (e.target.name === "dogInterestsList3") {
      this.tempDogInterests[2] = e.target.value
      dog.dogInterests = this.tempDogInterests
      this.setState({
        dog
      })
    } else {
      this.setState({
        dog
      })
    }
  }

  async onSubmit (e) {
    e.preventDefault();
    let userProfile = this.state
    userProfile.userEmail = userProfile.userEmail.toLowerCase()
    this.props.updateUser(this.props.user.id, userProfile)
    console.log('user has been updated', this.props.user)
    this.props.closeEdit();
  }

  render() {

    const {dog} = this.state
    return (
        <div id="updateContainer">
            <h3>Update Profile</h3>
            <div id="userUpdateForm">
                <h4>User</h4>
                First Name:
                <input value={this.state.firstName} id="firstName" name = "firstName" onChange={this.userOnChange} />
                <p></p>
                Last Name:
                <input value={this.state.lastName} id="lastName" name = "lastName" onChange={this.userOnChange} />
                <p></p>
                Email:
                <input value={this.state.userEmail} id="email" name = "userEmail" onChange={this.userOnChange} />
                <p></p>
                Age:
                <input value={this.state.age} id="age" name = "age" onChange={this.userOnChange} />
                <p></p>
                Profession: <select id="profession" name="profession" onChange={this.userOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.profession}</option>
                {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
                </select>
                <p></p>
                Photo1:
                <input value={this.state.userImage1} id="photo1" name = "photo1" onChange={this.userOnChange} />
                <p></p>
                Photo2:
                <input value={this.state.userImage2} id="photo2" name = "photo2" onChange={this.userOnChange} />
                <p></p>
                City:
                <input value={this.state.city} id="city" name = "city" onChange={this.userOnChange} />
                <p></p>
                State:
                <select value={this.state.state} id="stateList" name="state" onChange={this.userOnChange}>
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
                <input value={this.state.zipCode} id="zipCode" name = "zipCode" onChange={this.userOnChange} />
                <p></p>
                Interest 1: <select id="userInterestsList" name="userInterestsList1" onChange={this.userOnChange}>
                  <option value="none" selected disabled hidden>
                  {this.state.userInterests[0] || 'Select an Option'}</option>
                  {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
                </select>
                <p></p>
                Interest 2: <select id="userInterestsList" name="userInterestsList2" onChange={this.userOnChange}>
                  <option value="none" selected disabled hidden>
                  {this.state.userInterests[1] || 'Select an Option'}</option>
                  {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
                </select>
                <p></p>
                Interest 3: <select id="userInterestsList" name="userInterestsList3" onChange={this.userOnChange}>
                  <option value="none" selected disabled hidden>
                  {this.state.userInterests[2] || 'Select an Option'}</option>
                  {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
                </select>
                <p></p>
            </div>
            <div id="dogUpdateForm">
                <h4>Dog</h4>
                Name:
                <input value={this.state.dog.dogName} id="dogName" name = "dogName" onChange={this.dogOnChange} />
                <p></p>
                Breed:
                <select id="breed" name="breed" onChange={this.dogOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.dog.breed}</option>
                {BREEDS.map(breed => (<option key = {breed} value={breed}>{breed}</option>))}
                </select>
                <p></p>
                Age:
                <input value={this.state.dog.dogAge} id="dogAge" name = "dogAge" onChange={this.dogOnChange} />
                <p></p>
                Energy Level:
                <select id="energyLevel" name="energyLevel" onChange={this.dogOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.dog.energyLevel}</option>
                <option value="1">1 (Lowest)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (Highest)</option>
                </select>
                <p></p>
                Weight:
                <input value={this.state.dog.weight} id="weight" name = "weight" onChange={this.dogOnChange} />
                <p></p>
                Neutered?
                <select id="neutered" name="neutered" onChange={this.dogOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.dog.neutered ? 'Yes' : 'No'}</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
                </select>
                <p></p>
                Dog's Interests 1:
                <select id="dogInterestsList" name="dogInterestsList1" onChange={this.dogOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.dog.dogInterests[0] || 'Select an Option'}</option>
                {DOG_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
                </select>
                <p></p>
                Dog's Interests 2:
                <select id="dogInterestsList" name="dogInterestsList2" onChange={this.dogOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.dog.dogInterests[1] || 'Select an Option'}</option>
                {DOG_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
                </select>
                <p></p>
                Dog's Interests 2:
                <select id="dogInterestsList" name="dogInterestsList3" onChange={this.dogOnChange}>
                <option value="none" selected disabled hidden>
                {this.state.dog.dogInterests[2] || 'Select an Option'}</option>
                {DOG_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
                </select>
                <p></p>
                <button className="submit" id="submit" onClick={this.onSubmit}>Update</button>
                <button onClick={this.props.closeEdit}>Cancel</button>
            </div>
        </div>
    )
  }
}

const mapState = state => (
  {
    user: state.user
  }
)

const mapDispatch = (dispatch) => {
  return {
    updateUser: (userId, userProfile ) => dispatch(editProfile(userId, userProfile))
  }
}

export default connect(mapState, mapDispatch)(EditProfile);
