import React from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { getTestimonials, postTestimonial } from '../../store/testimonials'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import TestimonialsContainer from './TestimonialsContainer'
import WriteTestimonial from './WriteTestimonial'

class Testimonials extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testimonials: [],
      reviewTitle: '',
      numberOfStars: 5,
      reviewBody: '',
      userId: ''
    }
  }

  async componentDidMount () {
    this.props.getTestimonials()
    this.setState ({
      userId: this.props.user.id
    })
    this.createReview = this.createReview.bind(this)
    this.sendTestimonial = this.sendTestimonial.bind(this)
  }

  createReview (ev) {
    if (ev.target.name === 'numberOfStars') {
      this.setState({
        numberOfStars: Number(ev.target.value)
      })
    }
    else {
      this.setState({
        [ev.target.name]: ev.target.value,
        userId: this.props.user.id
      })
    }
  }

  sendTestimonial (e) {
    e.preventDefault()
    this.props.postTestimonial(this.state)
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
