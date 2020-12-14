/* eslint-disable complexity */
import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import { PROFESSIONS, USER_INTERESTS } from '../../constants'

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: 10,
      width: 200,
    },
  },
};

class UserInfo extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.state = {
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
      const { updateData, handleNext } = this.props
      if (!userImage1.length) {
        alert('Please fill in all required fields! Fields marked with * are required.')
      }
      else {
        updateData(this.state)
        handleNext()
     }
    }
    photoUpload(photoObj){
      this.setState(photoObj)
    }
    componentDidMount(){
      this.tempUserInterests = this.props.info.userInterests;
      this.setState(this.props.info)
    }
    onChange (e) {
      if (e.target.name.includes('userInterestsList')) {
        if (e.target.name === "userInterestsList1") {
          this.tempUserInterests[0] = e.target.value
        } else if (e.target.name === "userInterestsList2") {
          this.tempUserInterests[1] = e.target.value
        } else if (e.target.name === "userInterestsList3") {
          this.tempUserInterests[2] = e.target.value
        }
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

      if (this.props.type === 'edit') this.props.updateData(this.state)
    }
    render(){
      const { age, profession, userInterests, userImage1 } = this.state
      const { classes, type } = this.props
        return (
          <div className={classes.root} noValidate autoComplete="off">
          <h3>A bit more about you...</h3>
              <TextField label="Age" type="number" name = "age" onChange={this.onChange} value={age ? age : null} />
              <TextField select id="profession" label="Profession" name="profession" onChange={this.onChange} value={profession ? profession : '' }>
                {PROFESSIONS.map(profession => (<MenuItem key = {profession} value={profession}>{profession}</MenuItem>))}
              </TextField>
              <p />
              Your interests (select up to 3):
              <br />
              <TextField select label="Interest" className="userInterestsList" name="userInterestsList1" onChange={this.onChange} value={userInterests[0] || ''}>
                {USER_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
              </TextField>
              <TextField select label="Interest" className="userInterestsList" name="userInterestsList2" onChange={this.onChange} value={userInterests[1] || ''}>
                {USER_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
              </TextField>
              <TextField select label="Interest" id="userInterestsList" name="userInterestsList3" onChange={this.onChange} value={userInterests[2] || ''}>
                {USER_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
              </TextField>
              <p />
              Upload a picture of yourself! (png, jpg format)* <PhotoUpload type="owner" action="Upload" photoUpload={this.photoUpload} />
              <br />
              {userImage1 ? <img src={userImage1} width="150" /> : null }
              <p />
              { type === 'edit' ? null :
              <div className="registration-buttons">
                <Button className="back-button" variant="contained" color="secondary" onClick={this.props.goBack}>Back</Button>
                <Button className="next-button" variant="contained" color="secondary" onClick={this.sendData}>Next</Button>
              </div>
              }
          </div>
        )
    }
}

export default withStyles(styles)(UserInfo);
