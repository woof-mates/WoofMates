import React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from 'react-redux'
import { getTestimonials } from '../../store/testimonials'

class TestimonialsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.generateStars = this.generateStars.bind(this)
  }

  componentDidMount () {
    this.props.getTestimonials()
  }

  generateStars(num) {
    let starStringHTML = ''
    for (let i=0; i<num; i++) {
      starStringHTML += '&#9733';
    }
    return (
      ReactHtmlParser(starStringHTML)
    )
  }

  render() {
    const {testimonials} = this.props

    return (
      <div id="testimonialsContainer">
        {testimonials.map(testimonial => {return (
        <div id="singleTestimonial" key={testimonial.id}>
          <b>{testimonial.reviewTitle}</b>
          <p />
          <div id="testimonialStarRating">{this.generateStars(testimonial.numberOfStars)}</div>
          <br />
          {testimonial.reviewBody}
          <br />
          <i>- {testimonial.user.firstName}</i>
        </div>
        )})}
      </div>
    )
  }
};

const mapState = state => (
  {
    testimonials: state.testimonials,
    users: state.users
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    getTestimonials: () => dispatch(getTestimonials()),
  }
)

export default connect(mapState, mapDispatchToProps)(TestimonialsContainer);
