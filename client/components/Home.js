import React from 'react';
import { connect } from 'react-redux';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Discover Other Owners and Their Best-Friend</div>
                <div>
                    <img className={"mySlides fade"}  width={650} height={400} src="/images/Slideshow1.jpg"/>
                    <img className={"mySlides fade"} width={650} height={400} src="/images/Slideshow2.jpg"/>
                    <img className={"mySlides fade"} width={650} height={400} src="/images/Slideshow3.jpg"/>
                    <img className={"mySlides fade"} width={650} height={400} src="/images/Slideshow4.jpg"/>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);