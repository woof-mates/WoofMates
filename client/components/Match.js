import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch } from '../store/match';
import axios from 'axios';

// todo: create api route for matches. also need to consider what data route will send back - will need dog info inside user.

class Match extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
        this.sendDecision = this.sendDecision.bind(this)
    }
    componentDidMount(){
        const { getMatch, user } = this.props;
        console.log('user', user)
        getMatch(user.id)
    }
    async sendDecision(ev){
        try {
            const { getMatch, user, match } = this.props;
            const matchResult = (await (axios.put(`/api/match/${user.id}`, { decision: ev.target.value, matchId: match.id }))).data
            console.log('result',matchResult)
            getMatch(user.id)
            if(matchResult.result === 'Matched') this.setState({ message: `${user.firstName}, you have matched with ${match.firstName}!` })
            else this.setState( { message: ''} )
        } catch(err) { console.error(err); }
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
                <img src={match.userImage1}></img>
                <button onClick={this.sendDecision} value='like'>Like</button>
                <button onClick={this.sendDecision} value='reject'>Don't like</button>
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
    getMatch: (userId) => dispatch(getMatch(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Match);