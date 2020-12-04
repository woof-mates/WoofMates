import React from 'react';
import { connect } from 'react-redux'
import { editProfile } from '../store/user'
import { BREEDS, ENERGY_LEVELS, RELATIONSHIPS, USER_INTERESTS, PROFESSIONS } from '../../constants';

class EditProfile extends React.Component {
  constructor (props) {
    super (props);
    const {firstName, lastName, userEmail, age, profession, userImage1, userImage2, city, state, zipCode, userInterests, dog} = props.user;
    this.state = {firstName, lastName, userEmail, age, profession, userImage1, userImage2, city, state, zipCode, userInterests, dog};

    this.onSubmit = this.onSubmit.bind(this);
    this.userOnChange = this.userOnChange.bind(this);
    this.dogOnChange = this.dogOnChange.bind(this);
  }

  userOnChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  dogOnChange (e) {
    let { dog } = this.state
    for (let key in dog)  {
      if (key === e.target.name) {
        dog[key] = e.target.value
      }
    }
    
    this.setState({
      dog
    })
  }

  async onSubmit (e) {
    e.preventDefault();
    let userProfile = this.state
    userProfile.userEmail = userProfile.userEmail.toLowerCase()
    this.props.updateUser(this.props.user.id, userProfile)
    console.log('user has been updated', this.props.user)
    this.props.closeEdit();
  }

  componentDidMount() {
    console.log(this.props.user)
  }

  render() {
    
    const {dog} = this.state
    return (
        <div id="updateContainer">
            <h3>Update Profile</h3>
            <div id="userUpdateForm">
                <h4>User</h4>
                First Name:
                <input value={this.state.firstName} type="firstName" name = "firstName" onChange={this.userOnChange} />
                <p></p>
                Last Name:
                <input value={this.state.lastName} type="lastName" name = "lastName" onChange={this.userOnChange} />
                <p></p>
                Email:
                <input value={this.state.userEmail} type="email" name = "userEmail" onChange={this.userOnChange} />
                <p></p>
                Age:
                <input value={this.state.age} type="age" name = "age" onChange={this.userOnChange} />
                <p></p>
                Profession:
                <input value={this.state.profession} type="profession" name = "profession" onChange={this.userOnChange} />
                <p></p>
                Photo1: 
                <input value={this.state.userImage1} type="photo1" name = "photo1" onChange={this.userOnChange} />
                <p></p>
                Photo2: 
                <input value={this.state.userImage2} type="photo2" name = "photo2" onChange={this.userOnChange} />
                <p></p>
                City:
                <input value={this.state.city} type="city" name = "city" onChange={this.userOnChange} />
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
                <input value={this.state.zipCode} type="zipCode" name = "zipCode" onChange={this.userOnChange} />
                <p></p>
                Interests:
                <input value={this.state.userInterests} type="interests" name = "interests" onChange={this.userOnChange} />
                <p></p>
            </div>
            <div id="dogUpdateForm">
                <h4>Dog</h4>
                Name:
                <input value={this.state.dog.dogName} type="dogName" name = "dogName" onChange={this.dogOnChange} />
                <p></p>
                Breed:
                <input value={this.state.dog.breed} type="breed" name = "breed" onChange={this.dogOnChange} />
                <p></p>
                Age:
                <input value={this.state.dog.dogAge} type="dogAge" name = "dogAge" onChange={this.dogOnChange} />
                <p></p>
                Energy Level:
                <input value={this.state.dog.energyLevel} type="energyLevel" name = "energyLevel" onChange={this.dogOnChange} />
                <p></p>
                Weight:
                <input value={this.state.dog.weight} type="weight" name = "weight" onChange={this.dogOnChange} />
                <p></p>
                Neutered:
                <input value={this.state.dog.neutered} type="neutered" name = "neutered" onChange={this.dogOnChange} />
                <p></p>
                Interests:
                <input value={this.state.dog.dogInterests} type="dogInterests" name = "dogInterests" onChange={this.dogOnChange} />
                <p></p>
                <button className="submit" type="submit" onClick={this.onSubmit}>Update</button>
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
