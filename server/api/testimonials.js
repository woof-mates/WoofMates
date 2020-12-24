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
    res.status(201).send(newTestimonial)
  }
  catch (ex) {
      console.error(ex)
      res.send({
      message: 'Cannot create a new testimonial'
    })
  }
})

module.exports = router;
