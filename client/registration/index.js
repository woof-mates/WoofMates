import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { registerUser } from '../store/user'

class Registration extends React.Component {
  constructor () {
    super ()
    this.state = {
      firstName: '',
      lastName: '',
      userEmail: '',
      password: '',
      city: '',
      state: '',
      zipCode: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onChange (e) {
    // console.log('target is', e.target.name, 'value is', e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  async onSubmit (e) {
    e.preventDefault();
    console.log('current state in Registration is: ',this.state)
    let {firstName, lastName, userEmail, password, city, state, zipCode} = this.state
    userEmail = userEmail.toLowerCase()
    this.props.registerUser(firstName, lastName, userEmail, password, city, state, zipCode)
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
    registerUser: (firstName, lastName, userEmail, password, city, state, zipCode) => dispatch(registerUser(firstName, lastName, userEmail, password, city, state, zipCode))
  }
}

export default connect(mapState, mapDispatch)(Registration);
