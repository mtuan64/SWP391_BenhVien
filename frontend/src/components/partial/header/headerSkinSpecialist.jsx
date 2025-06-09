
import React, { memo, Fragment, useState, useEffect } from 'react';
import { Container, Nav, Navbar, Dropdown, Form, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// widget
import Logo from '../../widgets/Logo';
import HorizontalNav from './HorizontalNav';
import ButtonBox from '../../widgets/ButtonBox';
import MegaMenu from './megaMenu';
import Sidebar from '../../widgets/Sidebar';

// Component
import CustomToggle from '../../bootstrap/Dropdowns';

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';


// Images
import product1 from '/assets/images/shop/product-1.webp'
import product2 from '/assets/images/shop/product-2.webp'
import product3 from '/assets/images/shop/product-3.webp'
import product4 from '/assets/images/shop/product-4.webp'
import LandingOffcanvasHeader from './offcanvas-header';

export default function HeaderSkinSpecialist({ logoDynamic, IsMegaMenu }) {

    const themeSchemeDirection = useSelector(theme_scheme_direction);

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

    const handleDeleteClick = (event) => {
        const clickedButton = event.currentTarget;
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this item",
            icon: 'error',
            showCancelButton: true,
            backdrop: `rgba(60,60,60,0.8)`,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                clickedButton.closest('[data-item="list"]').remove();
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                );
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const navbarClassName = `iq-navbar ${isNavbarFixed ? 'fixed' : ''}`;

    const CartData = [
        {
            ProductImage: product1,
            ProductTitle: "Electric Toothbrush",
            ProductPrice: "$123.00",
            ProductCount: "1"
        },
        {
            ProductImage: product2,
            ProductTitle: "Medical Box",
            ProductPrice: "$92.00",
            ProductCount: "1"
        },
        {
            ProductImage: product3,
            ProductTitle: "Hand Sanitizer Bottle",
            ProductPrice: "$90.00",
            ProductCount: "1"
        },
        {
            ProductImage: product4,
            ProductTitle: "Wheel Chair",
            ProductPrice: "$89.00",
            ProductCount: "1"
        }
    ]

    return (
        <Fragment>
            <header className="skin-specialist">
                <Nav className={`nav navbar navbar-expand-xl navbar-light iq-navbar header-hover-menu py-xl-0 ${navbarClassName}`}>
                    <Container fluid className="navbar-inner">
                        <div className="d-flex align-items-center justify-content-between w-100 landing-header">
                            <div className="d-flex gap-3 gap-xl-0 align-items-center">
                                <div className='d-xl-none'>
                                    <LandingOffcanvasHeader logoDynamic={logoDynamic}></LandingOffcanvasHeader>
                                </div>
                                <Logo logoDynamic={true} logoImage={logoDynamic} />
                                {/* menu */}
                                {IsMegaMenu ? (
                                    <MegaMenu />
                                ) : (
                                    <HorizontalNav />
                                )}
                            </div>

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
                                        <Dropdown as="li" className="nav-item pe-3 me-3">
                                            <Dropdown.Toggle as={CustomToggle} href="#" className="nav-link" variant=" nav-link" id="notification-drop" data-bs-toggle="dropdown">
                                                <div className="nav-list-icon btn-icon btn-sm rounded-pill btn-action">
                                                    <div className="btn-inner">
                                                        <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5"
                                                                strokeLinecap="round" strokeLinejoin="round"></circle>
                                                            <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5"
                                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu as="ul" className="p-0 dropdown-menu-end" style={{ width: "20rem" }} align={`${themeSchemeDirection === 'ltr' ? "end" : ""}`} aria-labelledby="notification-drop">
                                                <li className='p-0'>
                                                    <div class="form-group input-group mb-0">
                                                        <input type="text" class="form-control border-0" placeholder="Search..." />
                                                        <span class="input-group-text border-0">
                                                            <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </li>
                                            </Dropdown.Menu>
                                        </Dropdown>{" "}

                                        <Dropdown as="li" className="nav-item pe-3 me-3">
                                            <Dropdown.Toggle
                                                as={CustomToggle}
                                                href="#"
                                                className="nav-link"
                                                variant=" nav-link"
                                                id="cart-drop"
                                                data-bs-toggle="dropdown"
                                            >
                                                <div className="btn-icon btn-sm rounded-pill btn-action position-relative">
                                                    <div className="btn-inner">
                                                        <svg className="cart-icons" xmlns="http://www.w3.org/2000/svg" width="18"
                                                            height="17" viewBox="0 0 18 17" fill="none">
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
                                                        <span className=" badge-notification">4</span>
                                                    </div>
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="p-3 sub-drop dropdown-menu-end" align={`${themeSchemeDirection === 'ltr' ? "end" : ""}`} aria-labelledby="cart-drop">
                                                <Card className="m-0 shadow-none">
                                                    <Card.Body className="p-0 max-17 scroll-thin">
                                                        {CartData.map((item, index) => (
                                                            <div className="iq-sub-card" key={index} data-item="list">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="d-flex align-items-center">
                                                                        <img className="avatar-40 rounded" src={item.ProductImage} alt="" loading="lazy" />
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="mb-0 ">{item.ProductTitle}</h6>
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <p className="mb-0"><span>{item.ProductCount}</span>{" "}*{" "} <span>{item.ProductPrice}</span></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-primary"><i className="far fa-times-circle" onClick={(event) => handleDeleteClick(event)}></i></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Card.Body>
                                                    <Card.Footer className="pt-3 px-0 pb-0 text-cente">
                                                        <div className="d-flex align-items-center justify-content-between ">
                                                            <strong>Subtotal:</strong>
                                                            <span>$64.00</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between my-3 pt-3 border-top">
                                                            <div className="cart-menu">
                                                                <ButtonBox buttonText="View Cart" buttonUrl="/shop/cart" />
                                                            </div>
                                                            <div className="button-primary">
                                                                <ButtonBox buttonText="Checkout" buttonUrl="/shop/checkout" />
                                                            </div>
                                                        </div>
                                                    </Card.Footer>
                                                </Card>
                                            </Dropdown.Menu>
                                        </Dropdown>{" "}

                                        <Dropdown as="li" className="nav-item">
                                            <Dropdown.Toggle as={CustomToggle} variant=" nav-link d-flex align-items-center" href="#"
                                                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <div className="btn-inner btn-icon btn-sm position-relative">
                                                    <svg className="user-icons" xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                        viewBox="0 0 20 21" fill="none">
                                                        <mask maskUnits="userSpaceOnUse" x="3" y="12" width="14" height="7">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M3.33203 12.3041H16.5319V18.4491H3.33203V12.3041Z" fill="white"></path>
                                                        </mask>
                                                        <g>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M9.93286 13.5541C6.38203 13.5541 4.58203 14.1641 4.58203 15.3682C4.58203 16.5832 6.38203 17.1991 9.93286 17.1991C13.4829 17.1991 15.282 16.5891 15.282 15.3849C15.282 14.1699 13.4829 13.5541 9.93286 13.5541ZM9.93286 18.4491C8.30036 18.4491 3.33203 18.4491 3.33203 15.3682C3.33203 12.6216 7.09953 12.3041 9.93286 12.3041C11.5654 12.3041 16.532 12.3041 16.532 15.3849C16.532 18.1316 12.7654 18.4491 9.93286 18.4491Z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                        <mask maskUnits="userSpaceOnUse" x="5" y="1" width="10" height="10">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M5.50781 1.89075H14.3578V10.7396H5.50781V1.89075Z" fill="white"></path>
                                                        </mask>
                                                        <g>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M9.93367 3.08038C8.14951 3.08038 6.69784 4.53121 6.69784 6.31538C6.69201 8.09371 8.13284 9.54371 9.9095 9.55038L9.93367 10.1454V9.55038C11.717 9.55038 13.1678 8.09871 13.1678 6.31538C13.1678 4.53121 11.717 3.08038 9.93367 3.08038ZM9.93367 10.7395H9.90701C7.47201 10.732 5.49951 8.74622 5.50784 6.31288C5.50784 3.87538 7.49284 1.89038 9.93367 1.89038C12.3737 1.89038 14.3578 3.87538 14.3578 6.31538C14.3578 8.75538 12.3737 10.7395 9.93367 10.7395Z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-user" align={`${themeSchemeDirection === 'ltr' ? "end" : ""}`}
                                                aria-labelledby="navbarDropdown">
                                                <Dropdown.Item as={Link} to={'./auth/login'} className="border-bottom"> Sign in </Dropdown.Item>
                                                <Dropdown.Item as={Link} to={'./auth/registration'}> Sign up </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>{" "}

                                        <li className="ms-3">
                                            <div variant="" onClick={handleShow} className="cursor-pointer p-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 28 22"
                                                    fill="none">
                                                    <path d="M0 0H24V2H0V0Z" fill="#171C26" />
                                                    <path d="M4 10H28V12H4V10Z" fill="#171C26" />
                                                    <path d="M0 20H24V22H0V20Z" fill="#171C26" />
                                                </svg>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Nav>
            </header>
            <Sidebar show={show} handleClose={handleClose} targetId="right-panel-toggle" logoDynamic={logoDynamic} />
        </Fragment>
    )
}
