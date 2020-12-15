/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch, sendDecision, sendEmailToMatch } from '../store/match';
import { getDistance }  from '../../utils/mathFuncs'
import Chatrooms from './Chatrooms'
import DogInfo from './Profile/DogInfo'
import UserInfo from './Profile/UserInfo'
import {Button} from '@material-ui/core'
import Cards from './Profile/Cards'

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
    async sendDecisionAndLoadNextMatch(decision){
        try {
            const { getMatch, user, match, sendDecision, sendEmailToMatch } = this.props;
            const matchResult = await sendDecision(user.id, match.id, decision);
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

        if (match.message) {
            return (
            <div id="matchContainer">
                {match.message}
            </div>
            )
        }
        if (!match.message && !match.firstName ) {
            return (
            <div id="matchContainer">
                Please log in to see your matches
            </div>
        )}

        else {
            return (
        <>
        <div id="profileContainer">
            <div id="profileBody">
                <h3>{match.firstName} and {match.dog.dogName}
                {match.liked ? <img id = "userLikedMatch" src = '/images/heartImage.png' /> : <img />}
                </h3>
                <Cards user = {match} />
                <div id="matchButtonsContainer">
                    <Button className="rejectMatchButton" onClick={() => {this.sendDecisionAndLoadNextMatch('reject')}} variant="contained" color="secondary" type="submit">Don't like</Button>
                    <Button className="acceptMatchButton" onClick={() => {this.sendDecisionAndLoadNextMatch('like')}} variant="contained" color="secondary" type="submit">Like</Button>
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
