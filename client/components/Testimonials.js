import React from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import {getTestimonials} from '../store/testimonials'


class Testimonials extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testimonials: [],
    }
  }

  async componentDidMount () {
    // getTestimonials()
    const testimonials = (await axios.get('/api/testimonials')).data
    this.setState ({
      testimonials
    })
  }

  render() {
    const {user} = this.props
    const {testimonials} = this.state
    if (user.firstName) {
      return (
        <div id="testimonialsContainer">
            I can write my review here
            {testimonials.map(testimonial => {return (<div id="singleTestimonial">{testimonial.reviewTitle}</div>)})}
        </div>
      );
    }

    else {
      return (
        <div id="testimonialsContainer">
          Testimonial List
            {testimonials.map(testimonial => {return (<div id="singleTestimonial">{testimonial.reviewTitle}</div>)})}
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
