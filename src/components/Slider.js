import React, { Component } from 'react'
import Slider from "react-slick";
import Img from 'gatsby-image';
import MediaQuery from 'react-responsive'
import slugify from "slugify";
import { icons } from "./Icons";

const PrevArrow = ({ onClick }) => (
  <div className="container slick-container">
    <div className="slick-arrow slick-previous c-white" onClick={onClick}>
      {icons.carouselArrowLeft}
    </div>
  </div>
)

const NextArrow = ({ onClick }) => (
  <div className="container slick-container">
    <div className="slick-arrow slick-next c-white" onClick={onClick} >
      {icons.carouselArrowRight}
    </div>
  </div>
)

export default class HeroSlider extends Component {

  componentDidMount() {
    this.slider.innerSlider.list.setAttribute('tabindex', 0);
    this.slider.innerSlider.list.focus();
  }

  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

    return (
      <Slider
        className="hero"
        {...settings}
        ref={el => {
          if (el) {
            this.slider = el;
          }
        }}
      >
        {this.props.slides.map((slide, i) => {
          return slide.project ?
            <div className="slide c-white" key={`slide-${i}`}>
              {/* slide info */}
              {/* <div className="container slick-container">
                <div className="slide-info">
                  <a className="marginBottom-4 block" href={`projects/${slugify(slide.project, { lower: true })}`}>
                    <p>{slide.title}</p>
                    <p>{slide.subtitle}</p>
                  </a>
                  <span>{i + 1}/{this.props.slides.length}</span>
                </div>
              </div> */}
              <MediaQuery orientation={'portrait'} maxWidth={1224}>
                {(matches) => {
                  if (matches && slide.portraitImage) {
                    return (
                      <Img sizes={ slide.portraitImage.childImageSharp.sizes } alt={slide.image.alt}/>
                    )
                  } else if (slide.image) {
                    return (
                      <Img sizes={ slide.image.childImageSharp.sizes } alt={slide.image.alt}/>
                    )
                  } else {
                    return null
                  }
                }}
              </MediaQuery>
            </div>
            :
            <div className="slide c-white" key={`slide-${i}`}>
              {/* <div className="container slick-container">
                <div className="slide-info">
                  <div className="marginBottom-4">
                    <p>{slide.title}</p>
                    <p>{slide.subtitle}</p>
                  </div>
                  <span>{i + 1}/{this.props.slides.length}</span>
                </div>
              </div> */}
              {slide.image && 
                <Img sizes={ slide.image.childImageSharp.sizes } alt={slide.image.alt}/>
              }
            </div>
        })}
      </Slider>
    )
  }
}
