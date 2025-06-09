
import React, { memo, useState, useEffect } from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// widget
import Logo from '../../widgets/Logo';
import HorizontalNav from './HorizontalNav';
import ButtonBox from '../../widgets/ButtonBox';
import MegaMenu from './megaMenu';
import SocialMedia from '../../widgets/SocialMedia';
import LandingOffcanvasHeader from './offcanvas-header';

const HeaderEyecare = memo(({logoDynamic,IsMegaMenu}) => {
  const [isNavbarFixed, setNavbarFixed] = useState(false);
    const handleScroll = () => {
        const scroll = window.scrollY;
    
        if (scroll >= 100) {
          setNavbarFixed(true);
        } else {
          setNavbarFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    const navbarClassName = `iq-navbar ${isNavbarFixed ? 'fixed' : ''}`;
  return (
    <header className="header-eyecare header-center">
      <div className="top-header bg-primary-subtle d-none d-md-block">
        <Container fluid>
          <Row className="align-items-center">
            <Col md="6">
              <SocialMedia />
            </Col>
            <Col md="6">
                <ul className="top-header-left list-inline d-flex align-items-center justify-content-end gap-3 m-0">
                      <li className="text-body">
                          <a className="text-body" href="tel:480-555-0103">
                              <svg className="icon-18 text-primary me-1" width="32" viewBox="0 0 24 24" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd"
                                      d="M11.5317 12.4724C15.5208 16.4604 16.4258 11.8467 18.9656 14.3848C21.4143 16.8328 22.8216 17.3232 19.7192 20.4247C19.3306 20.737 16.8616 24.4943 8.1846 15.8197C-0.493478 7.144 3.26158 4.67244 3.57397 4.28395C6.68387 1.17385 7.16586 2.58938 9.61449 5.03733C12.1544 7.5765 7.54266 8.48441 11.5317 12.4724Z"
                                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                              </svg>+ (480) 555-0103
                          </a>
                      </li>
                      <li className="text-body">
                          <svg className="icon-18 text-primary me-1" width="32" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                  d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                              <path fillRule="evenodd" clipRule="evenodd"
                                  d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                          </svg>
                          1234 North Avenue Luke Lane
                      </li>
                  </ul>
            </Col>
          </Row>
        </Container>
      </div>  
      <Nav className={`nav navbar navbar-expand-xl navbar-light iq-navbar header-hover-menu py-xl-0 ${navbarClassName}`}>
          <Container fluid className="navbar-inner">
              <div className="d-flex align-items-center justify-content-between w-100 landing-header">
                  <div className="d-flex gap-3 gap-xl-0 align-items-center">
                      <div className='d-xl-none'>
                        <LandingOffcanvasHeader logoDynamic={logoDynamic} />
                      </div>
                      <Logo logoDynamic={true} logoImage={logoDynamic} />
                    </div>   

                    {/* menu */}
                    {IsMegaMenu ? (
                        <MegaMenu />
                    ) : (
                        <HorizontalNav />   
                    )}                               
                  
                  <div className="right-panel">
                    <div className="button-primary">
                      <ButtonBox buttonUrl="/appointment" buttonText="Appointment" />
                    </div>                      
                  </div>
              </div>
          </Container>
      </Nav>    
    </header>
  )
})

export default HeaderEyecare;
