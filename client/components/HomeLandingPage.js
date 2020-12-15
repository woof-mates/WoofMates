import React from 'react';
import { connect } from 'react-redux';
import Slideshow from './Slideshow';
import GetStarted from './GetStarted';

class HomeLandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props
        return (
            <div className='slideshowContainer'>
                { user.id ? <div className='welcome'>Welcome, {user.firstName}!</div> : ''}
                <div className='slideTitle'>
                    <h2>Discover Dog Owners and Their Best-Friend</h2>
                    <img width={50} height={50} src={'/images/pawprint.jpg'} />
                </div>
                <div className='slideshow'>
                    <Slideshow/>
                </div>
                <div className='getStarted'>
                    <GetStarted/>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(HomeLandingPage);