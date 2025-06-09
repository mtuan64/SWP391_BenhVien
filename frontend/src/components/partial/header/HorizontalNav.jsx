import React, { memo, Fragment, useState } from 'react'
import { Button, Container, Nav, Collapse } from 'react-bootstrap';

//Router
import { Link } from 'react-router-dom';

// widget
import Logo from '../../widgets/Logo';
import { useLocation } from 'react-router-dom/dist';

const HorizontalNav = memo((props) => {
    // collapse
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [open8, setOpen8] = useState(false);
    const [open9, setOpen9] = useState(false);
    const [open10, setOpen10] = useState(false);
    const [open11, setOpen11] = useState(false);
    const [open12, setOpen12] = useState(false);
    const [open13, setOpen13] = useState(false);

    // Use uselocation
    let location = useLocation();

    return (
        <Fragment>
            <Nav className="mobile-offcanvas nav navbar navbar-expand-xl hover-nav horizontal-nav py-xl-0">
                <Container fluid className="p-lg-0">
                    <div className="offcanvas-header px-0">
                        <div className="navbar-brand ms-3">
                            <Logo />
                        </div>
                        <Button className="btn-close float-end px-3"></Button>
                    </div>
                    <ul className="navbar-nav iq-nav-menu list-unstyled">
                        <Nav.Item as="li">
                            <Nav.Link onClick={() => setOpen(!open)} aria-controls="homePages" aria-expanded={open} role="button" >
                                <span className="item-name">Home</span>{" "}
                                <span className="menu-icon">
                                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </Nav.Link>
                            <Collapse in={open}>
                                <ul className="sub-nav collapse  list-unstyled" id="homePages">
                                    <Nav.Item as="li" className="nav-item">
                                        <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} to="/"> general doctor</Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/dentist' ? 'active' : ''} nav-link `} to="/dentist"> dentist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/eye-care' ? 'active' : ''} nav-link `} to="/eye-care"> eye care </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/skin-specialist' ? 'active' : ''} nav-link `} to="/skin-specialist"> skin specialist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/fertility-clinic' ? 'active' : ''} nav-link `} to="/fertility-clinic"> Fertility Clinic </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/ent-clinic' ? 'active' : ''} nav-link `} to="/ent-clinic"> ENT Clinic </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/product-home' ? 'active' : ''} nav-link `} to="/product-home"> Product Home </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/psychiatrist' ? 'active' : ''} nav-link `} to="/psychiatrist"> Psychiatrist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/paediatrician' ? 'active' : ''} nav-link `} to="/paediatrician"> Paediatrician </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/cardiac' ? 'active' : ''} nav-link `} to="/cardiac"> Cardiac </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/orthopedics' ? 'active' : ''} nav-link `} to="/orthopedics"> Orthopedics </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/laboratory' ? 'active' : ''} nav-link `} to="/laboratory"> Laboratory </Link>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link onClick={() => setOpen1(!open1)} aria-controls="allPages" aria-expanded={open1} role="button" className={`${location.pathname === "/tab-two-column" || location.pathname === '/tab-three-column' || location.pathname === '/doctor-details' || location.pathname === '/service/service1' || location.pathname === '/service/service2' || location.pathname === '/about-us' || location.pathname === '/client-page' || location.pathname === '/pricing-plan-one' || location.pathname === '/pricing-plan-two' || location.pathname === '/faq-page' || location.pathname === '/contact-us' ? 'active' : ''}`}>
                                <span className="item-name">Pages</span>{" "}
                                <span className="menu-icon">
                                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </Nav.Link>
                            <Collapse in={open1}>
                                <ul className="sub-nav collapse  list-unstyled" id="allPages">
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link onClick={() => setOpen2(!open2)} aria-controls="docPages" aria-expanded={open2} role="button" className={`item-name ${location.pathname === '/tab-two-column' || location.pathname === '/tab-three-column' || location.pathname === '/doctor-details' ? 'active' : ''}`}>
                                            <span className="item-name">Doctors</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                            
                                        </Nav.Link>
                                        <Collapse in={open2}>
                                            <ul className="sub-nav collapse  list-unstyled" id="docPages">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/tab-two-column' ? 'active' : ''} nav-link `} to="/tab-two-column"> tab two column</Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/tab-three-column' ? 'active' : ''} nav-link `} to="/tab-three-column"> tab three column </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/doctor-details' ? 'active' : ''} nav-link `} to="/doctor-details"> doctor details </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/about-us' ? 'active' : ''} nav-link `} to="/about-us"> about-us </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Nav.Link onClick={() => setOpen3(!open3)} aria-controls="pageServices" aria-expanded={open3} role="button" className={`item-name ${location.pathname === '/service/service1' || location.pathname === '/service/service2' ? 'active' : ""}`}>
                                            <span className="item-name">Service</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open3}>
                                            <ul className="sub-nav collapse  list-unstyled" id="pageServices">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/service/service1' ? 'active' : ''} nav-link `} to="service/service1"> service 1</Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/service/service2' ? 'active' : ''} nav-link `} to="service/service2"> service 2 </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/client-page' ? 'active' : ''} nav-link `} to="/client-page"> client </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen4(!open4)} aria-controls="pricingPlan" aria-expanded={open4} role="button" className={`item-name ${location.pathname === '/pricing-plan-one' || location.pathname === '/pricing-plan-two' ? 'active' : ""}`}>
                                            <span className="item-name">Pricing Plan</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open4}>
                                            <ul className="sub-nav collapse  list-unstyled" id="pricingPlan">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/pricing-plan-one' ? 'active' : ''} nav-link `} to="/pricing-plan-one"> Pricing plan 1</Link>
                                                </Nav.Item>
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/pricing-plan-two' ? 'active' : ''} nav-link `} to="/pricing-plan-two"> Pricing plan 2 </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Link className={`${location.pathname === '/faq-page' ? 'active' : ''} nav-link `} to="/faq-page"> faq </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Link className={`${location.pathname === '/not-found' ? 'active' : ''} nav-link `} to="/not-found"> 404 </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Link className={`${location.pathname === '/contact-us' ? 'active' : ''} nav-link `} to="/contact-us"> contact us </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                        <Link className={`${location.pathname === '/coming-soon' ? 'active' : ''} nav-link `} to="/coming-soon"> coming soon </Link>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link onClick={() => setOpen5(!open5)} aria-controls="specializationPages" aria-expanded={open5} role="button" className={`item-name ${location.pathname === "/service/neurologist" || location.pathname === "/service/oncologist" || location.pathname === "/service/entspecialist" || location.pathname === "/service/cardiologist" || location.pathname === "/service/audiologist" || location.pathname === "/service/psychiatrists" ? 'active' : ""}`}>
                                <span className="item-name">Specialization</span>{" "}
                                <span className="menu-icon">
                                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </Nav.Link>
                            <Collapse in={open5}>
                                <ul className="sub-nav collapse  list-unstyled" id="specializationPages">
                                    <Nav.Item as="li" className="nav-item">
                                        <Link className={`${location.pathname === '/service/oncologist' ? 'active' : ''} nav-link `} to="service/oncologist"> oncologist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/service/neurologist' ? 'active' : ''} nav-link `} to="service/neurologist"> neurologist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/service/entspecialist' ? 'active' : ''} nav-link `} to="service/entspecialist"> ent specialist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/service/cardiologist' ? 'active' : ''} nav-link `} to="service/cardiologist"> cardiologist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/service/audiologist' ? 'active' : ''} nav-link `} to="service/audiologist"> audiologist </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/service/psychiatrists' ? 'active' : ''} nav-link `} to="service/psychiatrists"> psychiatrists </Link>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link onClick={() => setOpen6(!open6)} aria-controls="blogPage" aria-expanded={open6} role="button" className={`${location.pathname === "/blog/blog-lists" || location.pathname === "/blog/blog-masonry" || location.pathname === "/blog/blog-two-column" || location.pathname === "/blog/blog-three-column" || location.pathname === "/blog/blog-three-column-fullwidth" || location.pathname === "/blog/blog-four-column" || location.pathname === "/blog/leftsidebar-grid-one" || location.pathname === "/blog/leftsidebar-grid-two" || location.pathname === "/blog/rightsidebar-grid-one" || location.pathname === "/blog/rightsidebar-grid-two" || location.pathname === "/blog/blog-standard" || location.pathname === "/blog/blog-video" || location.pathname === "/blog/blog-gallary" || location.pathname === "/blog/blog-audio" || location.pathname === "/blog/blog-link" || location.pathname === "/blog/blog-quote" ? "active" : ""}`} >
                                <span className="item-name">Blog</span>{" "}
                                <span className="menu-icon">
                                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </Nav.Link>
                            <Collapse in={open6}>
                                <ul className="sub-nav collapse  list-unstyled" id="blogPage">
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/blog/blog-lists' ? 'active' : ''} nav-link `} to="blog/blog-lists">  Blog Listing </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/blog/blog-masonry' ? 'active' : ''} nav-link `} to="blog/blog-masonry"> blog masonry </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen7(!open7)} aria-controls="pageServices" aria-expanded={open7} role="button" className={`${location.pathname === "/blog/blog-two-column" || location.pathname === "/blog/blog-three-column" || location.pathname === "/blog/blog-three-column-fullwidth" || location.pathname === "/blog/blog-four-column" ? "active" : ""}`}>
                                            <span className="item-name" >Blog Grid</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open7}>
                                            <ul className="sub-nav collapse  list-unstyled" id="pageServices">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/blog/blog-two-column' ? 'active' : ''} nav-link `} to="blog/blog-two-column"> two column blog</Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-three-column' ? 'active' : ''} nav-link `} to="blog/blog-three-column"> three column blog </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-three-column-fullwidth' ? 'active' : ''} nav-link `} to="blog/blog-three-column-fullwidth"> three column full width blog </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-four-column' ? 'active' : ''} nav-link `} to="blog/blog-four-column"> four column blog </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen8(!open8)} aria-controls="blogSidebar" aria-expanded={open8} role="button" className={`item-name ${location.pathname === "/blog/leftsidebar-grid-one" || location.pathname === "/blog/leftsidebar-grid-two" || location.pathname === "/blog/rightsidebar-grid-one" || location.pathname === "/blog/rightsidebar-grid-two" ? "active" : ""}`}>
                                            <span className="item-name">Blog Sidebar</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open8}>
                                            <ul className="sub-nav collapse  list-unstyled" id="blogSidebar">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/blog/leftsidebar-grid-one' ? 'active' : ''} nav-link `} to="blog/leftsidebar-grid-one">left sidebar grid-1 </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/leftsidebar-grid-two' ? 'active' : ''} nav-link `} to="blog/leftsidebar-grid-two">left sidebar grid-2 </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/rightsidebar-grid-one' ? 'active' : ''} nav-link `} to="blog/rightsidebar-grid-one"> Right sidebar grid-1 </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/rightsidebar-grid-two' ? 'active' : ''} nav-link `} to="blog/rightsidebar-grid-two"> Right sidebar grid-2 </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen9(!open9)} aria-controls="blogSingle" aria-expanded={open9} role="button" className={`item-name ${location.pathname === "/blog/blog-standard" || location.pathname === "/blog/blog-video" || location.pathname === "/blog/blog-gallary" || location.pathname === "/blog/blog-audio" || location.pathname === "/blog/blog-link" || location.pathname === "/blog/blog-quote" ? "active" : ""}`}>
                                            <span className="item-name">Blog Single</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open9}>
                                            <ul className="sub-nav collapse  list-unstyled" id="blogSingle">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/blog/blog-standard' ? 'active' : ''} nav-link `} to="blog/blog-standard">blog standard </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-video' ? 'active' : ''} nav-link `} to="blog/blog-video">blog video </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-gallary' ? 'active' : ''} nav-link `} to="blog/blog-gallary"> blog gallary </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-audio' ? 'active' : ''} nav-link `} to="blog/blog-audio"> blog audio </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-link' ? 'active' : ''} nav-link `} to="blog/blog-link"> blog link </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/blog/blog-quote' ? 'active' : ''} nav-link `} to="blog/blog-quote"> blog quote </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link onClick={() => setOpen10(!open10)} aria-controls="shopPage" aria-expanded={open10} role="button" className={`item-name ${location.pathname === "/shop/shop" || location.pathname === "/shop/shop-left-sidebar" || location.pathname === "/shop/shop-right-sidebar" || location.pathname === "/shop/shop-no-sidebar" || location.pathname === "/shop/cart" || location.pathname === "/shop/checkout" || location.pathname === "/shop/wishlist" || location.pathname === "/shop/my-account" || location.pathname === "/shop/track-order" || location.pathname === "/shop/product-standard" || location.pathname === "/shop/product-new" || location.pathname === "/shop/product-sale" ? "active" : ""}`}>
                                <span className="item-name">Shop</span>{" "}
                                <span className="menu-icon">
                                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </Nav.Link>
                            <Collapse in={open10}>
                                <ul className="sub-nav collapse  list-unstyled" id="shopPage">
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/shop/shop' ? 'active' : ''} nav-link `} to="/shop/shop"> Shop </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen11(!open11)} aria-controls="productSidebar" aria-expanded={open11} role="button" className={`item-name ${location.pathname === "/shop/shop-left-sidebar" || location.pathname === "/shop/shop-right-sidebar" || location.pathname === "/shop/shop-no-sidebar" ? "active" : ""}`}>
                                            <span className="item-name">Product Sidebar</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open11}>
                                            <ul className="sub-nav collapse  list-unstyled" id="productSidebar">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/shop/shop-left-sidebar' ? 'active' : ''} nav-link `} to="shop/shop-left-sidebar"> shop left sidebar </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/shop-right-sidebar' ? 'active' : ''} nav-link `} to="shop/shop-right-sidebar"> shop right sidebar </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/shop-no-sidebar' ? 'active' : ''} nav-link `} to="shop/shop-no-sidebar"> shop no sidebar </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen12(!open12)} aria-controls="sPages" aria-expanded={open12} role="button" className={`item-name ${location.pathname === "/shop/cart" || location.pathname === "/shop/checkout" || location.pathname === "/shop/wishlist" || location.pathname === "/shop/my-account" || location.pathname === "/shop/track-order" ? "active" : ""}`}>
                                            <span className="item-name">Shop Pages</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open12}>
                                            <ul className="sub-nav collapse  list-unstyled" id="sPages">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/shop/cart' ? 'active' : ''} nav-link `} to="shop/cart">cart </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/checkout' ? 'active' : ''} nav-link `} to="shop/checkout">checkout </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/wishlist' ? 'active' : ''} nav-link `} to="shop/wishlist"> wishlist </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/my-account' ? 'active' : ''} nav-link `} to="shop/my-account"> my account </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/track-order' ? 'active' : ''} nav-link `} to="shop/track-order"> track order </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link onClick={() => setOpen9(!open13)} aria-controls="proType" aria-expanded={open13} role="button" className={`item-name ${location.pathname === "/shop/product-standard" || location.pathname === "/shop/product-new" || location.pathname === "/shop/product-sale" ? "active" : ""}`}>
                                            <span className="item-name">Product Type</span>
                                            <span className="menu-icon">
                                                <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                        </Nav.Link>
                                        <Collapse in={open13}>
                                            <ul className="sub-nav collapse  list-unstyled" id="proType">
                                                <Nav.Item as="li" className="nav-item">
                                                    <Link className={`${location.pathname === '/shop/product-standard' ? 'active' : ''} nav-link `} to="shop/product-standard">product standard </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/product-new' ? 'active' : ''} nav-link `} to="shop/product-new">product new </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/shop/product-sale' ? 'active' : ''} nav-link `} to="shop/product-sale"> product sale </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                    </ul>
                </Container >
            </Nav >
        </Fragment >
    )
})

export default HorizontalNav;