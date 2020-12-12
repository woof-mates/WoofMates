import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, DOG_INTERESTS, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'

export default class DealbreakersPreferences extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.tempDogInterests = []
        this.tempUserInterestsPrefs = []
        this.tempUserProfessionPrefs = []
        this.state = {
            message: '',
            dogBreedPref: '',
            dogAgePref: '',
            dogEnergyLevelPref: null,
            dogWeightPref: '',
            distanceFromLocation: 5,
            userAgePrefMinRange: null,
            userProfessionsPref: [],
            userInterestsPref: [],
            isNeuteredDealbreaker: null,
        };
        this.onChange = this.onChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.photoUpload = this.photoUpload.bind(this);
    }
    sendData(){
      const { isNeuteredDealbreaker } = this.state
      if (isNeuteredDealbreaker === null) this.setState({ message: 'Please fill in all required fields' })
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
        let userAgePrefRanges = [ <option value="none" selected disabled hidden>Select an Option</option> ]
        for (let minRange = MIN_USER_AGE; minRange < MAX_USER_AGE; minRange += AGE_RANGE + 1) {
            userAgePrefRanges.push(
            <option key={minRange} value={minRange}>
            {minRange} - {minRange + AGE_RANGE}
            </option>
            )
        }
        return (
        <div>
            <h3>Tell us your dealbreakers and preferences!</h3>
            <h4>Answer a few prompts to help personalize your matches...or leave it to our magic behind the scenes!</h4>
            Maximum distance between you and your new dog friends:
            <select id="distanceFromLocation" name="distanceFromLocation" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {MAX_DISTANCES.map(distance => (<option key = {distance} value={distance}>{distance}</option>))}
            </select>
            <p />
            Does your new dog friend need to be neutered?*
            <select id="isNeuteredDealbreaker" name="isNeuteredDealbreaker" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value={true}>I only want to be matched with neutered dogs</option>
                <option value={false}>I can be matched with dogs regardless of neutered status</option>
            </select>
            <p />
            In an ideal world, I'd like to be matched with a dog with the below characteristics:
            <p />
            Breed: 
            <select id="dogBreedPref" name="dogBreedPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {BREEDS.map(breed => (<option key={breed} value={breed}>{breed}</option>))}
            </select> 
            <br />
            Age compared to my dog: 
            <select id="dogAgePref" name="dogAgePref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {DOG_AGE_PREFS.map(agePref => (<option key = {agePref} value={agePref}>{agePref}</option>))}
            </select>
            <br />
            Energy level:
            <select id="dogEnergyLevelPref" name="dogEnergyLevelPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="1">1 (Lowest)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (Highest)</option>
            </select>
            <br />
            Size compared to my dog: 
            <select id="dogWeightPref" name="dogWeightPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {DOG_WEIGHT_PREFS.map(weightPref => (<option key = {weightPref} value={weightPref}>{weightPref}</option>))}
            </select>
            <p />
            In an ideal world, I'd like to be matched with a pet owner with the below characteristics:
            <br />
            Works in (choose up to 2): 
            <select id="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
            </select>
            <select id="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {PROFESSIONS.map(profession => (<option key = {profession} value={profession}>{profession}</option>))}
            </select>
            <br />
            Has interests in (choose up to 2): 
            <select id="userInterestsPref" name="userInterestsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>
                Select an Option
                </option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
            </select>
            <select id="userInterestsPref" name="userInterestsPref" onChange={this.onChange}>
                <option value="none" selected disabled hidden>Select an Option</option>
                {USER_INTERESTS.map(interest => (<option key = {interest} value={interest}>{interest}</option>))}
            </select>
            <br />
            In the age range of: 
            <select type="userAgePrefMinRange" name="userAgePrefMinRange" onChange={this.onChange}>{userAgePrefRanges}</select>
            <p />
            <button className="submit" type="submit" onClick={this.sendData}>Register</button>
            <p>{this.state.message}</p>
        </div>
      )
    }
}
