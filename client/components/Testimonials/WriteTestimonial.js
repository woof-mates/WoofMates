import React from "react";
import { connect } from 'react-redux'
import {postTestimonial } from '../../store/testimonials'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

class WriteTestimonial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewTitle: '',
      numberOfStars: 5,
      reviewBody: '',
      userId: ''
    }
  }

  componentDidMount () {
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
    const CHARACTER_LIMIT = 150
    return (
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
        />
        <br></br>
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
          rowsMax={2}
          inputProps={{
            maxlength: CHARACTER_LIMIT
          }}
          helperText={`${this.state.reviewBody.length}/${CHARACTER_LIMIT}`}
          className="reviewBody" onChange={this.createReview}
        />
        <br></br>
        <TextField
          select label="Star Rating"
          id="numberOfStars"
          name="numberOfStars"
          onChange={this.createReview}
          variant="filled"
          required value={5}>
          <MenuItem value="1">1 (Lowest)</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3 (Default)</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5 (Highest)</MenuItem>
        </TextField>
        <div className="testimonial-buttons">
          <Button className="testimonial-submit-button" variant="contained" color="secondary" onClick={this.sendTestimonial}>Submit Feedback</Button>
        </div>
      </div>
    )
  }
};

const mapState = state => (
  {
    user: state.user,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    postTestimonial: (reviewInfo) => dispatch(postTestimonial(reviewInfo))
  }
)

export default connect(mapState, mapDispatchToProps)(WriteTestimonial);
