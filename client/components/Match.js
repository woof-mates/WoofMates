/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch, sendDecision, sendEmailToMatch } from '../store/match';

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
                this.setState({ message: `${user.firstName}, you have matched with ${match.firstName}!` })
            }
            else {
                getMatch(user.id, user.userLatitude, user.userLongitude)
                this.setState( { message: ''} )
            }
        } catch (err) { console.error(err); }
    }
    render(){
        let { match } = this.props;
        return (
            match.firstName ?
            <>
                <p>Human Name: {match.firstName}</p>
                <p>Dog Name: {match.dog.dogName}</p>
                <p>Dog Breed: {match.dog.breed}</p>
                <p>Match User Id: {match.id}</p>
                <img src={match.userImage1} />
                <button onClick={this.sendDecisionAndLoadNextMatch} value="like" type="submit">Like</button>
                <button onClick={this.sendDecisionAndLoadNextMatch} value="reject" type="submit">Don't like</button>
                <p>{this.state.message}</p>
            </>
            : null
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
