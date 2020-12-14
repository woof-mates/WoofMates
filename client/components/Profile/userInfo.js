import React from 'react';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@material-ui/core'
import CakeIcon from '@material-ui/icons/Cake';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const UserInfo = ({user}) => {
  if (!user){
    return (<div>Loading</div>)
  }
  return (
    <div className = "infoContainer">
      <h4>This is Me!</h4>
       <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.firstName} secondary = "Name"/>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CakeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.age} secondary = "Age"/>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOnIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${user.city}, ${user.state}`} secondary = "Location"/>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FitnessCenterIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.profession} secondary = "Profession"/>
        </ListItem>
        {user.userInterests.map((interest) => {
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

export default UserInfo
