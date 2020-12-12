import React from 'react';
import {List, ListItem, ListItemAvatar, Avatar, ImageIcon, ListItemText} from '@material-ui/core'
const DogInfo = ({dog}) => {
  if (!dog){
    return (<div>Loading</div>)
  }
  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Name" secondary="hello" />
        </ListItem>
      </List>
      {/* <div>Dog Name, Age, and Breed: {dog.dogName}, age {dog.dogAge}, a {dog.breed}</div>
      <div>Weight: {dog.weight}</div>
      <div>Energy Level: {dog.energyLevel}</div>
      <div>Neutered: {dog.neutered ? ' Yes' : ' No'}</div> */}
    </div>
  )
}

export default DogInfo
