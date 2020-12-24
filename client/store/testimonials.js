import axios from 'axios';

const GET_TESTIMONIALS = 'GET_TESTIMONIALS';

const _getTestimonials = (testimonials) => {
    return {
        type: GET_TESTIMONIALS,
        testimonials
    }
};

export const getTestimonials = () => {
  return async(dispatch) => {
    try {
      const { data } = await axios.get('/api/testimonials')
      dispatch(_getTestimonials(data));
    } catch (err) {console.error(err)}
  }
};

export default function testimonialsReducer(state = [], action) {
    switch (action.type) {
        case GET_TESTIMONIALS:
            return action.testimonials
        default:
            return state
    }
}
