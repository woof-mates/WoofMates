import React from 'react';
import { Button } from '@material-ui/core';

export default function ProfileInputButtons(props){
  const { type, sendData, stage, goBack } = props
  if (type === 'edit') return null
  return (
    <div className="registration-buttons">
      { stage > 0 ?
        <Button className="back-button" variant="contained" color="secondary" onClick={goBack}>Back</Button>
        : null
      }
      <Button className="next-button" variant="contained" color="secondary" onClick={sendData}>{ stage < 3 ? 'Next' : 'Register' }</Button>
    </div>
  )
}
