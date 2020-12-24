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
    const data = await axios.get('/api/testimonials');
    console.log(testimonials[0])
    dispatch(_getTestimonials(data));
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
