import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabBar = ({tabNumber, openEdit, closeEdit}) => {

  const handleChange = (event, newValue) => {
    if (newValue){
      closeEdit()
    }
    else {
      openEdit()
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
        value = {tabNumber}
        onChange = {handleChange}
        centered>
          <Tab label="Edit Profile"  />
          <Tab label="View Profile"  />
        </Tabs>
      </AppBar>
    </div>
  );
}


export default TabBar
