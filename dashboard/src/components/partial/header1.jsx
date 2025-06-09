import React, { useState, memo, Fragment } from 'react'

//React-bootstrap
import { Navbar, Container, Nav, Collapse, Button, Dropdown, Form, Card, Modal, Tab, Row, Col, FormCheck } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//Router
import { Link } from 'react-router-dom';

//Componets
import Logo from '../widget/logo';
import CustomToggle from '../bootstrap/dropdowns';

//Flatpicker
import Flatpickr from "react-flatpickr";

//img
import img1 from "/assets/images/shapes/01.png"
import img2 from "/assets/images/shapes/02.png"
import img3 from "/assets/images/shapes/03.png"
import img4 from "/assets/images/shapes/04.png"
import avatars1 from "/assets/images/avatars/12.png"

import avatars2 from "/assets/images/user/amie-steward.png"



// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'

import RadioBtn from '../setting/elements/radio-btn'



const Header1 = () => {
    const themeFontSize = useSelector(SettingSelector.theme_font_size)
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
    //modal
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);


    // collapse
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    return (
        <Fragment>
            <Navbar
                expand="xl"
                variant="light"
                className="nav navbar navbar-expand-xl navbar-light iq-navbar">
                <Container fluid className="navbar-inner">
                    <Link to="/" className="navbar-brand me-5">
                        <Logo />
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true">
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
                                <ul className="iq-nav-menu list-unstyled gap-1">
                                    <Nav.Item as="li">
                                        <Nav.Link className="menu-arrow justify-content-start" onClick={() => setOpen(!open)} aria-controls="homeData" aria-expanded={open} role="button" >
                                            <i className="icon" data-bs-toggle="tooltip" title="Dashboard" data-bs-placement="right">
                                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4"
                                                        d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                                                        fill="currentColor"></path>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </i>
                                            <span className="nav-text ms-2">Dashboard</span>
                                        </Nav.Link>
                                        <Collapse in={open}>
                                            <ul className="iq-1-sub-menu list-unstyled " id="homeData">
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/patient-dashboard' ? 'active' : ''} nav-link `} to="/patient-dashboard">
                                                        <i className="icon" data-bs-toggle="tooltip" title="Dashboard" data-bs-placement="right">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.4"
                                                                    d="M2 4C2 2.89543 2.89543 2 4 2H9C10.1046 2 11 2.89543 11 4V20C11 21.1046 10.1046 22 9 22H4C2.89543 22 2 21.1046 2 20V4Z"
                                                                    fill="currentColor"></path>
                                                                <path
                                                                    d="M13 4C13 2.89543 13.8954 2 15 2H20C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H15C13.8954 11 13 10.1046 13 9V4Z"
                                                                    fill="currentColor"></path>
                                                                <path
                                                                    d="M13 15C13 13.8954 13.8954 13 15 13H20C21.1046 13 22 13.8954 22 15V20C22 21.1046 21.1046 22 20 22H15C13.8954 22 13 21.1046 13 20V15Z"
                                                                    fill="currentColor"></path>
                                                            </svg>
                                                        </i>
                                                        <span className="nav-text ms-2">Patient Dashboard</span>
                                                    </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} to="/">
                                                        <i className="icon" data-bs-toggle="tooltip" title="Dashboard" data-bs-placement="right">
                                                            <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
                                                                    fill="currentColor"></path>
                                                            </svg>
                                                        </i>
                                                        <span className="nav-text ms-2">Admin Dashboard</span>
                                                    </Link>
                                                </Nav.Item>

                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="">
                                        <Link className={`${location.pathname === '/patient-appointment' ? 'active' : ''} nav-link `} to="/patient-appointment">
                                            <i className="icon" data-bs-toggle="tooltip" title="Appointments" data-bs-placement="right">
                                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M3 16.87V9.25699H21V16.931C21 20.07 19.0241 22 15.8628 22H8.12733C4.99561 22 3 20.03 3 16.87ZM7.95938 14.41C7.50494 14.431 7.12953 14.07 7.10977 13.611C7.10977 13.151 7.46542 12.771 7.91987 12.75C8.36443 12.75 8.72997 13.101 8.73985 13.55C8.7596 14.011 8.40395 14.391 7.95938 14.41ZM12.0198 14.41C11.5653 14.431 11.1899 14.07 11.1701 13.611C11.1701 13.151 11.5258 12.771 11.9802 12.75C12.4248 12.75 12.7903 13.101 12.8002 13.55C12.82 14.011 12.4643 14.391 12.0198 14.41ZM16.0505 18.09C15.596 18.08 15.2305 17.7 15.2305 17.24C15.2206 16.78 15.5862 16.401 16.0406 16.391H16.0505C16.5148 16.391 16.8902 16.771 16.8902 17.24C16.8902 17.71 16.5148 18.09 16.0505 18.09ZM11.1701 17.24C11.1899 17.7 11.5653 18.061 12.0198 18.04C12.4643 18.021 12.82 17.641 12.8002 17.181C12.7903 16.731 12.4248 16.38 11.9802 16.38C11.5258 16.401 11.1701 16.78 11.1701 17.24ZM7.09989 17.24C7.11965 17.7 7.49506 18.061 7.94951 18.04C8.39407 18.021 8.74973 17.641 8.72997 17.181C8.72009 16.731 8.35456 16.38 7.90999 16.38C7.45554 16.401 7.09989 16.78 7.09989 17.24ZM15.2404 13.601C15.2404 13.141 15.596 12.771 16.0505 12.761C16.4951 12.761 16.8507 13.12 16.8705 13.561C16.8804 14.021 16.5247 14.401 16.0801 14.41C15.6257 14.42 15.2503 14.07 15.2404 13.611V13.601Z"
                                                        fill="currentColor" />
                                                    <path opacity="0.4"
                                                        d="M3.00336 9.2569C3.0162 8.6699 3.0656 7.5049 3.15846 7.1299C3.63267 5.0209 5.24298 3.6809 7.54485 3.4899H16.4559C18.738 3.6909 20.3681 5.0399 20.8423 7.1299C20.9342 7.4949 20.9836 8.6689 20.9964 9.2569H3.00336Z"
                                                        fill="currentColor" />
                                                    <path
                                                        d="M8.30486 6.59C8.73955 6.59 9.06556 6.261 9.06556 5.82V2.771C9.06556 2.33 8.73955 2 8.30486 2C7.87017 2 7.54416 2.33 7.54416 2.771V5.82C7.54416 6.261 7.87017 6.59 8.30486 6.59Z"
                                                        fill="currentColor" />
                                                    <path
                                                        d="M15.6949 6.59C16.1197 6.59 16.4556 6.261 16.4556 5.82V2.771C16.4556 2.33 16.1197 2 15.6949 2C15.2603 2 14.9342 2.33 14.9342 2.771V5.82C14.9342 6.261 15.2603 6.59 15.6949 6.59Z"
                                                        fill="currentColor" />
                                                </svg>
                                            </i>
                                            <span className="nav-text ms-2">Appointments</span>
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="">
                                        <Nav.Link className="menu-arrow justify-content-start" onClick={() => setOpen1(!open1)} aria-controls="allPagesData" aria-expanded={open} role="button" >
                                            <i className="icon" data-bs-toggle="tooltip" title="Pages" data-bs-placement="right">
                                                <svg className="icon-20" height="20" width="20" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4"
                                                        d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z"
                                                        fill="currentColor"></path>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </i>
                                            <span className="nav-text ms-2">Pages</span>
                                        </Nav.Link>
                                        <Collapse in={open1}>
                                            <ul className="iq-header-sub-menu list-unstyled " id="allPagesData">
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/patient-encounters' ? 'active' : ''} nav-link `} to="/patient-encounters">
                                                        <i className="icon" data-bs-toggle="tooltip" title="Encounters" data-bs-placement="right">
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4"
                                                                    d="M16.3125 6.60938C16.3125 11.25 9 15.1875 9 15.1875C9 15.1875 1.6875 11.25 1.6875 6.60938C1.6875 5.60238 2.08753 4.63663 2.79958 3.92458C3.51163 3.21253 4.47738 2.8125 5.48438 2.8125C7.07273 2.8125 8.43328 3.67805 9 5.0625C9.56672 3.67805 10.9273 2.8125 12.5156 2.8125C13.5226 2.8125 14.4884 3.21253 15.2004 3.92458C15.9125 4.63663 16.3125 5.60238 16.3125 6.60938Z"
                                                                    fill="currentColor" />
                                                                <path
                                                                    d="M5.0625 9.5625H2.25C2.10082 9.5625 1.95774 9.50324 1.85225 9.39775C1.74676 9.29226 1.6875 9.14918 1.6875 9C1.6875 8.85082 1.74676 8.70774 1.85225 8.60225C1.95774 8.49676 2.10082 8.4375 2.25 8.4375H4.76156L5.71922 7.00031C5.77057 6.92316 5.84018 6.85988 5.92188 6.81612C6.00357 6.77235 6.09482 6.74945 6.1875 6.74945C6.28018 6.74945 6.37143 6.77235 6.45312 6.81612C6.53482 6.85988 6.60443 6.92316 6.65578 7.00031L8.4375 9.67219L9.09422 8.68781C9.14563 8.61076 9.21527 8.54759 9.29696 8.50392C9.37866 8.46026 9.46987 8.43744 9.5625 8.4375H11.25C11.3992 8.4375 11.5423 8.49676 11.6477 8.60225C11.7532 8.70774 11.8125 8.85082 11.8125 9C11.8125 9.14918 11.7532 9.29226 11.6477 9.39775C11.5423 9.50324 11.3992 9.5625 11.25 9.5625H9.86344L8.90578 10.9997C8.85443 11.0768 8.78482 11.1401 8.70312 11.1839C8.62143 11.2276 8.53018 11.2505 8.4375 11.2505C8.34482 11.2505 8.25357 11.2276 8.17188 11.1839C8.09018 11.1401 8.02057 11.0768 7.96922 10.9997L6.1875 8.32641L5.53078 9.31078C5.47953 9.3881 5.40996 9.45154 5.32826 9.49546C5.24655 9.53937 5.15526 9.56241 5.0625 9.5625ZM12.5156 2.25C11.0637 2.25 9.79242 2.87437 9 3.92977C8.20758 2.87437 6.93633 2.25 5.48438 2.25C4.3286 2.2513 3.22053 2.71101 2.40327 3.52827C1.58601 4.34553 1.1263 5.4536 1.125 6.60938C1.125 6.66211 1.125 6.71484 1.125 6.76758C1.12966 6.91676 1.1934 7.05798 1.30218 7.16018C1.41097 7.26237 1.55589 7.31716 1.70508 7.3125C1.85426 7.30784 1.99548 7.2441 2.09768 7.13532C2.19987 7.02653 2.25466 6.88161 2.25 6.73242C2.25 6.69164 2.25 6.65016 2.25 6.60938C2.25112 5.75191 2.59224 4.92988 3.19856 4.32356C3.80488 3.71724 4.62691 3.37612 5.48438 3.375C6.85195 3.375 8.00016 4.10344 8.47969 5.27344C8.52207 5.37661 8.59416 5.46485 8.6868 5.52695C8.77945 5.58905 8.88847 5.62221 9 5.62221C9.11153 5.62221 9.22055 5.58905 9.3132 5.52695C9.40584 5.46485 9.47793 5.37661 9.52031 5.27344C9.99984 4.10133 11.148 3.375 12.5156 3.375C13.3731 3.37612 14.1951 3.71724 14.8014 4.32356C15.4078 4.92988 15.7489 5.75191 15.75 6.60938C15.75 10.3788 10.2825 13.7918 9 14.5406C8.23852 14.097 6.00258 12.7125 4.31156 10.8696C4.21068 10.7596 4.07022 10.6941 3.92108 10.6877C3.77195 10.6812 3.62635 10.7343 3.51633 10.8352C3.4063 10.936 3.34086 11.0765 3.3344 11.2256C3.32794 11.3748 3.38099 11.5204 3.48187 11.6304C5.67352 14.021 8.60977 15.6157 8.73352 15.6825C8.81543 15.7266 8.90699 15.7496 9 15.7496C9.09301 15.7496 9.18457 15.7266 9.26648 15.6825C9.57726 15.5152 16.875 11.5312 16.875 6.60938C16.8737 5.4536 16.414 4.34553 15.5967 3.52827C14.7795 2.71101 13.6714 2.2513 12.5156 2.25Z"
                                                                    fill="currentColor" />
                                                            </svg>
                                                        </i>
                                                        <span className="nav-text ms-2">Encounters</span>
                                                    </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/patient-doctors' ? 'active' : ''} nav-link `} to="/patient-doctors">
                                                        <i className="icon" data-bs-toggle="tooltip" title="Doctors" data-bs-placement="right">
                                                            <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                                                                    fill="currentColor"></path>
                                                                <path opacity="0.4"
                                                                    d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                                                                    fill="currentColor"></path>
                                                            </svg>
                                                        </i>
                                                        <span className="nav-text ms-2">Doctors</span>
                                                    </Link>
                                                </Nav.Item>
                                                <Nav.Item as="li">
                                                    <Link className={`${location.pathname === '/patient-payments' ? 'active' : ''} nav-link `} to="/patient-payments">
                                                        <i className="icon" data-bs-toggle="tooltip" title="Payments" data-bs-placement="right">
                                                            <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                                                    fill="currentColor"></path>
                                                                <path opacity="0.4"
                                                                    d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                                                    fill="currentColor"></path>
                                                                <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                                            </svg>
                                                        </i>
                                                        <span className="nav-text ms-2">Payments</span>
                                                    </Link>
                                                </Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="setting-modal">
                                        <Link to="#" className="menu-arrow justify-content-start gap-2 rounded-0 " onClick={handleShow3}>
                                            <i className="icon" data-bs-toggle="tooltip" title="Setting" data-bs-placement="right">
                                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12.0122 14.8299C10.4077 14.8299 9.10986 13.5799 9.10986 12.0099C9.10986 10.4399 10.4077 9.17993 12.0122 9.17993C13.6167 9.17993 14.8839 10.4399 14.8839 12.0099C14.8839 13.5799 13.6167 14.8299 12.0122 14.8299Z"
                                                        fill="currentColor"></path>
                                                    <path opacity="0.4"
                                                        d="M21.2301 14.37C21.036 14.07 20.76 13.77 20.4023 13.58C20.1162 13.44 19.9322 13.21 19.7687 12.94C19.2475 12.08 19.5541 10.95 20.4228 10.44C21.4447 9.87 21.7718 8.6 21.179 7.61L20.4943 6.43C19.9118 5.44 18.6344 5.09 17.6226 5.67C16.7233 6.15 15.5685 5.83 15.0473 4.98C14.8838 4.7 14.7918 4.4 14.8122 4.1C14.8429 3.71 14.7203 3.34 14.5363 3.04C14.1582 2.42 13.4735 2 12.7172 2H11.2763C10.5302 2.02 9.84553 2.42 9.4674 3.04C9.27323 3.34 9.16081 3.71 9.18125 4.1C9.20169 4.4 9.10972 4.7 8.9462 4.98C8.425 5.83 7.27019 6.15 6.38109 5.67C5.35913 5.09 4.09191 5.44 3.49917 6.43L2.81446 7.61C2.23194 8.6 2.55897 9.87 3.57071 10.44C4.43937 10.95 4.74596 12.08 4.23498 12.94C4.06125 13.21 3.87729 13.44 3.59115 13.58C3.24368 13.77 2.93709 14.07 2.77358 14.37C2.39546 14.99 2.4159 15.77 2.79402 16.42L3.49917 17.62C3.87729 18.26 4.58245 18.66 5.31825 18.66C5.66572 18.66 6.0745 18.56 6.40153 18.36C6.65702 18.19 6.96361 18.13 7.30085 18.13C8.31259 18.13 9.16081 18.96 9.18125 19.95C9.18125 21.1 10.1215 22 11.3069 22H12.6968C13.872 22 14.8122 21.1 14.8122 19.95C14.8429 18.96 15.6911 18.13 16.7029 18.13C17.0299 18.13 17.3365 18.19 17.6022 18.36C17.9292 18.56 18.3278 18.66 18.6855 18.66C19.411 18.66 20.1162 18.26 20.4943 17.62L21.2097 16.42C21.5776 15.75 21.6083 14.99 21.2301 14.37Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </i>
                                            <span className="nav-text" >Setting</span>
                                        </Link>
                                    </Nav.Item>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <Navbar.Toggle aria-controls="navbarSupportedContent" type="button" className='px-0' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-btn">
                                <span className="navbar-toggler-icon"></span>
                            </span>
                        </Navbar.Toggle>
                    </div>
                    <Navbar.Collapse className="" id="navbarSupportedContent">
                        <ul className="my-2 navbar-nav ms-auto align-items-center navbar-list">
                            <li className="nav-item dropdown me-0 me-xl-3">
                                <div className="d-flex align-items-center mr-2 iq-font-style" role="group" aria-label="First group">
                                    <RadioBtn btnName="theme_font_size" labelclassName="  border-0 btn-icon btn-sm" id="font-size-sm" defaultChecked={themeFontSize} value="theme-fs-sm" >
                                        {['bottom'].map((placement) => (
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
                                        {['bottom'].map((placement) => (
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
                                        {['bottom'].map((placement) => (
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
                                <Dropdown.Toggle as={CustomToggle} href="#" className="nav-link" variant=" nav-link" id="notification-drop" data-bs-toggle="dropdown">
                                    <div className="nav-list-icon">
                                        <div className="btn-inner">
                                            <svg className="icon-20" width="19" height="22" viewBox="0 0 19 22" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <mask maskUnits="userSpaceOnUse" x="0" y="0" width="19"
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
                                <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end" aria-labelledby="notification-drop">
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
                                                    <div className="ms-3 w-100">
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
                                                    <div className="ms-3 w-100">
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
                                                    <div className="ms-3 w-100">
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
                                                    <div className="ms-3 w-100">
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
                                                <Link to="#" className="btn btn-primary">View All
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

            <Modal show={show3} onHide={handleClose3} size='lg' aria-labelledby="contained-modal-title-vcenter" centered contentClassName="rounded-0 p-sm-5 p-4">
                <Modal.Header className='p-0 pb-3 mb-3 position-relative'>
                    <Modal.Title as="h3" >Settings</Modal.Title>
                    <Link to="/auth/sign-in" className="text-secondary">
                        <svg height="20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.016 7.38948V6.45648C15.016 4.42148 13.366 2.77148 11.331 2.77148H6.45597C4.42197 2.77148 2.77197 4.42148 2.77197 6.45648V17.5865C2.77197 19.6215 4.42197 21.2715 6.45597 21.2715H11.341C13.37 21.2715 15.016 19.6265 15.016 17.5975V16.6545"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            </path>
                            <path d="M21.8096 12.0215H9.76855" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M18.8813 9.1062L21.8093 12.0212L18.8813 14.9372" stroke="currentColor"
                                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>{" "}
                        <h6 className="d-inline-block mb-0 text-secondary align-middle ms-1">Logout</h6>
                    </Link>
                    <Link to="#" onClick={handleClose3} className="d-inline-block setting-close-btn text-secondary">
                        <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M7.67 1.99927H16.34C19.73 1.99927 22 4.37927 22 7.91927V16.0903C22 19.6203 19.73 21.9993 16.34 21.9993H7.67C4.28 21.9993 2 19.6203 2 16.0903V7.91927C2 4.37927 4.28 1.99927 7.67 1.99927ZM15.01 14.9993C15.35 14.6603 15.35 14.1103 15.01 13.7703L13.23 11.9903L15.01 10.2093C15.35 9.87027 15.35 9.31027 15.01 8.97027C14.67 8.62927 14.12 8.62927 13.77 8.97027L12 10.7493L10.22 8.97027C9.87 8.62927 9.32 8.62927 8.98 8.97027C8.64 9.31027 8.64 9.87027 8.98 10.2093L10.76 11.9903L8.98 13.7603C8.64 14.1103 8.64 14.6603 8.98 14.9993C9.15 15.1693 9.38 15.2603 9.6 15.2603C9.83 15.2603 10.05 15.1693 10.22 14.9993L12 13.2303L13.78 14.9993C13.95 15.1803 14.17 15.2603 14.39 15.2603C14.62 15.2603 14.84 15.1693 15.01 14.9993Z"
                                fill="currentColor"></path>
                        </svg>
                    </Link>
                </Modal.Header>
                <Modal.Body className='p-0 '>
                    <Tab.Container defaultActiveKey="first">
                        <nav className="setting-modal mb-4">
                            <Nav variant="tabs" className="mb-0 gap-sm-5 gap-3 border-bottom p-0" id="nav-tab" role="tablist" >
                                <Nav.Link eventKey="first" variant=" d-flex align-items-center" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">
                                    <svg height="18" width="18" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z"
                                            stroke="currentColor" strokeWidth="1.42857" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="align-middle fw-500 ms-1">Edit Profile</span>
                                </Nav.Link>
                                <Nav.Link eventKey="second" variant="" id="nav-setting-tab" data-bs-toggle="tab" data-bs-target="#nav-setting" type="button" role="tab" aria-controls="nav-setting" aria-selected="false">
                                    <svg height="18" width="18" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.4232 9.4478V7.3008C16.4232 4.7878 14.3852 2.7498 11.8722 2.7498C9.35925 2.7388 7.31325 4.7668 7.30225 7.2808V7.3008V9.4478"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M15.683 21.2497H8.042C5.948 21.2497 4.25 19.5527 4.25 17.4577V13.1687C4.25 11.0737 5.948 9.37671 8.042 9.37671H15.683C17.777 9.37671 19.475 11.0737 19.475 13.1687V17.4577C19.475 19.5527 17.777 21.2497 15.683 21.2497Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path d="M11.8628 14.2026V16.4236" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="align-middle fw-500 ms-1">Setting</span>
                                </Nav.Link>
                                <Nav.Link eventKey="third" variant="" id="nav-notification-tab" data-bs-toggle="tab" data-bs-target="#nav-notification" type="button" role="tab" aria-controls="nav-notification" aria-selected="false">
                                    <svg height="18" width="18" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="align-middle fw-500 ms-1">Notification</span>
                                </Nav.Link>
                            </Nav>
                        </nav>
                        <Tab.Content>
                            <Tab.Pane className=" fade show" eventKey="first" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <Form>
                                    <div className="d-flex align-items-sm-center align-items-start justify-content-between flex-sm-row flex-column gap-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="flex-shrink-0 d-inline-block position-relative">
                                                <img src={avatars2} alt="img-fluid" />
                                                <span className="bg-success p-1 rounded-circle position-absolute end-0 bottom-0 border border-3 border-white me-1 mb-1"></span>
                                            </div>
                                            <div className="content">
                                                <h4 className="mb-2">Amine Steward</h4>
                                                <p className="m-0">Upload A New Image.</p>
                                            </div>
                                        </div>
                                        <Button variant='primary' type='button'>
                                            <span className="btn-inner">
                                                <span className="text d-inline-block align-middle">Save Changes</span> {" "}
                                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                                        viewBox="0 0 8 8" fill="none">
                                                        <path
                                                            d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                            fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </Button>
                                    </div>
                                    <Row className="mt-5">
                                        <Col md="6">
                                            <Form.Group>
                                                <Form.Control type="text" className="form-control" placeholder="Your First Name *" />
                                            </Form.Group>
                                        </Col>
                                        <Col md="6" className="mt-md-0 mt-4">
                                            <Form.Group>
                                                <Form.Control type="text" className="form-control" placeholder="Your Last Name *" />
                                            </Form.Group>
                                        </Col>
                                        <Col md="6" className="mt-4">
                                            <Form.Group>
                                                <Form.Control type="email" className="form-control" placeholder="E-mail Address *" />
                                            </Form.Group>
                                        </Col>
                                        <Col md="6" className="mt-4">
                                            <Form.Group>
                                                <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="Your DOB *" />
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" className="mt-4">
                                            <Form.Group className='cutom-form-control'>
                                                <textarea className='form-control' rows='2' placeholder="Your Bio"></textarea>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane className=" fade" id="nav-setting" eventKey="second" role="tabpanel" aria-labelledby="nav-setting-tab">
                                <Form>
                                    <div className="d-flex align-items-sm-center align-items-start justify-content-between flex-sm-row flex-column gap-4">
                                        <div className="content">
                                            <h4 className="mb-2">Password</h4>
                                            <p className="m-0">Update Or Change Your Current Password. </p>
                                        </div>
                                        <Button variant='primary' type='button'>
                                            <span className="btn-inner">
                                                <span className="text d-inline-block align-middle">Change Password</span>
                                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                                        viewBox="0 0 8 8" fill="none">
                                                        <path
                                                            d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                            fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </Button>
                                    </div>
                                    <Row className="mt-5">
                                        <Col md="12">
                                            <Form.Group className="mb-3">
                                                <Form.Control type="password" className="form-control" placeholder="Your Current Password *" />
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" className="mt-4">
                                            <Form.Group>
                                                <Form.Control type="password" className="form-control" placeholder="New Password *" />
                                            </Form.Group>
                                            <Form.Label className="mt-2">Password Must Be in 8 Character</Form.Label>
                                        </Col>
                                        <Col md="12" className=" mt-4">
                                            <Form.Group >
                                                <Form.Control type="password" className="form-control" placeholder="Confirm New Password *" />
                                            </Form.Group>
                                            <Form.Label className="mt-2">Must Be Same to New Password</Form.Label>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane className=" fade" id="nav-notification" eventKey="third" role="tabpanel" aria-labelledby="nav-notification-tab">
                                <Form>
                                    <div className="content">
                                        <h4 className="mb-2">Notification</h4>
                                        <p className="m-0">Update Or Change Your Notification Settings.</p>
                                    </div>
                                    <div className="d-flex aling-items-center justify-content-between gap-3 mt-5 me-0 mb-0 p-0 form-check form-switch form-check-inline">
                                        <h5 className="mb-0">Email Notification</h5>
                                        <Form.Check className="mb-3 form-switch">
                                            <FormCheck.Input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
                                        </Form.Check>
                                    </div>
                                    <div
                                        className="d-flex aling-items-center justify-content-between gap-3 mt-3 me-0 mb-0 p-0 form-check form-switch form-check-inline">
                                        <h5 className="mb-0">App Notification</h5>
                                        <Form.Check className="mb-3 form-switch">
                                            <FormCheck.Input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked2" defaultChecked />
                                        </Form.Check>
                                    </div>
                                    <div className="mt-4 pt-4 border-top">
                                        <ul className="list-inline m-0 p-0">
                                            <li className="mb-3">
                                                <Form.Check className="d-flex aling-items-center justify-content-between gap-3 m-0 p-0 form-check form-check-inline">
                                                    <FormCheck.Label className="form-check-label h5 text-body mb-0" htmlFor="customCheck5">Appointment Reminder</FormCheck.Label>
                                                    <FormCheck.Input type="checkbox" className="form-check-input" id="customCheck5" />
                                                </Form.Check>
                                            </li>
                                            <li className="mb-3">
                                                <Form.Check className="d-flex aling-items-center justify-content-between gap-3 m-0 p-0 form-check form-check-inline">
                                                    <FormCheck.Label className="form-check-label h5 text-body mb-0" htmlFor="customCheck6">Subscription Offer</FormCheck.Label>
                                                    <FormCheck.Input type="checkbox" className="form-check-input" id="customCheck6" />
                                                </Form.Check>
                                            </li>
                                            <li className="mb-3">
                                                <Form.Check className="d-flex aling-items-center justify-content-between gap-3 m-0 p-0 form-check form-check-inline">
                                                    <FormCheck.Label className="form-check-label h5 text-body mb-0" htmlFor="customCheck7">Update Notification</FormCheck.Label>
                                                    <FormCheck.Input type="checkbox" className="form-check-input" id="customCheck7" />
                                                </Form.Check>
                                            </li>
                                            <li>
                                                <Form.Check className="d-flex aling-items-center justify-content-between gap-3 m-0 p-0 form-check form-check-inline">
                                                    <FormCheck.Label className="form-check-label h5 text-body mb-0" htmlFor="customCheck8"> Notification</FormCheck.Label>
                                                    <FormCheck.Input type="checkbox" className="form-check-input" id="customCheck8" />
                                                </Form.Check>
                                            </li>
                                        </ul>
                                    </div>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Header1;