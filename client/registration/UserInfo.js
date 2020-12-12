import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, DOG_INTERESTS, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'

export default class UserInfo extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.tempDogInterests = []
        this.tempUserInterestsPrefs = []
        this.tempUserProfessionPrefs = []
        this.state = {
            message: '',
            age: null,
            profession: '',
            userInterests: [],
            userImage1: '',
        };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
    }
    sendData(){
      const { userImage1 } = this.state
      if (!userImage1.length) this.setState({ message: 'Please fill in all required fields' })
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
                Your interests (select up to 3):
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
                Upload a picture of yourself! (png, jpg format)* <PhotoUpload type="owner" action="Upload" photoUpload={this.photoUpload} />
                <br />
                {this.state.userImage1.length ? <img src={this.state.userImage1} width="150" /> : null }
                <p>{this.state.message}</p>
                <button onClick={this.props.goBack}>Back</button>
                <button onClick={this.sendData}>Next</button>
            </div>
        )
    }
}
