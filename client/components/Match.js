/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch, sendDecision, sendEmailToMatch } from '../store/match';
import { getDistance }  from '../../utils/mathFuncs'
import Chatrooms from './Chatrooms'
import { list } from '../../utils/frontEndFuncs'
import DogInfo from './Profile/DogInfo'
import UserInfo from './Profile/UserInfo'

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
        getMatch(user.id, user.userLatitude, user.userLongitude)
    }
    async sendDecisionAndLoadNextMatch(ev){
        try {
            const { getMatch, user, match, sendDecision, sendEmailToMatch } = this.props;
            const matchResult = await sendDecision(user.id, match.id, ev.target.value);
            if (matchResult.result === 'Matched') {
                // saving current match in variable before calling getMatch again. email takes too long to send with await.
                sendEmailToMatch(user, match)
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
        let matchDistanceFromUser = parseInt(getDistance(user.userLatitude, user.userLongitude, match.userLatitude, match.userLongitude))
        if (!match.firstName) return (
            <div id="matchContainer">
                Please log in to see your matches
            </div>
        )
        else {
            return (
        <>
        <div id="profileContainer">
            <div id="profileBody">
                <h3>{match.firstName} and {match.dog.dogName}</h3>
                <img src={match.userImage1} />
                <img src={match.userImage2} />
                <img src={match.dogImage} />
                <div id="matchButtonsContainer">
                    <button className="acceptMatchButton" onClick={this.sendDecisionAndLoadNextMatch} value="like" type="submit">Like</button>
                    <button className="rejectMatchButton" onClick={this.sendDecisionAndLoadNextMatch} value="reject" type="submit">Don't like</button>
                </div>
                {/* Match user ID for debugging purposes, will take out */}
                {/* <p>Match User Id: {match.id}</p> */}
                <p>{this.state.message}</p>
                { this.state.message.includes('you have matched') ? <Chatrooms matchedId = {match.id} /> : null}
            </div>
            <div id="infoBody">
                <UserInfo user = {match} />
                <DogInfo dog = {match.dog} />
            </div>
        </div>
        </>
                )
            }
    }
}

const mapStateToProps = (state) => ({
    match: state.match,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    getMatch: (userId, userLatitude, userLongitude) => dispatch(getMatch(userId, userLatitude, userLongitude)),
    sendDecision: (userId, matchId, decision) => (dispatch(sendDecision(userId, matchId, decision))),
    sendEmailToMatch: (user, match) => dispatch(sendEmailToMatch(user, match))
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
