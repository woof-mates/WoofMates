import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatch } from '../store/match'

// todo: create api route for matches. also need to consider what data route will send back - will need dog info inside user.

class Match extends Component {
    constructor(){
        super();
        this.state = {
            matchId: 0
        }
    }
    componentDidMount(){
        const { getMatch, user } = this.props;
        console.log('user', user)
        getMatch(user.id)
    }
    render(){
        let { match } = this.props;
        console.log('match',match)
        return (
            match.firstName ? 
            <>
                <p>Human Name: {match.firstName}</p>
                <p>Dog Name: {match.dog.dogName}</p>
                <p>Dog Breed: {match.dog.breed}</p>
                <p>Match User Id: {match.id}</p>
                <button>Like</button>
                <button>Don't like</button>
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