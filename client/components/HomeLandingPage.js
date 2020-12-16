import React from 'react';
import Slideshow from './Slideshow';
import GetStarted from './GetStarted';

const HomeLandingPage = () => {
    return (
        <div className='slideshowContainer'>
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
}

export default HomeLandingPage