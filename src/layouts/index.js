import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import "../styles/app.scss";
import HeaderNav from "../components/HeaderNav";
import FixedLogo from "../components/FixedLogo";
import classnames from "classnames";
import Headroom from "react-headroom";
import { icons } from "../components/Icons";

if (typeof window !== `undefined`) {
  require("intersection-observer");
}

export default class TemplateWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      layerIncrement: 0,
    };
    this.animationInterval = setInterval(this.animateFooterLogo, 2000);
    this.fixedLogo = React.createRef();
  }

  animateFooterLogo = () => {
    let currentIncrement = this.state.layerIncrement < 6 ? this.state.layerIncrement + 1 : 0;
    this.setState({ layerIncrement: currentIncrement });
  }

  handleIntersect = (e) => {
    if (e[0].isIntersecting) {
      this.setState({ fixedLogoPast: false })
    } else {
      this.setState({ fixedLogoPast: true })
    }
  }

  createObserver = () => {
    this.observer = null;

    const options = {
      root: null,
      rootMargin: '-49%'
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.hero);
  }

  initHeroObserver = () => {
    this.hero = this.main.querySelector('.hero') || this.main.querySelector('.projectHero');
    if(this.hero) {
      this.createObserver();
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
    this.initHeroObserver();
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.initHeroObserver();
      this.setState({menuOpen: false});
    } else if (this.props.location.hash !== prevProps.location.hash) {
      this.setState({menuOpen: false});
    }
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
  }

  toggleMenu = () => {
    const screenHeight = window.innerHeight;
    this.state.menuOpen ? this.setState({ menuOpen: false, navHeight: screenHeight }) : this.setState({ menuOpen: true, navHeight: screenHeight });
  }

  handleMenuButtonClick = (e, path) => {
    const location = this.props.location;
    if (location.pathname === path) {
      this.setState({ menuOpen: false})
      e.preventDefault();
    }
    if (location.hash === path.substring(1)) {
      this.setState({ menuOpen: false})
      e.preventDefault();
    }
  }

  updateDimensions = () => {
    const screenWidth = document.body.clientWidth;
    screenWidth >= 768 ? this.setState({ isWindowLarge: true }) : this.setState({ isWindowLarge: false });
    screenWidth > 768 && screenWidth < 1024 ? this.setState({ isWindowMedium: true }) : this.setState({ isWindowMedium: false });
  }

  render() {
    const homeClasses = classnames(this.props.className, {
      'blackFixedLogo': this.props.location.pathname.replace(/\//g, '') === 'work' && this.state.isWindowLarge,
      'menuVisible': this.state.menuOpen,
      'bg-lightRed c-red': ( this.props.location.pathname.replace(/\//g, '') === 'about'
                          || this.props.location.pathname.replace(/\//g, '') === 'contact' ),
      'hideFixedLogo': this.props.location.pathname.replace(/\//g, '') === 'news'
                  || ( this.props.location.pathname.replace(/\//g, '') === 'work' && this.state.isWindowMedium )
                  || ( this.props.location.pathname.replace(/\//g, '') === 'contact' && this.state.isWindowMedium )
                  || ( this.props.location.pathname.replace(/\//g, '') === '' && !this.state.isWindowMedium && !this.state.isWindowLarge ),
    })
    
    const menuBackground = this.props.data.settingsJson.menuBackground;
    
    const {
      children,
      data
    } = this.props;

    return (
      <div className={ homeClasses }>
        <Helmet 
          title="BC&#8212;OA"
          bodyAttributes={{ class: this.state.menuOpen && 'scrollingIsDisabled' }}
        />
        <Headroom>
          <HeaderNav  visible=        { this.state.menuOpen }
                      toggleMenu=     { this.toggleMenu }
                      handleMenuButtonClick=     { this.handleMenuButtonClick }
                      isWindowLarge=  { this.state.isWindowLarge }
                      menuBackground= { menuBackground }
                      navHeight=      { this.state.navHeight }
          />
        </Headroom>
        <FixedLogo fixedLogoPast={ this.state.fixedLogoPast } isWindowMedium={ this.state.isWindowMedium } />
        <div className="main" ref={(el) => { if (el) { this.main = el } } }>
          { children({ ...this.props, ...{ isWindowLarge: this.state.isWindowLarge } } ) }
        </div>
        <footer>
          <div className="container">
            <hr className="marginBottom-5" />
            <div className="paddingBottom-9
                            bp-1_grid-12col
                            bp-1_paddingBottom-11
                            bp-2_paddingBottom-21"
            >
              <div className={` colSpan-6
                                marginBottom-7
                                bp-1_marginBottom-0
                                layer-${ this.state.layerIncrement }`}
              >
                { icons.footerGIFs }
              </div>
              <div className="f-footer-b
                              colSpan-3
                              marginBottom-5
                              bp-1_marginBottom-0"
              >                
                <b className="f-footer-a">Contact</b>
                <a href="https://goo.gl/maps/cxWiP9aLg6v" target="_blank">
                  <address className="f-footer-b">
                    {data.contactJson.address.street},
                    {" "}
                    {data.contactJson.address.street2}
                    <br />
                    {data.contactJson.address.city}, {data.contactJson.address.state}{" "}
                    {data.contactJson.address.zip}
                    <br />
                  </address>
                </a>
                –
                <div>
                  <a href={`mailto:${data.contactJson.email} `}>
                    {data.contactJson.email}
                  </a>
                </div>
                <div>
                  <a href={`tel:${data.contactJson.phone} `}>
                    {data.contactJson.phone}
                  </a>
                </div>
              </div>
              <div className="f-footer-b colSpan-3" style={{ display: "flex", flexDirection: "column" }}>
                <b className="f-footer-a">Social</b>
                <div>
                  <a href={`http://instagram.com/${data.contactJson.instagram}`} target="_blank">
                    Instagram
                  </a>
                </div>
                {data.contactJson.facebook && 
                  <div style={{ flex: 1 }}>
                    <a href={`http://facebook.com/${data.contactJson.facebook} `} target="_blank">
                      Facebook
                    </a>
                  </div>
                }
                <p className="marginTop-4 bp-1_marginTop-0">@ BC–OA {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
};

export const query = graphql`
  query DefaultLayout {
    contactJson {
      address {
        street
        street2
        city
        state
        zip
      }
      phone
      email
      instagram
    }
    settingsJson {
      menuBackground
    }
  }
`;

TemplateWrapper.propTypes = {
  children: PropTypes.func
};