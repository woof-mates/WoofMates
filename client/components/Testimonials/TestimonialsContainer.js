import React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from 'react-redux'
import { getTestimonials } from '../../store/testimonials'

class TestimonialsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.generateStars = this.generateStars.bind(this)
  }

  async componentDidMount () {
    this.props.getTestimonials()
  }

  generateStars(num) {
    let starStringHTML = ''
    for (let i=0; i<num; i++) {
      starStringHTML += '&#9733';
    }

    console.log(starStringHTML)
    // var $ = $( "#testimonialStarRating"),
    //console.log(document.getElementById('testimonialStarRating').innerHTML)

    // // var parser = new DOMParser();
    // // var doc = parser.parseFromString(starStringHTML, 'text/html');
    // console.log(starStringHTML)

    //document.getElementById("testimonialStarRating").innerHTML += starStringHTML
    //document.getElementById('testimonialStarRating').innerHTML='<div>'+starStringHTML+'</div>';
    return (
      // doc.body
      ReactHtmlParser(starStringHTML)
      // $('#testimonialStarRating').html(starStringHTML)
    )
    // for (let i = 0; i < num; i++) {
    //   console.log(document.getElementById('testimonialStarRating'))
    //   document.getElementById('testimonialStarRating').innerHTML += '&#9733;';
    // }
  }


  render() {
    const {testimonials} = this.props

    return (
      <div id="testimonialsContainer">
        {testimonials.map(testimonial => {return (
        <div id="singleTestimonial">
          <b>{testimonial.reviewTitle}</b>
          <br></br>
          {/* <div id="testimonialStarRating">&#9733;&#9733;&#9733;&#9733;&#9733;</div> */}
          <div id="testimonialStarRating">{this.generateStars(testimonial.numberOfStars)}</div>
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
