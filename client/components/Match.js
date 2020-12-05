/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch, sendDecision } from '../store/match';

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
            const { getMatch, user, match, sendDecision } = this.props;
            const matchResult = await sendDecision(user.id, match.id, ev.target.value);
            getMatch(user.id)
            if (matchResult.result === 'Matched') this.setState({ message: `${user.firstName}, you have matched with ${match.firstName}!` })
            else this.setState( { message: ''} )
        } catch (err) { console.error(err); }
    }
    render(){
        let { match } = this.props;
        return (
            match.firstName ?
            <>
                <div>Owner Name: {match.firstName}</div>
                <div>Dog Name and Breed: {match.dog.dogName}, a {match.dog.breed}</div>
                <div>Location: {match.city}, {match.state}</div>
                <div>Meet the Dog:
                    <div>Weight: {match.dog.weight}</div>
                    <div>Age: {match.dog.dogAge}</div>
                    <div>Energy Level: {match.dog.energyLevel}</div>
                    <div>Neutered: {match.dog.neutered ? ' Yes' : ' No'}</div>
                    <div>Interests:
                        {match.dog.dogInterests.reduce((acc, interest) => {
                            return acc + ', ' + interest
                        }, '')}
                    </div>
                </div>

                {/* <div>Profession: {match.profession}</div>
                <div>Interests:
                    {match.userInterests.reduce((acc, interest) => {
                            return acc + ', ' + interest
                        }, '')
                    }
                </div>
                <img src={match.userImage1} />
                <img src={match.userImage2} />
                <img src={match.dogImage} /> */}
                <button onClick={this.sendDecisionAndLoadNextMatch} value="like" type="submit">Like</button>
                <button onClick={this.sendDecisionAndLoadNextMatch} value="reject" type="submit">Don't like</button>
                {/* Match user ID for debugging purposes, will take out */}
                <p>Match User Id: {match.id}</p>
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
    sendDecision: (userId, matchId, decision) => (dispatch(sendDecision(userId, matchId, decision)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
