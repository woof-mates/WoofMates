import React from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { getTestimonials } from '../store/testimonials'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'


class Testimonials extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testimonials: [],
    }
  }

  async componentDidMount () {
    this.props.getTestimonials()
    // const testimonials = (await axios.get('/api/testimonials')).data
    this.setState ({
      reviewTitle: '',
      numberOfStars: '',
      reviewBody: '',
      userId: this.props.user.id
    })
    this.createReview = this.createReview.bind(this)
  }

  createReview (ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
      userId: this.props.user.id
    })
    console.log(this.state)
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
    else if (user.firstName && testimonials) { // user logged in & testimonials exist
      return (
        <div id="testimonialsTitle">
          <h3>Testimonials</h3>
            <div id="writeTestimonialContainer">
              <h4>Write your own review of WoofMates here!</h4>
              <TextField
                variant="filled"
                margin="normal"
                required
                // fullWidth
                id="review-title"
                label="Review Title"
                name="reviewTitle"
                autoComplete="reviewTitle"
                className="reviewTitle" onChange={this.createReview}
                /><br></br>
              <TextField
              variant="filled"
              margin="normal"
              required
              multiline
              // fullWidth
              id="review-body"
              label="Review Body"
              name="reviewBody"
              autoComplete="reviewBody"
              className="reviewBody" onChange={this.createReview}
              />
              <Select
              
              />
            </div>
            <div id="testimonialsContainer">
              {testimonials.map(testimonial => {return (<div id="singleTestimonial">{testimonial.reviewTitle}</div>)})}
            </div>
        </div>
      );
    }

    else if (user.firstName) { // user logged in but no testimonials exist
      return (
        <div id="testimonialsTitle">
          <h3>Testimonials</h3>
            <div id="writeTestimonialContainer">
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="review-title"
                label="Review Title"
                name="reviewTitle"
                autoComplete="reviewTitle"
                className="reviewTitle" onChange={this.createReview}
                />
            </div>
        </div>
      )
    }

    else if (testimonials) { // user not logged in, testimonials exist
      return (
        <div id="testimonialsTitle">
          <h3>Testimonials</h3>
          <div id="testimonialsContainer">
            {testimonials.map(testimonial => {return (<div id="singleTestimonial">{testimonial.reviewTitle}</div>)})}
          </div>
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
    getTestimonials: () => dispatch(getTestimonials())
  }
)

export default connect(mapState, mapDispatchToProps)(Testimonials);
