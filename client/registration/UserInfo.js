import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import ProfileInputButtons from './ProfileInputButtons'
import { PROFESSIONS } from '../../constants'
import UserInterests from './UserInterests'

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
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
      age: undefined,
      profession: '',
      userInterests: [],
      userImage1: '',
    };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
    this.goBack = this.goBack.bind(this);
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
  goBack(){
    this.props.goBack(this.state)
  }
  photoUpload(photoObj){
    this.setState(photoObj, function(){
      if (this.props.type === 'edit') this.props.updateData(this.state)
    })
  }
  componentDidMount(){
    this.tempUserInterests = this.props.info.userInterests;
    const { age, profession, userInterests, userImage1 } = this.props.info
    this.setState({ age, profession, userInterests, userImage1 })
  }
  onChange (e) {
    let userInput = {}
    if (e.target.name.includes('userInterestsList')) {
      if (e.target.name === 'userInterestsList1') this.tempUserInterests[0] = e.target.value
      else if (e.target.name === 'userInterestsList2') this.tempUserInterests[1] = e.target.value
      else if (e.target.name === 'userInterestsList3') this.tempUserInterests[2] = e.target.value
      userInput = {userInterests: this.tempUserInterests}
    }
    else if (this.arrForNums.includes(e.target.name)) userInput = {[e.target.name]: Number(e.target.value)};
    else userInput = {[e.target.name]: e.target.value}
    this.setState(userInput, function(){
      if (this.props.type === 'edit') this.props.updateData(userInput)
    })
  }
  render(){
    const { age, profession, userInterests, userImage1 } = this.state
    const { classes, type } = this.props
    return (
      <div className={classes.root} noValidate autoComplete="off">
      <h3>A bit more about you...</h3>
        <TextField label="Age" type="number" name = "age" onChange={this.onChange} value={age || ''} />
        <TextField select id="profession" label="Profession" name="profession" onChange={this.onChange} value={profession ? profession : '' }>
          {PROFESSIONS.map(professionName => (<MenuItem key={professionName} value={professionName}>{professionName}</MenuItem>))}
        </TextField>
        <p />
        Your interests (select up to 3):<br />
        <UserInterests onChange={this.onChange} userInterests={userInterests} />
        <p />
        Upload a picture of yourself! (png, jpg format)* <PhotoUpload type="owner" action="Upload" photoUpload={this.photoUpload} />
        <br />
        {userImage1 ? <img src={userImage1} width="150" /> : null }
        <p />
        <ProfileInputButtons type={type} stage={1} sendData={this.sendData} goBack={this.goBack} />
      </div>
    )
  }
}

export default withStyles(styles)(UserInfo);
