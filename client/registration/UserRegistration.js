/* eslint-disable complexity */
import React, { Component } from 'react'
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

class UserRegistration extends Component{
    constructor(props){
        super(props)
        this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
        this.tempUserInterests = []
        this.tempDogInterests = []
        this.tempUserInterestsPrefs = []
        this.tempUserProfessionPrefs = []
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
        // <ThemeProvider theme={regTheme}>
            <div className={classes.root} noValidate autoComplete="off">
                <h3>Welcome! Create an Account:</h3>
                <TextField required label="First Name" name="firstName" onChange={this.onChange} value={firstName ? firstName : null} />
                <TextField label="Last Name" name = "lastName" onChange={this.onChange} value={lastName ? lastName : null} />
                <p />
                <TextField required label="Email" type="email" name = "userEmail" onChange={this.onChange} value={userEmail ? userEmail : null} />
                <TextField required type="password" label="Password" name = "password" onChange={this.onChange} />
                <p />
                <TextField label="City" name ="city" onChange={this.onChange} value={city ? city : null} />
                <TextField select id="stateList" label="State" name="state" onChange={this.onChange} value={state ? state : ''} >
                  <MenuItem value="AL">Alabama</MenuItem>
                  <MenuItem value="AK">Alaska</MenuItem>
                  <MenuItem value="AZ">Arizona</MenuItem>
                  <MenuItem value="AR">Arkansas</MenuItem>
                  <MenuItem value="CA">California</MenuItem>
                  <MenuItem value="CO">Colorado</MenuItem>
                  <MenuItem value="CT">Connecticut</MenuItem>
                  <MenuItem value="DE">Delaware</MenuItem>
                  <MenuItem value="DC">District Of Columbia</MenuItem>
                  <MenuItem value="FL">Florida</MenuItem>
                  <MenuItem value="GA">Georgia</MenuItem>
                  <MenuItem value="HI">Hawaii</MenuItem>
                  <MenuItem value="ID">Idaho</MenuItem>
                  <MenuItem value="IL">Illinois</MenuItem>
                  <MenuItem value="IN">Indiana</MenuItem>
                  <MenuItem value="IA">Iowa</MenuItem>
                  <MenuItem value="KS">Kansas</MenuItem>
                  <MenuItem value="KY">Kentucky</MenuItem>
                  <MenuItem value="LA">Louisiana</MenuItem>
                  <MenuItem value="ME">Maine</MenuItem>
                  <MenuItem value="MD">Maryland</MenuItem>
                  <MenuItem value="MA">Massachusetts</MenuItem>
                  <MenuItem value="MI">Michigan</MenuItem>
                  <MenuItem value="MN">Minnesota</MenuItem>
                  <MenuItem value="MS">Mississippi</MenuItem>
                  <MenuItem value="MO">Missouri</MenuItem>
                  <MenuItem value="MT">Montana</MenuItem>
                  <MenuItem value="NE">Nebraska</MenuItem>
                  <MenuItem value="NV">Nevada</MenuItem>
                  <MenuItem value="NH">New Hampshire</MenuItem>
                  <MenuItem value="NJ">New Jersey</MenuItem>
                  <MenuItem value="NM">New Mexico</MenuItem>
                  <MenuItem value="NY">New York</MenuItem>
                  <MenuItem value="NC">North Carolina</MenuItem>
                  <MenuItem value="ND">North Dakota</MenuItem>
                  <MenuItem value="OH">Ohio</MenuItem>
                  <MenuItem value="OK">Oklahoma</MenuItem>
                  <MenuItem value="OR">Oregon</MenuItem>
                  <MenuItem value="PA">Pennsylvania</MenuItem>
                  <MenuItem value="RI">Rhode Island</MenuItem>
                  <MenuItem value="SC">South Carolina</MenuItem>
                  <MenuItem value="SD">South Dakota</MenuItem>
                  <MenuItem value="TN">Tennessee</MenuItem>
                  <MenuItem value="TX">Texas</MenuItem>
                  <MenuItem value="UT">Utah</MenuItem>
                  <MenuItem value="VT">Vermont</MenuItem>
                  <MenuItem value="VA">Virginia</MenuItem>
                  <MenuItem value="WA">Washington</MenuItem>
                  <MenuItem value="WV">West Virginia</MenuItem>
                  <MenuItem value="WI">Wisconsin</MenuItem>
                  <MenuItem value="WY">Wyoming</MenuItem>
                </TextField>
                <TextField required label="Zip Code" type="number" name ="zipCode" onChange={this.onChange} value={zipCode ? zipCode : null } width={1/3}/>
                <p />
                <div className="registration-buttons">
                  { type === 'edit' ?
                    null :
                    <Button className="next-button" variant="contained" color="secondary" onClick={this.sendData}>Next</Button>
                  }
                </div>
            </div>
        // </ThemeProvider>
        )
    }
}

export default withStyles(styles)(UserRegistration);
