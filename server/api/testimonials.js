const router = require('express').Router();
const { User, Testimonials } = require('../db/index');

router.get('/', async(req, res, next) => { // api/testimonials
  try {
    res.send(await Testimonials.findAll({
      include: [User]
    }));
  }
  catch (ex) {
    next(ex)
  }
})

router.post('/', async(req, res, next) => { // write a testimonial
  try {
    const newTestimonial = await Testimonials.create(req.body)
    const testimonial = await Testimonials.findOne({
      where: {
        id: newTestimonial.id
      },
      include: [User],
    })
    //userId
    res.status(201).send(testimonial)
  }
  catch (ex) {
      console.error(ex)
      res.send({
      message: 'Cannot create a new testimonial'
    })
  }
})

module.exports = router;
