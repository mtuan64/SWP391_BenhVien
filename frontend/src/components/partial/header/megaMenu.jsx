import React, { useState } from 'react'
import { Button, Container, Nav, Collapse } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

//Router
import { Link, useLocation } from 'react-router-dom';

// widget
import Logo from '../../widgets/Logo'

// routers
import { IndexRouter } from '../../../router/indexRouter';

// images
import home1 from '/assets/images/mega/home-01.webp'
import home2 from '/assets/images/mega/home-02.webp'
import home3 from '/assets/images/mega/home-03.webp'
import home4 from '/assets/images/mega/home-04.webp'
import home5 from '/assets/images/mega/home-05.webp'
import home6 from '/assets/images/mega/home-06.webp'
import home7 from '/assets/images/mega/home-07.webp'
import home8 from '/assets/images/mega/home-08.webp'
import home9 from '/assets/images/mega/home-09.webp'
import home10 from '/assets/images/mega/home-10.webp'
import home11 from '/assets/images/mega/home-11.webp'
import home12 from '/assets/images/mega/home-12.webp'

export default function MegaMenu() {

    let location = useLocation();
    //optimized code 
    const route = IndexRouter.slice(0)
        .flatMap(element => element.children.map(child => ({ element, child }))).find(({ element, child }) => {
            const path = element.path === "" ? `${child.path}` : `${child.path}`;
            return path === location.pathname;
        });

    // active link
    const ActiveLink = route ? route.child.Activelink : undefined

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
    return (
        <Nav id="navbar_main" className="mobile-offcanvas nav navbar navbar-expand-xl hover-nav horizontal-nav mega-menu-content py-xl-0">
            <Container fluid className="p-lg-0">
                <div className="offcanvas-header px-0">
                    <Logo />
                    <Button className="btn-close float-end px-3"></Button>
                </div>
                <ul id="header-men" className="navbar-nav iq-nav-menu list-unstyled">
                    <Nav.Item as="li">
                        <Nav.Link className={`${ActiveLink == 'dentist' || 'home' || 'eye-care' || 'skin-specialist' || 'fertility-clinic' || 'ent-clinic' || 'product-home' || 'psychiatrist' || 'paediatrician' || 'cardiac' || 'laboratory' ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-controls="homePages" aria-expanded={open} role="button" >
                            <span className="item-name">Home</span>{" "}
                            <span className="menu-icon">
                            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor"></path>
                                         </svg>
                            </span>
                        </Nav.Link>
                        <Collapse in={open}>
                            <ul className="sub-nav mega-menu-item collapse list-unstyled" id="homePages">
                                <Nav.Item as="li" className="nav-item">
                                    <Link className={`${ActiveLink === 'home' ? 'active' : ''} nav-link `} to="/">
                                        <Image src={home1} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">general doctor</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'dentist' ? 'active' : ''} nav-link `} to="/dentist">
                                        <Image src={home2} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">dentist</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'eye-care' ? 'active' : ''} nav-link `} to="/eye-care">
                                        <Image src={home3} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">eye care</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'skin-specialist' ? 'active' : ''} nav-link `} to="/skin-specialist">
                                        <Image src={home4} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">skin specialist</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'fertility-clinic' ? 'active' : ''} nav-link `} to="/fertility-clinic">
                                        <Image src={home5} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Fertility Clinic</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'ent-clinic' ? 'active' : ''} nav-link `} to="/ent-clinic">
                                        <Image src={home6} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">ENT Clinic</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'product-home' ? 'active' : ''} nav-link `} to="/product-home">
                                        <Image src={home7} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Product Home</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'psychiatrist' ? 'active' : ''} nav-link `} to="/psychiatrist">
                                        <Image src={home8} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Psychiatrist</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'paediatrician' ? 'active' : ''} nav-link `} to="/paediatrician">
                                        <Image src={home9} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Paediatrician</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'cardiac' ? 'active' : ''} nav-link `} to="/cardiac">
                                        <Image src={home10} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Cardiac</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'orthopedics' ? 'active' : ''} nav-link `} to="/orthopedics">
                                        <Image src={home11} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Orthopedics</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${ActiveLink === 'laboratory' ? 'active' : ''} nav-link `} to="/laboratory">
                                        <Image src={home12} alt="img" className="img-fluid d-xl-block d-none" />
                                        <span className="d-inline-block mt-0 mt-xl-3">Laboratory</span>
                                    </Link>
                                </Nav.Item>
                            </ul>
                        </Collapse>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link onClick={() => setOpen1(!open1)} aria-controls="allPages" aria-expanded={open1} role="button" >
                            <span className="item-name">Pages</span>{" "}
                            <span className="menu-icon">
                               <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor"></path>
                                         </svg>
                            </span>
                        </Nav.Link>
                        <Collapse in={open1}>
                            <ul className="sub-nav collapse  list-unstyled" id="allPages">
                                <Nav.Item as="li" className="nav-item">
                                    <Nav.Link onClick={() => setOpen2(!open2)} aria-controls="docPages" aria-expanded={open2} role="button" >
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
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen3(!open3)} aria-controls="pageServices" aria-expanded={open3} role="button" >
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
                                                <Link className={`${location.pathname === '/service1' ? 'active' : ''} nav-link `} to="service/service1"> service 1</Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/service2' ? 'active' : ''} nav-link `} to="service/service2"> service 2 </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/client' ? 'active' : ''} nav-link `} to="/client"> client </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen4(!open4)} aria-controls="pricingPlan" aria-expanded={open4} role="button" >
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
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/pricing-plan-two' ? 'active' : ''} nav-link `} to="/pricing-plan-two"> Pricing plan 2 </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/faq' ? 'active' : ''} nav-link `} to="/faq"> faq </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/not-found' ? 'active' : ''} nav-link `} to="/not-found"> 404 </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/contact-us' ? 'active' : ''} nav-link `} to="/contact-us"> contact us </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/coming-soon' ? 'active' : ''} nav-link `} to="/coming-soon"> coming soon </Link>
                                </Nav.Item>
                            </ul>
                        </Collapse>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link onClick={() => setOpen5(!open5)} aria-controls="specializationPages" aria-expanded={open5} role="button" >
                            <span className="item-name">Specialization</span>{" "}
                            <span className="menu-icon">
                            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor"></path>
                                         </svg>
                            </span>
                        </Nav.Link>
                        <Collapse in={open5}>
                            <ul className="sub-nav collapse  list-unstyled" id="specializationPages">
                                <Nav.Item as="li" className="nav-item">
                                    <Link className={`${location.pathname === '/oncologist' ? 'active' : ''} nav-link `} to="service/oncologist"> oncologist </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/neurologist' ? 'active' : ''} nav-link `} to="service/neurologist"> neurologist </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/entspecialist' ? 'active' : ''} nav-link `} to="service/entspecialist"> ent specialist </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/cardiologist' ? 'active' : ''} nav-link `} to="service/cardiologist"> cardiologist </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/audiologist' ? 'active' : ''} nav-link `} to="service/audiologist"> audiologist </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/psychiatrists' ? 'active' : ''} nav-link `} to="service/psychiatrists"> psychiatrists </Link>
                                </Nav.Item>
                            </ul>
                        </Collapse>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link onClick={() => setOpen6(!open6)} aria-controls="blogPage" aria-expanded={open6} role="button" >
                            <span className="item-name">Blog</span>{" "}
                            <span className="menu-icon">
                            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor"></path>
                                         </svg>
                            </span>
                        </Nav.Link>
                        <Collapse in={open6}>
                            <ul className="sub-nav collapse  list-unstyled" id="blogPage">
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/blog-lists' ? 'active' : ''} nav-link `} to="blog/blog-lists">  Blog Listing </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/blog-masonry' ? 'active' : ''} nav-link `} to="blog/blog-masonry"> blog masonry </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen7(!open7)} aria-controls="pageServices" aria-expanded={open7} role="button" >
                                        <span className="item-name">Blog Grid</span>
                                        <span className="menu-icon">
                                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </span>
                                    </Nav.Link>
                                    <Collapse in={open7}>
                                        <ul className="sub-nav collapse  list-unstyled" id="pageServices">
                                            <Nav.Item as="li" className="nav-item">
                                                <Link className={`${location.pathname === '/blog-two-column' ? 'active' : ''} nav-link `} to="blog/blog-two-column"> two column blog</Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-three-column' ? 'active' : ''} nav-link `} to="blog/blog-three-column"> three column blog </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-three-columnF-fullwidth' ? 'active' : ''} nav-link `} to="blog/blog-three-columnF-fullwidth"> three column full width blog </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-four-column' ? 'active' : ''} nav-link `} to="blog/blog-four-column"> four column blog </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen8(!open8)} aria-controls="blogSidebar" aria-expanded={open8} role="button" >
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
                                                <Link className={`${location.pathname === '/leftsidebar-grid-one' ? 'active' : ''} nav-link `} to="blog/leftsidebar-grid-one">left sidebar grid-1 </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/leftsidebar-grid-two' ? 'active' : ''} nav-link `} to="blog/leftsidebar-grid-two">left sidebar grid-2 </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/rightsidebar-grid-one' ? 'active' : ''} nav-link `} to="blog/rightsidebar-grid-one"> Right sidebar grid-1 </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/rightsidebar-grid-two' ? 'active' : ''} nav-link `} to="blog/rightsidebar-grid-two"> Right sidebar grid-2 </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen9(!open9)} aria-controls="blogSingle" aria-expanded={open9} role="button" >
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
                                                <Link className={`${location.pathname === '/blog-standard' ? 'active' : ''} nav-link `} to="blog/blog-standard">blog standard </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-video' ? 'active' : ''} nav-link `} to="blog/blog-video">blog video </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-gallary' ? 'active' : ''} nav-link `} to="blog/blog-gallary"> blog gallary </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-audio' ? 'active' : ''} nav-link `} to="blog/blog-audio"> blog audio </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-link' ? 'active' : ''} nav-link `} to="blog/blog-link"> blog link </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/blog-quote' ? 'active' : ''} nav-link `} to="blog/blog-quote"> blog quote </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                            </ul>
                        </Collapse>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link onClick={() => setOpen10(!open10)} aria-controls="shopPage" aria-expanded={open10} role="button" >
                            <span className="item-name">Shop</span>{" "}
                            <span className="menu-icon">
                            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V4H7.5C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H3.5V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="currentColor"></path>
                                         </svg>
                            </span>
                        </Nav.Link>
                        <Collapse in={open10}>
                            <ul className="sub-nav collapse  list-unstyled" id="shopPage">
                                <Nav.Item as="li">
                                    <Link className={`${location.pathname === '/shop' ? 'active' : ''} nav-link `} to="shop/shop"> Shop </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen11(!open11)} aria-controls="productSidebar" aria-expanded={open11} role="button" >
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
                                                <Link className={`${location.pathname === '/shop-left-sidebar' ? 'active' : ''} nav-link `} to="shop/shop-left-sidebar"> shop left sidebar </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/shop-right-sidebar' ? 'active' : ''} nav-link `} to="shop/shop-right-sidebar"> shop right sidebar </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/shop-no-sidebar' ? 'active' : ''} nav-link `} to="shop/shop-no-sidebar"> shop no sidebar </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen12(!open12)} aria-controls="sPages" aria-expanded={open12} role="button" >
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
                                                <Link className={`${location.pathname === '/cart' ? 'active' : ''} nav-link `} to="shop/cart">cart </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/checkout' ? 'active' : ''} nav-link `} to="shop/checkout">checkout </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/wishlist' ? 'active' : ''} nav-link `} to="shop/wishlist"> wishlist </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/my-account' ? 'active' : ''} nav-link `} to="shop/my-account"> my account </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/track-order' ? 'active' : ''} nav-link `} to="shop/track-order"> track order </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link onClick={() => setOpen9(!open13)} aria-controls="proType" aria-expanded={open13} role="button" >
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
                                                <Link className={`${location.pathname === '/product-standard' ? 'active' : ''} nav-link `} to="shop/product-standard">product standard </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/product-new' ? 'active' : ''} nav-link `} to="shop/product-new">product new </Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/product-sale' ? 'active' : ''} nav-link `} to="shop/product-sale"> product sale </Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                            </ul>
                        </Collapse>
                    </Nav.Item>
                </ul>
            </Container>
        </Nav>
    )
}
