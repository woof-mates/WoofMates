import React from 'react';
import { Link } from 'react-router-dom';

const getStarted = () => {
    return (
        <div>
            <h4>Start matching with other Woof-Mates!</h4>
            <div>
                <Link className='signInNavButton' to='/login'>Sign In</Link>
                <br/>
                <Link className='signUpNavButton' to='/signUp'>Sign Up</Link>
            </div>
        </div>
    )
}

export default getStarted

