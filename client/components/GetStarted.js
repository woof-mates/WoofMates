import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class getStarted extends React.Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        const { user } = this.props
        return(
        <div>
            <h4>Start matching with other Woof-Mates!</h4>
            {!user.id ? 
                <div>
                    <Link className='signInNavButton' to='/login'>Sign In</Link>
                    <br/>
                    <Link className='signUpNavButton' to='/signUp'>Sign Up</Link>
                </div>
                :
                <div>
                    <br></br>
                    <Link className='signInNavButton' to='/match'>Match</Link>
                </div>
            }
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(getStarted)
