import axios from 'axios';

const GET_TESTIMONIALS = 'GET_TESTIMONIALS';
const POST_TESTIMONIAL = 'POST_TESTIMONIAL'

const _getTestimonials = (testimonials) => {
  return {
      type: GET_TESTIMONIALS,
      testimonials
  }
};

const _postTestimonial = (testimonial, user) => {
  return {
    type: POST_TESTIMONIAL,
    testimonial,
    user
  }
}

export const getTestimonials = () => {
  return async(dispatch) => {
    try {
      const { data } = await axios.get('/api/testimonials')
      dispatch(_getTestimonials(data));
    } catch (err) {console.error(err)}
  }
};

export const postTestimonial = (reviewInfo) => {
  return async(dispatch) => {
    try {
      const newTestimonial = (await axios.post('/api/testimonials', reviewInfo)).data
      const user = await axios.get(`/api/users/${reviewInfo.userId}`)
      dispatch(_postTestimonial(newTestimonial, user.data))
    } catch (err) {console.error(err)}
  }
}

export default function testimonialsReducer(state = [], action) {
    switch (action.type) {
        case GET_TESTIMONIALS:
          return action.testimonials
        case POST_TESTIMONIAL:
          return [...state, action.testimonial]
        default:
          return state
    }
}
