import React, { Component } from 'react'
import PhotoUpload from '../components/PhotoUpload'
import Prompts from './Prompts'
import ProfileInputButtons from './ProfileInputButtons'
import DogInterests from './DogInterests'
import { BREEDS } from '../../constants'

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

class DogInfo extends Component{
  constructor(props){
    super(props)
    this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
    this.tempDogInterests = []
    this.state = {
      dogSpeak: '',
      favoriteActivityWithDog: '',
      dogName: '', //required
      breed: '', //required
      dogAge: undefined, //required
      energyLevel: 3,
      weight: undefined, //required
      neutered: undefined, //required
      dogInterests: [],
      dogImage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
    this.goBack = this.goBack.bind(this);
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
  goBack(){
    this.props.goBack(this.state)
  }
  async photoUpload(photoObj){
    await this.setState(photoObj)
    if (this.props.type === 'edit') this.props.updateData(this.state)
  }
  componentDidMount(){
    this.tempDogInterests = this.props.info.dogInterests;
    const { dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogImage } = this.props.info
    this.setState({ dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogImage })
  }
  async onChange (e) {
    if (e.target.name.includes('dogInterestsList')) {
      if (e.target.name === 'dogInterestsList1') {
        this.tempDogInterests[0] = e.target.value
      } else if (e.target.name === 'dogInterestsList2') {
        this.tempDogInterests[1] = e.target.value
      }
      await this.setState({
        dogInterests: this.tempDogInterests
      })
    }
    else if (this.arrForNums.includes(e.target.name)) {
      await this.setState({
        [e.target.name]: Number(e.target.value)
      })
    }
    else {
      await this.setState({
        [e.target.name]: e.target.value
      })
    }
    if (this.props.type === 'edit') this.props.updateData(this.state)
  }
  render(){
    const { dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogImage } = this.state
    const { classes, type } = this.props;
    return (
      <div className={classes.root} noValidate autoComplete="off">
        <h3>Tell us more about your dog!</h3>
        <TextField required label="Dog's Name" name = "dogName" onChange={this.onChange} value={dogName} />
        <TextField required select label="Breed" id="breed" name="breed" onChange={this.onChange} value={breed}>
          {BREEDS.map(breedName => (<MenuItem key={breedName} value={breedName}>{breedName}</MenuItem>))}
        </TextField>
        <TextField required type="number" label="Dog's Age (1 ~)" name="dogAge" onChange={this.onChange} value={dogAge || ''} />
        <p />
        <TextField select label="Energy Level" id="energyLevel" name="energyLevel" onChange={this.onChange} value={energyLevel}>
          <MenuItem value="1">1 (Lowest)</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3 (Default)</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5 (Highest)</MenuItem>
        </TextField>
        <TextField required label="Weight (lbs)" type="number" name = "weight" onChange={this.onChange} value={weight || ''} />
        <TextField required select label="Neutered?" id="neutered" name="neutered" onChange={this.onChange} value={neutered === undefined ? '' : neutered}>
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
        </TextField>
        <p />
        Your dog's primary interests (select up to 2):<br />
        <DogInterests onChange={this.onChange} dogInterests={dogInterests} />
        <p />
        Upload a picture of your dog! (png, jpg format)* <PhotoUpload type="dog" action="Upload" photoUpload={this.photoUpload} /><br />
        {dogImage ? <img src={dogImage} width="150" /> : null }
        <p />
        <Prompts onChange={this.onChange} dogSpeak={dogSpeak} favoriteActivityWithDog={favoriteActivityWithDog} />
        <p />
        <ProfileInputButtons type={type} stage={2} sendData={this.sendData} goBack={this.goBack} />
      </div>
    )
  }
}

export default withStyles(styles)(DogInfo);
