import axios from 'axios';

const GET_TESTIMONIALS = 'GET_TESTIMONIALS';

const _getTestimonials = (testimonials) => {
    return {
        type: GET_TESTIMONIALS,
        testimonials
    }
};

const getTestimonials = () => {
  return async(dispatch) => {
    const testimonials = (await axios.get('/api/testimonials')).data;
    dispatch(_getTestimonials(testimonials));
  }
};

export default function testimonialsReducer(state = [], action) {
    switch (action.type) {
        case GET_TESTIMONIALS:
            return action.testimonials
        default:
            return state
    }
};

export { getTestimonials };
