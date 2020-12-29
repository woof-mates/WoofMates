import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ProfileInputButtons from './ProfileInputButtons'
import { STATES } from '../../constants'

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: 10,
      width: 200,
    },
  },
};

class UserRegistration extends Component{
  constructor(props){
    super(props)
    this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
    this.state = {
        firstName: '', //required
        lastName: '',
        userEmail: '', //required
        password: '', //required
        city: '',
        state: '',
        zipCode: 0, //required
    };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  componentDidMount(){
    const { firstName, lastName, userEmail, city, state, zipCode } = this.props.info
    this.setState({ firstName, lastName, userEmail, city, state, zipCode })
  }
  async onChange (e) {
    if (e.target.name === 'userEmail') {
      let newEmail = e.target.value.toLowerCase()
      await this.setState({
        userEmail: newEmail
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
  sendData(){
    const { firstName, userEmail, password, zipCode} = this.state
    const { updateData, handleNext } = this.props
    if (!firstName.length || !userEmail.length || !password.length || !zipCode) {
      alert('Please fill in all required fields! Fields marked with * are required.')
    }
    else {
      updateData(this.state)
      handleNext()
    }
  }
  render(){
    const { firstName, lastName, userEmail, city, state, zipCode } = this.state
    const { classes, type } = this.props
    return (
      <div className={classes.root} noValidate autoComplete="off">
        <h3>Welcome! Create an Account:</h3>
        <TextField required label="First Name" name="firstName" onChange={this.onChange} value={firstName ? firstName : ''} />
        <TextField label="Last Name" name = "lastName" onChange={this.onChange} value={lastName ? lastName : ''} />
        <p />
        <TextField required label="Email" type="email" name = "userEmail" onChange={this.onChange} value={userEmail ? userEmail : ''} />
        <TextField required type="password" label="Password" name = "password" onChange={this.onChange} />
        <p />
        <TextField label="City" name ="city" onChange={this.onChange} value={city ? city : ''} />
        <TextField select id="stateList" label="State" name="state" onChange={this.onChange} value={state ? state : ''} >
          { STATES.map(stateName => <MenuItem value={stateName[0]} key={stateName[0]}>{stateName[1]}</MenuItem>)}
        </TextField>
        <TextField required label="Zip Code" type="number" name ="zipCode" onChange={this.onChange} value={zipCode ? zipCode : undefined } width={1/3}/>
        <p />
        <ProfileInputButtons type={type} stage={0} sendData={this.sendData} />
      </div>
    )
  }
}

export default withStyles(styles)(UserRegistration);
