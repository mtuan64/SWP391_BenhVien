import React,{useEffect, memo, Fragment, useState} from 'react'
import { Col, Nav, Row, Collapse, Dropdown, Form, Card, Button, Container } from 'react-bootstrap';
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

const HeaderDentist = memo(({logoDynamic, IsMegaMenu}) => {

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
    return(
        <Fragment>
            <header className="header-dentist">
                <div className="top-header d-none d-xl-block bg-primary-subtle">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col xxl="6" lg="4">
                                <div className="d-flex gap-3 gap-xl-0 align-items-center">
                                    <Logo logoDynamic={true} logoImage={logoDynamic} />
                                </div>
                            </Col>
                            <Col xxl="6" xl="8" className="text-md-end">
                                <Row className="col-rows-3">
                                    <div className="col">
                                        <div className="iq-icon-box column d-flex align-items-center gap-3 border-end">                               
                                            <div className="icon-box-img">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none" className="text-primary"><path fillRule="evenodd" clipRule="evenodd" d="M13.7217 14.831C12.8854 14.831 12.0516 14.5547 11.3541 14.0022L5.7479 9.48224C5.34415 9.15724 5.28165 8.56599 5.6054 8.16349C5.93165 7.76224 6.52165 7.69849 6.92415 8.02224L12.5254 12.5372C13.2292 13.0947 14.2204 13.0947 14.9291 12.5322L20.4741 8.02474C20.8766 7.69599 21.4667 7.75849 21.7941 8.16099C22.1204 8.56224 22.0592 9.15224 21.6579 9.47974L16.1029 13.9947C15.4004 14.5522 14.5604 14.831 13.7217 14.831Z" fill="#1DBFCC"></path><mask id="mask0_797_2541" style={{maskType:`alpha`}} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="25"><path fillRule="evenodd" clipRule="evenodd" d="M0.25 0.5H27.1249V24.875H0.25V0.5Z" fill="white"></path></mask><g mask="url(#mask0_797_2541)"><path fillRule="evenodd" clipRule="evenodd" d="M7.54875 23H19.8237C19.8263 22.9975 19.8363 23 19.8438 23C21.27 23 22.535 22.49 23.505 21.5212C24.6313 20.4 25.25 18.7887 25.25 16.985V8.4C25.25 4.90875 22.9675 2.375 19.8237 2.375H7.55125C4.4075 2.375 2.125 4.90875 2.125 8.4V16.985C2.125 18.7887 2.745 20.4 3.87 21.5212C4.84 22.49 6.10625 23 7.53125 23H7.54875ZM7.5275 24.875C5.59875 24.875 3.87625 24.175 2.54625 22.85C1.065 21.3725 0.25 19.29 0.25 16.985V8.4C0.25 3.89625 3.38875 0.5 7.55125 0.5H19.8238C23.9863 0.5 27.125 3.89625 27.125 8.4V16.985C27.125 19.29 26.31 21.3725 24.8288 22.85C23.5 24.1737 21.7763 24.875 19.8438 24.875H19.8238H7.55125H7.5275Z" fill="currentColor"></path></g></svg>
                                            </div>  
                                            <div className="icon-box-content text-start text-body">
                                                <h6 className="icon-box-title">Email Us On</h6>
                                                <p className="icon-box-desc m-0">kivicare@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="iq-icon-box column d-flex align-items-center gap-3 border-end">                               
                                            <div className="icon-box-img">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 21 25" fill="none" className="text-primary"><path fillRule="evenodd" clipRule="evenodd" d="M10.3125 8.625C9.10625 8.625 8.125 9.60625 8.125 10.8138C8.125 12.02 9.10625 13 10.3125 13C11.5188 13 12.5 12.02 12.5 10.8138C12.5 9.60625 11.5188 8.625 10.3125 8.625ZM10.3125 14.875C8.0725 14.875 6.25 13.0538 6.25 10.8137C6.25 8.5725 8.0725 6.75 10.3125 6.75C12.5525 6.75 14.375 8.5725 14.375 10.8137C14.375 13.0538 12.5525 14.875 10.3125 14.875Z" fill="#1DBFCC"></path><mask id="mask0_1131_523" style={{maskType: `alpha`}} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="25"><path fillRule="evenodd" clipRule="evenodd" d="M0 0.5H20.6244V24.875H0V0.5Z" fill="white"></path></mask><g mask="url(#mask0_1131_523)"><path fillRule="evenodd" clipRule="evenodd" d="M10.3125 2.375C5.66 2.375 1.875 6.19625 1.875 10.8912C1.875 16.865 8.905 22.685 10.3125 22.995C11.72 22.6837 18.75 16.8637 18.75 10.8912C18.75 6.19625 14.965 2.375 10.3125 2.375ZM10.3125 24.875C8.07 24.875 0 17.935 0 10.8912C0 5.16125 4.62625 0.5 10.3125 0.5C15.9987 0.5 20.625 5.16125 20.625 10.8912C20.625 17.935 12.555 24.875 10.3125 24.875Z" fill="currentColor"></path></g></svg>
                                            </div>  
                                            <div className="icon-box-content text-start text-body">
                                                <h6 className="icon-box-title">Visit Location</h6>
                                                <p className="icon-box-desc m-0">1234 North Avenue Luke</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="iq-icon-box column d-flex align-items-center gap-3">                               
                                            <div className="icon-box-img">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none" className="text-primary"><mask id="mask0_1131_498" style={{maskType:`alpha`}} maskUnits="userSpaceOnUse" x="0" y="0" width="27" height="27"><path fillRule="evenodd" clipRule="evenodd" d="M0.5 0.500244H26.1245V26.1246H0.5V0.500244Z" fill="white"></path></mask><g mask="url(#mask0_1131_498)"><path fillRule="evenodd" clipRule="evenodd" d="M3.44886 4.32583C3.45136 4.32583 3.38886 4.39083 3.31011 4.46833C3.00761 4.76208 2.38136 5.37333 2.37511 6.65208C2.36511 8.44083 3.54136 11.7621 9.2051 17.4246C14.8426 23.0596 18.1589 24.2496 19.9514 24.2496H19.9776C21.2564 24.2433 21.8664 23.6158 22.1614 23.3146C22.2514 23.2221 22.3239 23.1546 22.3751 23.1121C23.6201 21.8596 24.2576 20.9271 24.2514 20.3296C24.2426 19.7196 23.4839 18.9983 22.4351 18.0008C22.1014 17.6833 21.7389 17.3383 21.3564 16.9558C20.3651 15.9671 19.8739 16.1358 18.7939 16.5158C17.3001 17.0396 15.2501 17.7521 12.0651 14.5658C8.8751 11.3783 9.58885 9.33083 10.1114 7.83708C10.4889 6.75708 10.6614 6.26458 9.66886 5.27208C9.28011 4.88458 8.93136 4.51708 8.61011 4.17958C7.61886 3.13708 6.90386 2.38333 6.29761 2.37458H6.28761C5.68886 2.37458 4.75886 3.01458 3.44261 4.33083C3.44636 4.32708 3.44761 4.32583 3.44886 4.32583ZM19.9526 26.1246C16.8376 26.1246 12.7764 23.6446 7.8801 18.7508C2.96511 13.8371 0.481355 9.76333 0.500105 6.64208C0.511355 4.57958 1.59261 3.52333 1.99886 3.12708C2.02011 3.10083 2.09261 3.02958 2.11761 3.00458C3.9101 1.21083 5.11885 0.485831 6.32135 0.499581C7.7176 0.518331 8.71135 1.56333 9.96885 2.88708C10.2801 3.21458 10.6176 3.57083 10.9939 3.94583C12.8189 5.77083 12.2989 7.25958 11.8814 8.45458C11.4264 9.75833 11.0326 10.8833 13.3901 13.2408C15.7501 15.5983 16.8751 15.2046 18.1739 14.7458C19.3701 14.3283 20.8551 13.8058 22.6826 15.6308C23.0526 16.0008 23.4039 16.3346 23.7276 16.6433C25.0576 17.9071 26.1076 18.9058 26.1251 20.3058C26.1401 21.4996 25.4151 22.7158 23.6251 24.5071L22.8326 23.9696L23.5026 24.6246C23.1064 25.0308 22.0514 26.1133 19.9876 26.1246H19.9526Z" fill="currentColor"></path></g></svg>
                                            </div>  
                                            <div className="icon-box-content text-start text-body">
                                                <h6 className="icon-box-title">Have Any Question?</h6>
                                                <p className="icon-box-desc m-0">+ (480) 555-0103</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
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
                                <div className="d-xl-none">
                                    <Logo logoDynamic={true} logoImage={logoDynamic} />
                                </div>                                
                                    
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
                                        <Dropdown as="li" className="nav-item">
                                            <Dropdown.Toggle as={CustomToggle} href="#" className="nav-link" variant=" nav-link"
                                                id="notification-drop" data-bs-toggle="dropdown">
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
                                            <Dropdown.Menu as="ul"  className="p-0 sub-drop dropdown-menu-end" style={{ width: "20rem"}}  align={`${themeSchemeDirection === 'ltr' ? "end" : ""}`} aria-labelledby="notification-drop">
                                                <li className='p-0'>
                                                <div className="form-group input-group mb-0 search-input">
                                                    <Form.Control type="text" placeholder="Search..." />
                                                    <span className="input-group-text">
                                                        <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                              <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                              <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                </li>
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
                                            <Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-end dropdown-user px-2"
                                                aria-labelledby="navbarDropdown" align={`${themeSchemeDirection === 'ltr' ? "end" : ""}`}>
                                                <Dropdown.Item  as={Link} to={'./auth/login'} className="border-bottom"> Sign in </Dropdown.Item>
                                                <Dropdown.Item as={Link} to={'./auth/registration'}> Sign up </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>{" "}
                                        
                                        <Dropdown as="li" className="nav-item">
                                            <Dropdown.Toggle as={CustomToggle} // href="#" href="javascript:void(0)" className="nav-link"
                                                variant=" nav-link" id="cart-drop" data-bs-toggle="dropdown">
                                                <div className="btn-icon btn-sm rounded-pill btn-action position-relative" onClick={() => {
                                                    setdropdownhandler(prevState => !prevState);
                                                }}>
                                                    <div className="btn-inner">
                                                        <svg className="cart-icons" xmlns="http://www.w3.org/2000/svg" width="18" height="17"
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
                                                        <span className=" badge-notification">4</span>
                                                    </div>
                                                </div>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className={`p-3 sub-drop dropdown-menu-end `}
                                                aria-labelledby="cart-drop" align={`${themeSchemeDirection === 'ltr' ? "end" : ""}`}>
                                                <Card className="m-0 shadow-none">
                                                    <Card.Body className="p-0 max-17 scroll-thin">
                                                        {CartData.map((item, index) => (
                                                            <div className="iq-sub-card" key={index} data-item="list">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="d-flex align-items-center">
                                                                        <img className="avatar-40 rounded" src={item.ProductImage} alt=""
                                                                            loading="lazy" />
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="mb-0 ">{item.ProductTitle}</h6>
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <p className="mb-0"><span>{item.ProductCount}</span>{" "}*{" "}
                                                                                    <span>{item.ProductPrice}</span></p>
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
                                                                <ButtonBox buttonText="View Cart" buttonUrl="/shop/cart" Click={() => {
                                                                    setdropdownhandler(prevState => !prevState);
                                                                }} />
                                                            </div>
                                                            <div className="button-primary">
                                                                <ButtonBox buttonText="Checkout" buttonUrl="/shop/checkout" Click={() => {
                                                                    setdropdownhandler(prevState => !prevState);
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </Card.Footer>
                                                </Card>
                                            </Dropdown.Menu>
                                        </Dropdown>{" "}

                                        <li className='button-primary ms-3'>
                                            <ButtonBox buttonUrl="/appointment" buttonText="Appointment" />
                                        </li>

                                        <li className="ms-3">
                                            <div variant="" onClick={handleShow} className="cursor-pointer p-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 28 22" fill="none">
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
})

export default HeaderDentist;