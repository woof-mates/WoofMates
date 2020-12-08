/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch, sendDecision, sendEmailToMatch } from '../store/match';
import { getDistance }  from '../../utils/mathFuncs'
import Chatrooms from './Chatrooms'

class Match extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
        this.sendDecisionAndLoadNextMatch = this.sendDecisionAndLoadNextMatch.bind(this)
    }
    componentDidMount(){
        const { getMatch, user } = this.props;
        console.log('user', user, user.userLatitude, user.userLongitude)
        getMatch(user.id, user.userLatitude, user.userLongitude)
    }
    async sendDecisionAndLoadNextMatch(ev){
        try {
            const { getMatch, user, match, sendDecision, sendEmailToMatch } = this.props;
            const matchResult = await sendDecision(user.id, match.id, ev.target.value);
            if (matchResult.result === 'Matched') {
                // saving current match in variable before calling getMatch again. email takes too long to send with await.
                const thisMatch = match
                sendEmailToMatch(user, thisMatch)
                getMatch(user.id, user.userLatitude, user.userLongitude)
                this.setState({ message: `${user.firstName}, you have matched with ${match.firstName}! Send them a message now:` })
            }
            else {
                getMatch(user.id, user.userLatitude, user.userLongitude)
                this.setState( { message: ''} )
            }
        } catch (err) { console.error(err); }
    }
    render(){
        let { match, user } = this.props;
        if (!match.firstName) return null
        return (
        <>
            <div>Owner Name and Age: {match.firstName}, age {match.age}</div>
            <div>Dog Name, Age, and Breed: {match.dog.dogName}, age {match.dog.dogAge}, a {match.dog.breed}</div>
            <div>Location: {match.city}, {match.state}, {parseInt(getDistance(user.userLatitude, user.userLongitude, match.userLatitude, match.userLongitude))} miles from you</div>
            <br />
            <div>Meet the Dog:
                <div>Weight: {match.dog.weight}</div>
                <div>Energy Level: {match.dog.energyLevel}</div>
                <div>Neutered: {match.dog.neutered ? ' Yes' : ' No'}</div>
                <div>Interests:
                    {match.dog.dogInterests.reduce((acc, interest, i) => {
                        if (i === 0) return acc + interest
                        else return acc + ', ' + interest
                    }, '')}
                </div>
            </div>
            <br />
            <div>Meet the Owner:
                <div>Age: {match.age}</div>
                <div>Interests:
                    {match.userInterests.reduce((acc, interest, i) => {
                        if (i === 0) return acc + interest
                        else return acc + ', ' + interest
                    }, '')
                    }
                </div>
                <div>Profession: {match.profession}</div>
            </div>
            <img src={match.userImage1} />
            <img src={match.userImage2} />
            <img src={match.dogImage} />
            <button onClick={this.sendDecisionAndLoadNextMatch} value="like" type="submit">Like</button>
            <button onClick={this.sendDecisionAndLoadNextMatch} value="reject" type="submit">Don't like</button>
            {/* Match user ID for debugging purposes, will take out */}
            <p>Match User Id: {match.id}</p>
            <p>{this.state.message}</p>
            { this.state.message.includes('you have matched') ? <Chatrooms matchedId = {match.id} /> : null}
        </>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        match: state.match,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMatch: (userId, userLatitude, userLongitude) => dispatch(getMatch(userId, userLatitude, userLongitude)),
    sendDecision: (userId, matchId, decision) => (dispatch(sendDecision(userId, matchId, decision))),
    sendEmailToMatch: (user, match) => dispatch(sendEmailToMatch(user, match))
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
