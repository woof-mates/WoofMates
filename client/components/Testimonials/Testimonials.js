import React from "react";
import { connect } from 'react-redux'
import { getTestimonials, postTestimonial } from '../../store/testimonials'
import TestimonialsContainer from './TestimonialsContainer'
import WriteTestimonial from './WriteTestimonial'

class Testimonials extends React.Component {

  componentDidMount () {
    this.props.getTestimonials()
  }

  render() {
    const {user} = this.props
    const {testimonials} = this.props

    if (!testimonials) {
      return (
        <div id="testimonialsContainer">
          No testimonials have been written yet
        </div>
      )
    }
    else if (user.firstName && testimonials && !user.testimonial) { // user logged in & testimonials exist & user has not written a review before
      return (
        <div id="testimonialsTitle">
          <h3>Testimonials</h3>
            <WriteTestimonial />
            <TestimonialsContainer />
        </div>
      );
    }

    else if (user.firstName) { // user logged in and has already written a review
      return (
        <div id="testimonialsTitle">
          <h3>Testimonials</h3>
            <TestimonialsContainer />
        </div>
      )
    }

    else if (testimonials) { // user not logged in but testimonials exist
      return (
        <div id="testimonialsTitle">
          <h3>Testimonials</h3>
            <TestimonialsContainer />
        </div>
      )
    }

    else { // user not logged in and no testimonials exist
      return (
        <div id="testimonialsContainer">
          No testimonials exist yet
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
    getTestimonials: () => dispatch(getTestimonials()),
    postTestimonial: (reviewInfo) => dispatch(postTestimonial(reviewInfo))
  }
)

export default connect(mapState, mapDispatchToProps)(Testimonials);
