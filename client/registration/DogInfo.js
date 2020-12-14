/* eslint-disable complexity */
import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import { BREEDS, DOG_INTERESTS } from '../../constants'

import TextField from '@material-ui/core/TextField';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../public/muiTheme'
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  textField: {
    fontFamily: 'Georgia, Times New Roman, Times, serif',
  }
});

class DogInfo extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.tempDogInterests = []
        this.tempUserInterestsPrefs = []
        this.tempUserProfessionPrefs = []
        this.state = {
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
      const { dogName, breed, dogAge, weight, neutered, dogImage } = this.state
      const { updateData, handleNext } = this.props
      if (!dogName || !breed || !dogAge || !weight || !dogImage || neutered === null) {
        alert('Please fill in all required fields! Fields marked with * are required.')
      }
      else {
        updateData(this.state);
        handleNext();
      }
    }
    photoUpload(photoObj){
      this.setState(photoObj)
    }
    componentDidMount(){
      this.tempDogInterests = this.props.info.dogInterests;
      this.setState(this.props.info)
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

      else if (e.target.name.includes('dogInterestsList')) {
        if (e.target.name === "dogInterestsList1") {
          this.tempDogInterests[0] = e.target.value
        } else if (e.target.name === "dogInterestsList2") {
          this.tempDogInterests[1] = e.target.value
        }
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
        console.log('neutered', this.state.neutered)
      }

      else {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    }
    render(){
      const { dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogImage } = this.state
      const { classes } = this.props;
      return (
      <ThemeProvider theme={theme}>
        <div className={classes.root} noValidate autoComplete="off">
            <h3>Tell us more about your dog!</h3>
            <TextField required label="Dog's Name" name = "dogName" onChange={this.onChange} value={dogName || null} />
            <TextField required select label="Breed" id="breed" name="breed" onChange={this.onChange} value={ breed || ''}>
              {BREEDS.map(breed => (<MenuItem key = {breed} value={breed}>{breed}</MenuItem>))}
            </TextField>
            <TextField required type="number" label="Dog's Age" name="dogAge" onChange={this.onChange} value={dogAge || null} />
            <p />
            <TextField select label="Energy Level" id="energyLevel" name="energyLevel" onChange={this.onChange} value={energyLevel || 3}>
              <MenuItem value="1">1 (Lowest)</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3 (Default)</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5 (Highest)</MenuItem>
            </TextField>
            <TextField required label="Weight" type="number" name = "weight" onChange={this.onChange} value={weight || null} />
            <TextField required select label="Neutered?" id="neutered" name="neutered" onChange={this.onChange} value={neutered === null ? '' : neutered ? 'true' : 'false'}>
              <MenuItem value="false">No</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
            </TextField>
            <p />
            Your dog's primary interests (select up to 2):
            <br />
            <TextField select label="Dog interest" id="dogInterestsList" name="dogInterestsList1" onChange={this.onChange} value={dogInterests[0] || ''}>
              {DOG_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
            </TextField>
            <TextField select label="Dog interest" id="dogInterestsList" name="dogInterestsList2" onChange={this.onChange} value={dogInterests[1] || ''}>
              {DOG_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
            </TextField>
            <p />
            Upload a picture of your dog! (png, jpg format)* <PhotoUpload type="dog" action="Upload" photoUpload={this.photoUpload} />
            <br />
            {dogImage ? <img src={dogImage} width="150" /> : null }
            <p />
            <div id="prompts">
              <div className="prompt">
                If your dog could speak it would say...
                <br />
                <textarea name="dogSpeak" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange} value={dogSpeak || null} />
              </div>
              <div className="prompt">
                Your favorite thing to do with your pup is...
                <br />
                <textarea name="favoriteActivityWithDog" rows="3" cols="50" wrap="hard" placeholder="" onChange={this.onChange} value={favoriteActivityWithDog || null} />
              </div>
            </div>
            <p />
            <div className="registration-buttons">
            <ThemeProvider theme={theme}>
              <Button className="back-button" variant="contained" color="secondary" onClick={this.props.goBack}>Back</Button>
              <Button className="next-button" variant="contained" color="secondary" onClick={this.sendData}>Next</Button>
            </ThemeProvider>
            </div>
        </div>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(DogInfo);
