import React,{useEffect, memo, Fragment, useState} from 'react'

//React-bootstrap
import { Navbar, Container, Nav, Collapse, Button, Dropdown, Form, Card } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//Router
import { Link } from 'react-router-dom';

//Componets
import Logo from '../widget/logo';
import CustomToggle from '../bootstrap/dropdowns';

//img
import img1 from "/assets/images/shapes/01.png"
import img2 from "/assets/images/shapes/02.png"
import img3 from "/assets/images/shapes/03.png"
import img4 from "/assets/images/shapes/04.png"
import avatars1 from "/assets/images/avatars/14.png"

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'

import RadioBtn from '../setting/elements/radio-btn'

const Header = memo((props) => {
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
    const [show1, setShow1] = useState(false);
    const navbarHide = useSelector(SettingSelector.navbar_show); // array
    const themeFontSize = useSelector(SettingSelector.theme_font_size)
    const headerNavbar = useSelector(SettingSelector.header_navbar)
    useEffect(() => {
        if (headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass') {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add('menu-sticky')
                } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                }
            }
        }

        //offcanvase code
        const result = window.matchMedia("(max-width: 1200px)");
        window.addEventListener('resize',
            () => {
                if (result.matches === true) {
                    if (show1 === true) {
                        document.documentElement.style.setProperty('overflow', 'hidden');
                    }
                    else {
                        document.documentElement.style.removeProperty('overflow')
                    }

                }
                else {
                    document.documentElement.style.removeProperty('overflow')
                }

            }
        )
        if (window.innerWidth <= '1200') {
            if (show1 === true) {
                document.documentElement.style.setProperty('overflow', 'hidden');
            }
            else {
                document.documentElement.style.removeProperty('overflow')
            }

        }
        else {
            document.documentElement.style.removeProperty('overflow')
        }

    })
    document.getElementsByTagName('html')[0].classList.add(themeFontSize)
  

   //fullscreen
   const fullscreen = () => {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    }

    const minisidebar =() =>{
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }


  return (
    <Fragment>
        <Navbar
            expand = "xl"
            variant = "light"
            className= {`nav iq-navbar header-hover-menu left-border ${headerNavbar} ${navbarHide.join(" ")}`}
        >
            <Container fluid className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <Logo />
                </Link>

                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon d-flex">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </i>
                </div>

                <div className="d-flex align-items-center justify-content-between product-offcanvas">
                    <div className="offcanvas offcanvas-end shadow-none iq-product-menu-responsive" tabIndex="-1"
                        id="offcanvasBottomNav">
                        <div className="offcanvas-body">
                            <ul className="iq-nav-menu list-unstyled">
                                <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow justify-content-start" onClick={() => setOpen(!open)} aria-controls="homeData" aria-expanded={open} role="button" >
                                        <span className="nav-text">Home</span>
                                    </Nav.Link>
                                    <Collapse in={open}>
                                        <ul className="iq-header-sub-menu list-unstyled " id="homeData">
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} to="/">Admin Dashboard</Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/patient-dashboard' ? 'active' : ''} nav-link `} to="/patient-dashboard">Patient Dashboard</Link>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li" className="">
                                    <Nav.Link className="menu-arrow justify-content-start" onClick={() => setOpen1(!open1)} aria-controls="allPagesData" aria-expanded={open} role="button" >
                                       <span className="nav-text">Pages</span>
                                    </Nav.Link>
                                    <Collapse in={open1}>
                                        <ul className="iq-header-sub-menu list-unstyled " id="allPagesData">
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/component' ? 'active' : ''} nav-link `} to="/component">Components</Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Link className={`${location.pathname === '/ui-color' ? 'active' : ''} nav-link `} to="/ui-color">UI Color</Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen2(!open2)} aria-controls="authSkins" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Auth skins </span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open2}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="authSkins">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/sign-in' ? 'active' : ''} nav-link `} to="auth/sign-in">Sign In</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/signup' ? 'active' : ''} nav-link `} to="/auth/sign-up">Sign Up</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/auth-confirm-mail' ? 'active' : ''} nav-link `} to="/auth/confirm-mail">Email Verified</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/auth-recoverpw' ? 'active' : ''} nav-link `} to="/auth/recoverpw">Reset Password</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/auth-lock-screen' ? 'active' : ''} nav-link `} to="/auth/lock-screen">Lock Screen</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen3(!open3)} aria-controls="userApps" aria-expanded={open} role="button" >
                                                    <span className="nav-text">User</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open3}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="userApps">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/user-profile' ? 'active' : ''} nav-link `} to="app/user-profile">User Profile</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/user-add' ? 'active' : ''} nav-link `} to="/app/user-add">User Add</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/user-list' ? 'active' : ''} nav-link `} to="/app/user-list">User List</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen4(!open4)} aria-controls="utilities" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Utilities</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open4}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="utilities">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/pages-maintenance' ? 'active' : ''} nav-link `} to="errors/maintenance">Maintenance</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/pages-error404' ? 'active' : ''} nav-link `} to="/errors/error404">404</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/pages-error500' ? 'active' : ''} nav-link `} to="/errors/error500">500</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen5(!open5)} aria-controls="widgetsPage" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Widgets</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open5}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="widgetsPage">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/widgetbasic' ? 'active' : ''} nav-link `} to="/widget/widgetbasic">Widget Basic</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/widgetchart' ? 'active' : ''} nav-link `} to="/widget/widgetchar">Widget Chart</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/widgetcard' ? 'active' : ''} nav-link `} to="/widget/widgetcard">Widget Card</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen6(!open6)} aria-controls="mapPages" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Map</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open6}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="mapPages">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/map-google' ? 'active' : ''} nav-link `} to="/maps/google">Google</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/map-vector' ? 'active' : ''} nav-link `} to="/maps/vector">Vector</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen7(!open7)} aria-controls="formsPages" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Form</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open7}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="formsPages">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/form-layout' ? 'active' : ''} nav-link `} to="/form/form-element">Element</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/form-validation' ? 'active' : ''} nav-link `} to="/form/form-validation">Validation</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen8(!open8)} aria-controls="tablesPages" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Table</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open8}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="tablesPages">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/bootstrap-table' ? 'active' : ''} nav-link `} to="/table/bootstrap-table">Bootstrap Table</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/table-data' ? 'active' : ''} nav-link `} to="/table/table-data">Data Table</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/border-table' ? 'active' : ''} nav-link `} to="/table/border-table">Bordered Table</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/fancy-table' ? 'active' : ''} nav-link `} to="/table/fancy-table">Fancy Table</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/fixed-table' ? 'active' : ''} nav-link `} to="/table/fixed-table">Fixed Table</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow justify-content-between" onClick={() => setOpen9(!open9)} aria-controls="iconsPages" aria-expanded={open} role="button" >
                                                    <span className="nav-text">Icons</span>
                                                    <i className="right-icon">
                                                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open9}>
                                                    <ul className="iq-header-sub-menu list-unstyled " id="iconsPages">
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/solid-icon' ? 'active' : ''} nav-link `} to="/icons/solid">Solid</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/outline-icon' ? 'active' : ''} nav-link `} to="/icons/outline">Outlined</Link>
                                                        </Nav.Item>
                                                        <Nav.Item as="li">
                                                            <Link className={`${location.pathname === '/dual-tone-icon' ? 'active' : ''} nav-link `} to="/icons/dual-tone">Dual Tone</Link>
                                                        </Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                        </ul>
                                    </Collapse>
                                </Nav.Item>
                                <Nav.Item as="li" className="">
                                <Link className={`${location.pathname === '/setting' ? 'active' : ''} nav-link `} to="/setting">Setting</Link>
                                </Nav.Item>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <Navbar.Toggle  aria-controls="navbarSupportedContent"  type="button" className='px-0' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-btn">
                            <span className="navbar-toggler-icon"></span>
                        </span>
                    </Navbar.Toggle>
                </div>

                <Navbar.Collapse className="" id="navbarSupportedContent">
                    <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                        <li className="nav-item dropdown me-0 me-xl-3">
                            <div className="d-flex align-items-center mr-2 iq-font-style" role="group" aria-label="First group">
                            <RadioBtn btnName="theme_font_size" labelclassName=" border-0 btn-icon btn-sm" id="font-size-sm" defaultChecked={themeFontSize} value="theme-fs-sm" >
                                {[ 'bottom'].map((placement) => (
                                    <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            Font Size 14px
                                        </Tooltip>
                                    }
                                    >
                                    <span className="mb-0 h6" style={{ color: "inherit" }} >A</span>
                                    </OverlayTrigger>
                                ))}
                            </RadioBtn>

                                <RadioBtn btnName="theme_font_size" labelclassName="  border-0 btn-icon" id="theme-fs-md" defaultChecked={themeFontSize} value="theme-fs-md" >
                                    {[ 'bottom'].map((placement) => (
                                        <OverlayTrigger
                                        key={placement}
                                        placement={placement}
                                        overlay={
                                            <Tooltip id={`tooltip-${placement}`}>
                                            Font Size 16px
                                            </Tooltip>
                                        }
                                        >
                                        <span className="mb-0 h4" style={{ color: 'inherit' }}  >A</span>
                                        </OverlayTrigger>
                                    ))}
                                    
                                </RadioBtn>
                                <RadioBtn btnName="theme_font_size" labelclassName="  border-0 btn-icon" id="theme-fs-lg" defaultChecked={themeFontSize} value="theme-fs-lg" >
                                    {[ 'bottom'].map((placement) => (
                                            <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                Font Size 18px
                                                </Tooltip>
                                            }
                                            >
                                            <span className="mb-0 h1" style={{ color: 'inherit' }}  >A</span>
                                            </OverlayTrigger>
                                        ))}
                                    
                                </RadioBtn>
                            </div>
                        </li>
                        <Dropdown as="li" className="nav-item d-none d-xl-block pe-3">
                            <div className="form-group input-group mb-0 search-input">
                                <Form.Control type="text" placeholder="Search..." />
                                    <span className="input-group-text">
                                        <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></circle>
                                            <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </span>
                            </div>
                        </Dropdown>
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle
                            as={CustomToggle}
                            href="#"
                            className="nav-link"
                            variant=" nav-link"
                            id="notification-drop"
                            data-bs-toggle="dropdown"
                            >
                                <div className="nav-list-icon">
                                    <div className="btn-inner">
                                        <svg className="icon-20" width="19" height="22" viewBox="0 0 19 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <mask  maskUnits="userSpaceOnUse" x="0" y="0" width="19"
                                                height="18">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M9.15527e-05 0H18.497V17.348H9.15527e-05V0Z" fill="white" />
                                            </mask>
                                            <g>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M9.2471 1.5C5.75211 1.5 3.3161 4.238 3.3161 6.695C3.3161 8.774 2.7391 9.735 2.2291 10.583C1.8201 11.264 1.4971 11.802 1.4971 12.971C1.6641 14.857 2.90911 15.848 9.2471 15.848C15.5501 15.848 16.8341 14.813 17.0001 12.906C16.9971 11.802 16.6741 11.264 16.2651 10.583C15.7551 9.735 15.1781 8.774 15.1781 6.695C15.1781 4.238 12.7421 1.5 9.2471 1.5ZM9.2471 17.348C4.5711 17.348 0.345105 17.018 0.000104907 13.035C-0.00289509 11.387 0.500105 10.549 0.944105 9.811C1.3931 9.063 1.8161 8.358 1.8161 6.695C1.8161 3.462 4.8021 0 9.2471 0C13.6921 0 16.6781 3.462 16.6781 6.695C16.6781 8.358 17.1011 9.063 17.5501 9.811C17.9941 10.549 18.4971 11.387 18.4971 12.971C18.1481 17.018 13.9231 17.348 9.2471 17.348Z"
                                                    fill="currentColor" />
                                            </g>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M9.1983 21.5001H9.1963C8.0753 21.4991 7.0143 21.0051 6.2093 20.1081C5.9323 19.8011 5.9573 19.3261 6.2653 19.0501C6.5733 18.7721 7.0473 18.7971 7.3243 19.1061C7.8423 19.6831 8.5073 20.0001 9.1973 20.0001H9.1983C9.8913 20.0001 10.5593 19.6831 11.0783 19.1051C11.3563 18.7981 11.8303 18.7731 12.1373 19.0501C12.4453 19.3271 12.4703 19.8021 12.1933 20.1091C11.3853 21.0061 10.3223 21.5001 9.1983 21.5001Z"
                                                fill="currentColor" />
                                        </svg>
                                        <span className="bg-danger dots"></span>
                                    </div>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                            className="p-0 sub-drop dropdown-menu-end"
                            aria-labelledby="notification-drop"
                            >
                                <Card className="m-0 shadow-none">
                                    <Card.Header className="py-3 d-flex justify-content-between bg-primary mb-0">
                                        <div className="header-title">
                                            <h5 className="mb-0 text-white">All Notifications</h5>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Link to="#" className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img1}
                                                    alt=""
                                                    loading="lazy"
                                                />
                                                <div className="w-100 ms-3">
                                                    <h6 className="mb-0 text-start">Emma Watson Bni</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">95 MB</p>
                                                        <small className="float-end font-size-12">
                                                            Just Now
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                    </Link>
                                    <Link to="#" className="iq-sub-card">
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <img
                                                className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                src={img2}
                                                alt=""
                                                loading="lazy"
                                                />
                                            </div>
                                            <div className="w-100 ms-3">
                                                <h6 className="mb-0 text-start">New customer is join</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">Cyst Bni</p>
                                                    <small className="float-end font-size-12">
                                                        5 days ago
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className="iq-sub-card">
                                        <div className="d-flex align-items-center">
                                            <img
                                                className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                src={img3}
                                                alt=""
                                                loading="lazy"
                                            />
                                            <div className="w-100 ms-3">
                                                <h6 className="mb-0 text-start">Two customer is left</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">Cyst Bni</p>
                                                    <small className="float-end font-size-12">
                                                        2 days ago
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className="iq-sub-card">
                                        <div className="d-flex align-items-center">
                                            <img
                                                className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                src={img4}
                                                alt=""
                                                loading="lazy"
                                            />
                                            <div className="w-100 ms-3">
                                                <h6 className="mb-0 text-start">New Mail from Fenny</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">Cyst Bni</p>
                                                    <small className="float-end font-size-12">
                                                        3 days ago
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    </Card.Body>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle
                            as={CustomToggle}
                            href="#"
                            className="nav-link"
                            variant=" nav-link"
                            id="notification-cart"
                            data-bs-toggle="dropdown"
                            >
                                <div className="btn-action position-relative nav-list-icon">
                                    <span className="btn-inner">
                                        <svg className="cart-icons icon-20" xmlns="http://www.w3.org/2000/svg" width="18" height="17"
                                            viewBox="0 0 18 17" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M4.27385 4.95616L4.77635 10.9328C4.81302 11.3928 5.18885 11.7378 5.64802 11.7378H5.65135H14.7439H14.7455C15.1797 11.7378 15.5505 11.4145 15.6122 10.9853L16.4039 5.51949C16.4222 5.38949 16.3897 5.25949 16.3105 5.15449C16.2322 5.04866 16.1172 4.98033 15.9872 4.96199C15.813 4.96866 8.58552 4.95866 4.27385 4.95616ZM5.64631 12.9878C4.54881 12.9878 3.61964 12.1311 3.53047 11.0353L2.76714 1.95695L1.51131 1.74028C1.17048 1.68028 0.942975 1.35778 1.00131 1.01695C1.06131 0.676117 1.39047 0.45445 1.72381 0.507784L3.45714 0.807784C3.73631 0.85695 3.94881 1.08862 3.97297 1.37195L4.16881 3.70612C16.0655 3.71112 16.1038 3.71695 16.1613 3.72362C16.6255 3.79112 17.0338 4.03362 17.3121 4.40695C17.5905 4.77945 17.7071 5.23862 17.6405 5.69862L16.8496 11.1636C16.7005 12.2036 15.7971 12.9878 14.7471 12.9878H14.743H5.65297H5.64631Z"
                                                fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.4077 8.03638H11.0977C10.7518 8.03638 10.4727 7.75638 10.4727 7.41138C10.4727 7.06638 10.7518 6.78638 11.0977 6.78638H13.4077C13.7527 6.78638 14.0327 7.06638 14.0327 7.41138C14.0327 7.75638 13.7527 8.03638 13.4077 8.03638Z"
                                                fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M5.28815 15.2516C5.53898 15.2516 5.74148 15.4541 5.74148 15.7049C5.74148 15.9558 5.53898 16.1591 5.28815 16.1591C5.03648 16.1591 4.83398 15.9558 4.83398 15.7049C4.83398 15.4541 5.03648 15.2516 5.28815 15.2516Z"
                                                fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M5.28732 16.784C4.69232 16.784 4.20898 16.2998 4.20898 15.7048C4.20898 15.1098 4.69232 14.6265 5.28732 14.6265C5.88232 14.6265 6.36648 15.1098 6.36648 15.7048C6.36648 16.2998 5.88232 16.784 5.28732 16.784"
                                                fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M14.6877 16.784C14.0927 16.784 13.6094 16.2998 13.6094 15.7048C13.6094 15.1098 14.0927 14.6265 14.6877 14.6265C15.2835 14.6265 15.7677 15.1098 15.7677 15.7048C15.7677 16.2998 15.2835 16.784 14.6877 16.784"
                                                fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <span className="badge-notification">4</span>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                            className="p-0 sub-drop dropdown-menu-end"
                            aria-labelledby="notification-cart"
                            >
                                <Card className="m-0 shadow-none">
                                    <Card.Header className="py-3 mb-0 d-flex justify-content-between bg-primary">
                                        <div className="header-title">
                                            <h5 className="mb-0 text-white">All Carts</h5>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-0 max-17 scroll-thin">
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img1} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Biker’s Jacket</h6>
                                                    <p className="mb-0">$56.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img2} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Casual Shoes</h6>
                                                    <p className="mb-0">$34.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img3} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Knitted Shrug</h6>
                                                    <p className="mb-0">$60.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img4} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Blue Handbag</h6>
                                                    <p className="mb-0">$20.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img1} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Biker’s Jacket</h6>
                                                    <p className="mb-0">$55.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img2} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Casual Shoes</h6>
                                                    <p className="mb-0">$20.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img3} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Knitted Shrug</h6>
                                                    <p className="mb-0">$35.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <img className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                                                    src={img4} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1 text-start">
                                                    <h6 className="mb-0 ">Blue Handbag</h6>
                                                    <p className="mb-0">$35.00</p>
                                                </div>
                                                <button type="button" className="btn btn-icon text-danger btn-sm">
                                                    <span className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4"
                                                            d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                                                            fill="currentColor"></path>
                                                        <path
                                                            d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                                                            fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="p-0 text-center">
                                        <div className="d-grid">
                                            <Link to="/cart" className="btn btn-primary">View All
                                            </Link>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>                       
                        
                        <Nav.Item className="nav-item iq-full-screen d-none d-xl-block" onClick={() => setShow(!show)}>
                            <Nav.Link id="btnFullscreen" onClick={fullscreen}>
                                <div className="icon nav-list-icon" >
                                    <span className="btn-inner"  >
                                        <svg className="normal-screen icon-20" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5528 5.99656L13.8595 10.8961" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M14.8016 5.97618L18.5524 5.99629L18.5176 9.96906" stroke="currentColor"
                                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M5.8574 18.896L10.5507 13.9964" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M9.60852 18.9164L5.85775 18.8963L5.89258 14.9235" stroke="currentColor"
                                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <svg className="full-normal-screen d-none icon-20" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7542 10.1932L18.1867 5.79319" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M17.2976 10.212L13.7547 10.1934L13.7871 6.62518" stroke="currentColor"
                                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M10.4224 13.5726L5.82149 18.1398" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M6.74391 13.5535L10.4209 13.5723L10.3867 17.2755" stroke="currentColor"
                                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle
                            as={CustomToggle}
                            variant=" nav-link py-0 d-flex align-items-center"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >
                                <div className="btn-inner d-inline-block position-relative">
                                    <img
                                        src={avatars1}
                                        alt="User-Profile"
                                        className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                        loading="lazy"
                                    />
                                    <span className="bg-success p-1 rounded-circle position-absolute end-0 bottom-0 border border-3 border-white"></span>
                                </div>                            
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                            className="dropdown-menu-end"
                            aria-labelledby="navbarDropdown"
                            >
                            <Dropdown.Item href="/app/user-profile">
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/user-privacy-setting">
                                Privacy Setting
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/auth/sign-in">
                                Logout
                            </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </Fragment>
  )
})

export default Header;