import React from 'react';

export function matchEmail(user, match){
    console.log('match', match)
    console.log('matchdog', match.dog.dogName)
    const { firstName, dog } = match

    return `<p>Congrats ${firstName}, you have matched with ${user.firstName}!</p>`
}
