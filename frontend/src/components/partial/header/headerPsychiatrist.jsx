import React,{useEffect, Fragment, useState} from 'react'
import { Col, Nav, Row, Navbar, Button, Container } from 'react-bootstrap';

// widget
import Logo from '../../widgets/Logo';
import HorizontalNav from './HorizontalNav';
import ButtonBox from '../../widgets/ButtonBox';
import MegaMenu from './megaMenu';
import Sidebar from '../../widgets/Sidebar';
import LandingOffcanvasHeader from './offcanvas-header';


export default function HeaderPsychiatrist({ logoDynamic, IsMegaMenu }) {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
    <Fragment>
      <header className="header-center-home">
        <div className="top-header bg-dark d-none d-md-block">
          <Container fluid>
            <Row className="align-items-center">
              <Col md="6">
                <span className="text-primary fw-500">Working time<span className="text-white"> : Mon – Fri: 09:00AM – 5:00PM</span></span>
              </Col>
              <Col md="6" className="text-end">
              <span className="text-primary fw-500 font-size-14">Give Us a Call<span className="text-white"> : + 0800 24 66 721</span></span>
              </Col>
            </Row>
          </Container>
        </div>
        <Nav className={`nav navbar navbar-expand-xl navbar-light iq-navbar header-hover-menu py-xl-0 ${navbarClassName}`}>
            <div className="container-fluid navbar-inner">
                <div className="d-flex align-items-center justify-content-between w-100 landing-header">
                    <div className="d-flex gap-3 gap-xl-0 align-items-center">
                    <div className='d-xl-none'>
                                 <LandingOffcanvasHeader logoDynamic={logoDynamic}></LandingOffcanvasHeader>
                                </div>
                        {/* logo */}
                        <Logo logoDynamic={true} logoImage={logoDynamic} />
                                                    
                    </div>
                     {/* menu */}
                     {IsMegaMenu ? (
                          <MegaMenu />
                      ) : (
                          <HorizontalNav />   
                      )}
                    <div className="right-panel">
                    <Button id="navbar-toggle" bsPrefix="navbar-toggler" type="button" aria-expanded={show1} data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" onClick={() => setShow1(!show1)}
                                >
                                    <span className="navbar-toggler-btn">
                                        <span className="navbar-toggler-icon"></span>
                                    </span>
                                </Button>
                        <div className={`navbar-collapse ${show1 === true ? "collapse show" : "collapse"}`} id="navbarSupportedContent">
                            <ul className="navbar-nav align-items-center ms-auto mb-2 mb-xl-0">
                                <li className="button-primary">
                                    <ButtonBox buttonUrl="/appointment" buttonText="Get Appointment" />
                                </li>

                                <li className="ps-3">
                                    <Button variant="" onClick={handleShow} className="cursor-pointer p-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 28 22"
                                            fill="none">
                                            <path d="M0 0H24V2H0V0Z" fill="#171C26" />
                                            <path d="M4 10H28V12H4V10Z" fill="#171C26" />
                                            <path d="M0 20H24V22H0V20Z" fill="#171C26" />
                                        </svg>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Nav>
      </header>
      <Sidebar show={show} handleClose={handleClose} targetId="right-panel-toggle" logoDynamic={logoDynamic} />
    </Fragment>
  )
}
