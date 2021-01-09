import React from 'react';
import { DOG_INTERESTS } from '../../constants';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function DogInterests (props){
    const { onChange, dogInterests } = props;
    return (
        <>
            <TextField select label="Dog interest" id="dogInterestsList" name="dogInterestsList1" onChange={onChange} value={dogInterests[0] || ''}>
                {DOG_INTERESTS.map(interest => (<MenuItem key={interest} value={interest}>{interest}</MenuItem>))}
            </TextField>
            <TextField select label="Dog interest" id="dogInterestsList" name="dogInterestsList2" onChange={onChange} value={dogInterests[1] || ''}>
                {DOG_INTERESTS.map(interest => (<MenuItem key={interest} value={interest}>{interest}</MenuItem>))}
            </TextField>
        </>
    )
}
