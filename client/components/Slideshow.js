import React from 'react';

const slideImages = [
  '/images/Slideshow1.jpg',
  '/images/Slideshow2.jpg',
  '/images/Slideshow3.jpg',
  '/images/Slideshow4.jpg'
];

class Slideshow extends React.Component {
    constructor(props) {
      super(props)
      this.state = ({
        currentImage: 0
      })
      this.autoSlide = this.autoSlide.bind(this)
    }

    autoSlide() {
      let currentIndex = this.state.currentImage;
      currentIndex = (currentIndex + 1) % (slideImages.length)
      this.setState({
        currentImage: currentIndex
      })
    }

    componentDidMount(){
      setInterval(this.autoSlide, 4500)
    }
    
    render() {
      const { currentImage } = this.state
      return (
        <div className='slideshow'>
          <img width={850} height={550} src={slideImages[currentImage]} />
        </div>
      )
    }

}

export default Slideshow

