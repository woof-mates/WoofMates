import React from 'react';
import { USER_INTERESTS } from '../../constants';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function UserInterests (props){
    const { onChange, userInterests, type } = props;
    return (
        <>
            <TextField select label="Interest" className="userInterestsList" name="userInterestsList1" onChange={onChange} value={userInterests[0] || ''}>
                {USER_INTERESTS.map(interest => (<MenuItem key={interest} value={interest}>{interest}</MenuItem>))}
            </TextField>
            <TextField select label="Interest" className="userInterestsList" name="userInterestsList2" onChange={onChange} value={userInterests[1] || ''}>
                {USER_INTERESTS.map(interest => (<MenuItem key={interest} value={interest}>{interest}</MenuItem>))}
            </TextField>
            { type === 'preferences' ? null :
                <TextField select label="Interest" id="userInterestsList" name="userInterestsList3" onChange={onChange} value={userInterests[2] || ''}>
                    {USER_INTERESTS.map(interest => (<MenuItem key={interest} value={interest}>{interest}</MenuItem>))}
                </TextField>
            }
        </>
    )
}
