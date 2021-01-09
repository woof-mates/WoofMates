import React from "react";
import { connect } from 'react-redux'
import { getTestimonials } from '../../store/testimonials'

class TestimonialsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount () {
    this.props.getTestimonials()
  }

  render() {
    const {testimonials} = this.props

    return (
      <div id="testimonialsContainer">
        {testimonials.map(testimonial => {return (
        <div id="singleTestimonial">
          <b>{testimonial.reviewTitle}</b>
          <br></br>
          {testimonial.reviewBody}
          <br></br>
          <i>{testimonial.user.firstName}</i>
        </div>
        )})}
      </div>
    )
  }
};

const mapState = state => (
  {
    testimonials: state.testimonials
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    getTestimonials: () => dispatch(getTestimonials()),
  }
)

export default connect(mapState, mapDispatchToProps)(TestimonialsContainer);
