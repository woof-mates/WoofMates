import React, { Component } from 'react'

export default class UserRegistration extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.tempDogInterests = []
        this.tempUserInterestsPrefs = []
        this.tempUserProfessionPrefs = []
        this.state = {
            step: 1,
            message: '',
            firstName: '', //required
            lastName: '',
            userEmail: '', //required
            password: '', //required
            city: '',
            state: '',
            zipCode: 0, //required
        //   age: null,
    //   profession: '',
    //   userInterests: [],
    //   dogSpeak: '',
    //   favoriteActivityWithDog: '',
    //   dogName: '', //required
    //   breed: '', //required
    //   dogAge: 0, //required
    //   energyLevel: 3,
    //   weight: 0, //required
    //   neutered: '', //required
    //   dogInterests: [],
    //   dogBreedPref: '',
    //   dogAgePref: '',
    //   dogEnergyLevelPref: null,
    //   dogWeightPref: '',
    //   distanceFromLocation: 5,
    //   userAgePrefMinRange: null,
    //   userProfessionsPref: [],
    //   userInterestsPref: [],
    //   isNeuteredDealbreaker: null,
    //   userImage1: '',
    //   dogImage: ''
        };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    // this.photoUpload = this.photoUpload.bind(this);
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
    sendData(){
        const { firstName, userEmail, password, zipCode} = this.state
        if (!firstName.length || !userEmail.length || !password.length || !zipCode) this.setState({ message: 'Please fill in all required fields' })
        else this.props.updateData(this.state)
    }
    render(){
        return (
            <div>
                <h3>User Registration</h3>
                First Name*: 
                <input type="firstName" name = "firstName" onChange={this.onChange} />
                <p />
                Last Name: 
                <input type="lastName" name = "lastName" onChange={this.onChange} />
                <p />
                Email*: 
                <input type="email" name = "userEmail" onChange={this.onChange} />
                <p />
                Password*: 
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
                Zip code*: 
                <input type="zipCode" name = "zipCode" onChange={this.onChange} />
                <p />
                <p>{this.state.message}</p>
                <button onClick={this.sendData}>Next</button>
            </div>
        )
    }
}