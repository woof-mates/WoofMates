import React from "react";
import { connect } from 'react-redux'
import { HashRouter as Router, Link, Switch, Route }
from 'react-router-dom';
import {getTestimonials} from '../store/testimonials'


class Testimonials extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    getTestimonials()
    const {user, testimonials} = this.props
  }

  render() {
    const {user, testimonials} = this.props
    if (user.firstName) {
      return (
        <div id="profileContainer">
          <div id="writeTestimonialContainer">
            <h3>I can write my review here</h3>
          </div>
          <div id="testimonialListContainer">
            {/* {testimonials.map(testimonial => <div id="singleTestimonial">{testimonial.reviewTitle}</div>)} */}
          </div>
        </div>
      );
    }

    else {
      return (
        <div id="profileContainer">
          <h1>Testimonials</h1>
          <h3>Testimonial List</h3>
            {testimonials.map(testimonial => <div id="singleTestimonial">{testimonial.reviewTitle}</div>)}
        </div>
      )
    }
  }
};

const mapState = state => (
  {
    user: state.user,
    testimonials: state.testimonials
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    getTestimonials: () => dispatch(getTestimonials())
  }
)

export default connect(mapState, mapDispatchToProps)(Testimonials);
