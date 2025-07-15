import React from 'react';

const Header = ({ data }) => {
   if (!data) return null;

   const { name, occupation, description, address, social } = data;
   const country = address?.country;
   
   const networks = social?.map((network) => (
      <li key={network.name}>
         <a target="_blank" rel="noopener noreferrer" href={network.url}>
            <i className={network.className}></i>
         </a>
      </li>
   ));

   return (
      <header id="home">
         <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

            <ul id="nav" className="nav">
               <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
               <li><a className="smoothscroll" href="#about">About</a></li>
               <li><a className="smoothscroll" href="#resume">Resume</a></li>
               <li><a className="smoothscroll" href="#portfolio">Works</a></li>
               <li><a className="smoothscroll" href="#contact">Contact</a></li>
            </ul>
         </nav>

         <div className="row banner">
            <div className="banner-text">
               <h1 className="responsive-headline">I'm {name}.</h1>
               <h3>I'm a {country} based <span>{occupation}</span></h3>
               <hr />
               <ul className="social">
                  {networks}
               </ul>
            </div>
         </div>

         <p className="scrolldown">
            <a className="smoothscroll" href="#about">
               <i className="icon-down-circle"></i>
            </a>
         </p>
      </header>
   );
};

export default Header;
