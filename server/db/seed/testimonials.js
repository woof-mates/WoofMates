const createTestimonials = () => {
  let reviewTitles = [
    'Great app!!',
    'Loved my match!',
    'Easy to use',
  ];
  let reviewBodies = [
    "Love the app and it's been a gamechanger in introducing variety in my pup's routine!",
    "I just met up with my match and both humans and dogs got along great :) Would definitely meet up again!",
    "Easy to use and loved that we could video chat before meeting up",
  ];
  let numberOfStars = [5, 5, 4];
  let testimonials = [];

  for (let i = 0; i < reviewTitles.length; i++){
    testimonials.push({});
    testimonials[i].reviewTitle = reviewTitles[i]
    testimonials[i].reviewBody = reviewBodies[i]
    testimonials[i].numberOfStars = numberOfStars[i]
    testimonials[i].userId = i + 1
  }
  return testimonials;
}

module.exports = createTestimonials;
