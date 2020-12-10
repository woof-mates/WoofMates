import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Home Page
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);