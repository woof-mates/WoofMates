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

    //to fix warning/bug of unmounting components setting state
    componentWillUnmount() {
      this.setState = (state) => {
        return;
      }
    }
    
    render() {
      const { currentImage } = this.state
      return (
        <div>
          <img width={1100} height={700} src={slideImages[currentImage]} />
        </div>
      )
    }

}

export default Slideshow

