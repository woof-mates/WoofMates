import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, DOG_INTERESTS, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'

export default class DogInfo extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.tempDogInterests = []
        this.tempUserInterestsPrefs = []
        this.tempUserProfessionPrefs = []
        this.state = {
            step: 3,
            message: '',
            dogSpeak: '',
            favoriteActivityWithDog: '',
            dogName: '', //required
            breed: '', //required
            dogAge: 0, //required
            energyLevel: 3,
            weight: 0, //required
            neutered: null, //required
            dogInterests: [],
            dogImage: ''
        };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
    }
    sendData(){
      const { dogName, breed, dogAge, weight, neutered } = this.state
      if (!dogName || !breed || !dogAge || !weight || neutered === null) this.setState({ message: 'Please fill in all required fields' })
      else this.props.updateData(this.state)
    }
    photoUpload(photoObj){
      this.setState(photoObj)
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
    render(){
      return (
        <div>
            <h3>Tell us more about your dog!</h3>
            Name*:
            <input type="dogName" name = "dogName" onChange={this.onChange} />
            <p />
            Breed*:
            <select id="breed" name="breed" onChange={this.onChange}>
            <option value="none" selected disabled hidden>
            Select an Option
            </option>
            {BREEDS.map(breed => (<option key = {breed} value={breed}>{breed}</option>))}
            </select>
            <p />
            Dog Age*:
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
            Weight (lbs)*:
            <input type="weight" name = "weight" onChange={this.onChange} />
            <p />
            Neutered*?
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
            Upload a picture of your dog! (png, jpg format)* <PhotoUpload type="dog" action="Upload" photoUpload={this.photoUpload} />
            <br />
            {this.state.dogImage.length ? <img src={this.state.dogImage} width="150" /> : null }
            <p />
            If your dog could speak it would say....
            <br />
            <textarea name="dogSpeak" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange} />
            <p />
            Your favorite thing to do with your pup is...
            <br />
            <textarea name="favoriteActivityWithDog" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange} />
            <p />
            <p>{this.state.message}</p>
            <button onClick={this.sendData}>Next</button>
        </div>
      )
    }
}
