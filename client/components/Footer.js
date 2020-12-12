import React from 'react';
// import { GiFlowerPot } from 'react-icons/gi';
import { animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';

// import {
//   FooterContainer,
//   FooterLink,
//   FooterLinkItems,
//   FooterLinksContainer,
//   FooterLinksWrapper,
//   FooterLinkTitle,
//   FooterWrap,
//   SocialIconLink,
//   SocialIcons,
//   SocialMediaWrap,
//   SocialMedia,
//   SocialLogo,
//   WebsiteRights,
//   FooterLinkP,
// } from './FooterElements';

const toggleHome = () => {
  scroll.scrollToTop();
};

const Footer = () => {
  return (
    <div id="footerContainer">
      <div id="FooterWrap">
        <div id="FooterLinksContainer">
          <div id="FooterLinksWrapper">
            <div className="FooterLinkItems" id="about-us">
              <h1>About Us</h1>
              <Link id="FooterLink" to="/">Company Info</Link>
              <Link id="FooterLink" to="/">Testimonials</Link>
            </div>
            <div className="FooterLinkItems"  id="contact-us">
              <h1>Contact Us</h1>
              <div id="contactUsText">
                100 Broadway,
                <br></br>New York, NY 10019
                <br></br>
                <a href= "mailto:hello@fullstackacademy.com" id="contactUsFooterLink">hello@fullstackacademy.com</a>
              </div>
            </div>
            <div className="FooterLinkItems">
              <h1>Follow Us</h1>
              <section id="SocialMedia">
                <div id="SocialIcons">
                  <a id="SocialIconLink"
                    href="//www.facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <FaFacebookSquare />
                  </a>
                  <a id="SocialIconLink"
                    href="//www.twitter.com"
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <FaTwitterSquare />
                  </a>
                  <a id="SocialIconLink"
                    href="//www.instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <FaInstagramSquare />
                  </a>
                  <a id="SocialIconLink"
                    href="//www.youtube.com"
                    target="_blank"
                    aria-label="Youtube"
                  >
                    <FaYoutubeSquare />
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div id="SocialMediaWrap">
          <Link id="SocialLogo" to="/" onClick={toggleHome}>
            {/* <GiFlowerPot /> */}
            WoofMates
          </Link>

          <small id="WebsiteRights">
            Designed by <i>Fullstack</i> Copyright &copy;
            {new Date().getFullYear()} WoofMates. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
