/* eslint-disable complexity */
import React, { Component } from 'react'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ProfileInputButtons from './ProfileInputButtons'
import UserInterests from './UserInterests'

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: 10,
      width: 200,
    },
  },
};

class DealbreakersPreferences extends Component{
  constructor(props){
    super(props)
    this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
    this.tempUserInterestsPrefs = []
    this.tempUserProfessionPrefs = []
    this.state = {
      dogBreedPref: '',
      dogAgePref: '',
      dogEnergyLevelPref: null,
      dogWeightPref: '',
      distanceFromLocation: 5,
      userAgePrefMinRange: null,
      userProfessionsPref: [],
      userInterestsPref: [],
      isNeuteredDealbreaker: undefined,
    };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  sendData(){
    const { isNeuteredDealbreaker } = this.state
    if (isNeuteredDealbreaker === null) alert('Please fill in all required fields! Fields marked with * are required.')
    else this.props.updateData(this.state)
  }
  goBack(){
    this.props.goBack(this.state)
  }
  componentDidMount(){
    this.tempUserProfessionPrefs = this.props.info.userProfessionsPref;
    this.tempUserInterestsPrefs = this.props.info.userInterestsPref;
    const { isNeuteredDealbreaker, distanceFromLocation, dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref } = this.props.info
    this.setState({ isNeuteredDealbreaker, distanceFromLocation, dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref })
  }
  onChange (e) {
    let userInput = {}
    if (e.target.name.includes('userProfessionsPref')) {
      if (e.target.name === 'userProfessionsPref1') this.tempUserProfessionPrefs[0] = e.target.value
      else if (e.target.name === 'userProfessionsPref2') this.tempUserProfessionPrefs[1] = e.target.value
      userInput = { userProfessionsPref: this.tempUserProfessionPrefs }
    }
    else if (e.target.name.includes('userInterestsList')) {
      if (e.target.name === 'userInterestsList1') this.tempUserInterestsPrefs[0] = e.target.value
      else if (e.target.name === 'userInterestsList2') this.tempUserInterestsPrefs[1] = e.target.value
      userInput = { userInterestsPref: this.tempUserInterestsPrefs };
    }
    else if (this.arrForNums.includes(e.target.name)) userInput = { [e.target.name]: Number(e.target.value) }
    else userInput = { [e.target.name]: e.target.value };
    this.setState(userInput, function(){
      if (this.props.type === 'edit') this.props.updateData(userInput)
    })
  }
  render(){
    const { isNeuteredDealbreaker, distanceFromLocation, dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref } = this.state
    const { classes, type } = this.props;
    let userAgePrefRanges = [ <MenuItem key={0} value="none" selected disabled hidden>Select an MenuItem</MenuItem> ]
    for (let minRange = MIN_USER_AGE; minRange < MAX_USER_AGE; minRange += AGE_RANGE + 1) {
      userAgePrefRanges.push(
        <MenuItem key={minRange} value={minRange}>
          {minRange} - {minRange + AGE_RANGE}
        </MenuItem>
      )
    }
    return (
      <div className={classes.root} noValidate autoComplete="off">
        <h3>Tell us your dealbreakers and preferences!</h3>
        <h4>Answer a few prompts to help personalize your matches...or leave it to our magic behind the scenes!</h4>
        Does your new dog friend need to be neutered?*
        <TextField required select id="isNeuteredDealbreaker" name="isNeuteredDealbreaker" onChange={this.onChange} value={isNeuteredDealbreaker === undefined ? '' : isNeuteredDealbreaker}>
          <MenuItem value={true}>I only want to be matched with neutered dogs</MenuItem>
          <MenuItem value={false}>I can be matched with dogs regardless of neutered status</MenuItem>
        </TextField>
        <p />
        Maximum distance (miles) between you and your new dog friends:
        <TextField select id="distanceFromLocation" name="distanceFromLocation" onChange={this.onChange} value={distanceFromLocation || 5}>
          {MAX_DISTANCES.map(distance => (<MenuItem key={distance} value={distance}>{distance}</MenuItem>))}
        </TextField>
        <p />
        In an ideal world, I'd like to be matched with a <strong>dog</strong> with the below characteristics:<br />
        <TextField select label="Breed" id="dogBreedPref" name="dogBreedPref" onChange={this.onChange} value={dogBreedPref || ''}>
          {BREEDS.map(breed => (<MenuItem key={breed} value={breed}>{breed}</MenuItem>))}
        </TextField>
        <TextField select label="Age vs. my dog" id="dogAgePref" name="dogAgePref" onChange={this.onChange} value={dogAgePref || ''}>
          {DOG_AGE_PREFS.map(agePref => (<MenuItem key ={agePref} value={agePref}>{agePref}</MenuItem>))}
        </TextField>
        <TextField select label="Energy level" id="dogEnergyLevelPref" name="dogEnergyLevelPref" onChange={this.onChange} value={dogEnergyLevelPref || ''}>
          <MenuItem key={1} value="1">1 (Lowest)</MenuItem>
          <MenuItem key={2} value="2">2</MenuItem>
          <MenuItem key={3} value="3">3</MenuItem>
          <MenuItem key={4} value="4">4</MenuItem>
          <MenuItem key={5} value="5">5 (Highest)</MenuItem>
        </TextField>
        <TextField select label="Size vs. my dog" id="dogWeightPref" name="dogWeightPref" onChange={this.onChange} value={dogWeightPref || ''}>
          {DOG_WEIGHT_PREFS.map(weightPref => (<MenuItem key={weightPref} value={weightPref}>{weightPref}</MenuItem>))}
        </TextField>
        <p />
        In an ideal world, I'd like to be matched with a <strong>pet owner </strong> with the below characteristics:
        <p />
        Works in (choose up to 2):<br />
        <TextField select label="Profession" className="userProfessionsPref" name="userProfessionsPref1" onChange={this.onChange} value={userProfessionsPref[0] || ''}>
            {PROFESSIONS.map(profession => (<MenuItem key={profession} value={profession}>{profession}</MenuItem>))}
        </TextField>
        <TextField select label="Profession"  className="userProfessionsPref" name="userProfessionsPref2" onChange={this.onChange} value={userProfessionsPref[1] || ''}>
            {PROFESSIONS.map(profession => (<MenuItem key={profession} value={profession}>{profession}</MenuItem>))}
        </TextField><br />
        Has interests in (choose up to 2):<br />
        <UserInterests onChange={this.onChange} userInterests={userInterestsPref} type="preferences" /><br />
        <TextField select label="Age Range" type="userAgePrefMinRange" name="userAgePrefMinRange" onChange={this.onChange} value={userAgePrefMinRange || ''}>
          {userAgePrefRanges}
        </TextField>
        <p />
        <ProfileInputButtons type={type} stage={3} sendData={this.sendData} goBack={this.goBack} />
      </div>
    )
  }
}

export default withStyles(styles)(DealbreakersPreferences);
