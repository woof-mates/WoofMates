const { getDistance } = require('../../utils/mathFuncs')

// function to filter matches with upfront user-specified filters
const filterMatchesWithUserSpecifiedFilters = (user, matchArray) => {
    let filteredMatchArray = [];
    const { userLatitude, userLongitude } = user
    const { isNeuteredDealbreaker, distanceFromLocation } = user.preference
    for (let match of matchArray){
        if (getDistance(userLatitude * 1, userLongitude * 1, match.userLatitude * 1, match.userLongitude * 1) <= distanceFromLocation
        && (isNeuteredDealbreaker && match.dog.neutered || isNeuteredDealbreaker === false)) filteredMatchArray.push(match)
    }
    return filteredMatchArray;
}

module.exports = { filterMatchesWithUserSpecifiedFilters };
