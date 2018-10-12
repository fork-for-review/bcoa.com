import React, { Fragment } from 'react';
import Link from "gatsby-link";
import { icons } from "./Icons";

const Menu = ({ visible, menuBackground, toggleMenu, navHeight, handleMenuButtonClick }) => (
  <nav  className={`menu f-navigation ${visible ? 'visible' : ''}`}
        style={{ backgroundImage: `url("${menuBackground}")`, height: `${navHeight}px` }}
  >
    <ul className="c-white">
      <li>
        <Link to="/#featured" onClick={(e) => handleMenuButtonClick(e, '/#featured')}>Featured</Link>
      </li>
      <li>
        <Link to="/work" onClick={(e) => handleMenuButtonClick(e, '/work')}>Index</Link>
      </li>
      <li>
        <Link to="/news" onClick={(e) => handleMenuButtonClick(e, '/news')}>News</Link>
      </li>
      <li>
        <Link to="/about" onClick={(e) => handleMenuButtonClick(e, '/about')}>About</Link>
      </li>
      <li>
        <Link to="/contact" onClick={(e) => handleMenuButtonClick(e, '/contact')}>Contact</Link>
      </li>
    </ul>
  </nav>
);

const headerLogoClick = (visible, toggleMenu) => {
  if (visible) { toggleMenu() };
}

export default ({ visible, toggleMenu, isWindowLarge, menuBackground, navHeight, handleMenuButtonClick }) => {
  const headerLogo = (isWindowLarge === undefined) ? "" : isWindowLarge ? icons.menuLogoLarge : icons.menuLogoSmall
  return (
    <div>
      <header className={visible ? 'c-white bg-transparent' : ''}>
        <div className="container">
          <div className="flex-1">
            <Link className="headerLogo" onClick={ () => headerLogoClick(visible, toggleMenu) } to="/">{headerLogo}</Link>
          </div>
          <div className={`header-menuButton ${visible ? 'isActive' : ''}`} onClick={toggleMenu}>
            <div className="line lineExterior"></div>
            <div className="line lineInterior lineInterior-1"></div>
            <div className="line lineInterior lineInterior-2"></div>
            <div className="line lineExterior"></div>
          </div>
        </div>
      </header>
      <Menu visible={visible} menuBackground={menuBackground} toggleMenu={toggleMenu} navHeight={navHeight} handleMenuButtonClick={handleMenuButtonClick} />
    </div>
  )
}