import React from 'react';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@material-ui/core'
import CakeIcon from '@material-ui/icons/Cake';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FaceIcon from '@material-ui/icons/Face';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const DogInfo = ({dog}) => {
  if (!dog){
    return (<div>Loading</div>)
  }
  return (
    <div className = "infoContainer">
      <h4>This is my Dog!</h4>
      <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dog.dogName} secondary = "Name"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CakeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dog.dogAge} secondary = "Age"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dog.breed} secondary = "Breed"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FitnessCenterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dog.weight} secondary = "Weight"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BatteryFullIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dog.energyLevel} secondary = "Energy Level"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CloseIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dog.neutered ? ' Yes' : ' No'} secondary = "Neutered?"/>
      </ListItem>
      {dog.dogInterests.map((interest) => {
          return (
          <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FavoriteBorderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={interest} secondary = "Interests?"/>
        </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default DogInfo
