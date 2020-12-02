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
        console.log('user', user)
        getMatch(user.id)
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
    getMatch: (userId) => dispatch(getMatch(userId)),
    sendDecision: (userId, matchId, decision) => (dispatch(sendDecision(userId, matchId, decision)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
