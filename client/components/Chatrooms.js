import React from 'react';
import Chat from './Chat';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getMatch } from '../store/match';

class Chatrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            messaging: 0
        };
        this.toMessage = this.toMessage.bind(this);
        this.closeChat = this.closeChat.bind(this);
    }

    componentDidMount() {
        if (this.props.user.id) {
            console.log(this.props.user.id);
            this.props.getMatch(this.props.user.id);
            console.log(this.props.match)
        } 
    }

    closeChat() {
        this.setState({
            messaging: 0
        })
    }

    toMessage(id) {
        this.setState({
            messaging: id
        })
    }

    render() {
        const { user } = this.props
        const { match } = this.props
        const { messaging } = this.state
        console.log(match.id)
        if (!user.id) {
            return (
                <div>
                    <Link to='/login'>Please Log In To Review Your Messages</Link>
                </div>
            )
        } else if (messaging !== 0) {
            return (
                <div>
                    <div onClick={this.closeChat}>Close Chat</div>
                    <Chat from={user.id} to={match.id}/>
                </div>
            )
        } else {
            return (
                <div>
                    <ul>
                        <li onClick={() => this.toMessage(match.id)}>{match.firstName} {match.lastName}</li>
                    </ul>
                </div>
            )

        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        match: state.match
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMatch: (userId) => dispatch(getMatch(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatrooms);