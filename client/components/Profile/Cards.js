import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'

const Cards = ({user}) => {
  if (!user.id) {
    return (
        <div id="profileContainer">
            <div>Loading</div>
        </div>
    );
  }
  return (
    <>
    <Card variant="outlined" id = "profileImages">
      <CardMedia
        component = "img"
        image={user.userImage1} />
      {user.prompt.dogSpeak  ?
      <CardContent>
        <Typography variant = "h5" >
        If your dog could speak, what would he/she say?
        </Typography>
        <Typography>
          {user.prompt.dogSpeak}
        </Typography>
      </CardContent>
      : <div />
}
    </Card>
    <Card variant="outlined" id = "profileImages">
      <CardMedia
        component = "img"
        image={user.dogImage} />
      {user.prompt.dogSpeak  ?
      <CardContent>
        <Typography variant = "h5" >
          What is your favorite activity with your dog?
        </Typography>
        <Typography>
          {user.prompt.favoriteActivityWithDog}
        </Typography>
      </CardContent>
      : <div />}
    </Card>
    </>

  )
}

export default Cards
