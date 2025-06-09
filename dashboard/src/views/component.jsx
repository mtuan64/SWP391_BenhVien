import React, { useState, useEffect } from "react";
import { Fragment } from 'react'
import { Container, Button, Collapse, Nav } from 'react-bootstrap'

// Components
import Card from '../components/bootstrap/card'

//uiKit
import Accordions from "./uikit/accordion";
import Badges from "./uikit/badge";
import Alerts from "./uikit/alert";
import Breadcrumbs from "./uikit/breadcrumb";
import Buttons from "./uikit/button";
import ButtonGroups from "./uikit/buttons-group";
import Calenders from "./uikit/calender";
import Cards from "./uikit/card";
import Carousels from "./uikit/carousel";
import UiCollapse from "./uikit/collapse";
import DropDowns from "./uikit/dropdowns";
import ListGroups from "./uikit/list-group";
import Modals from "./uikit/modal";
import Navs from "./uikit/nav";
import Navbars from "./uikit/navbar";
import OffCanvass from "./uikit/off-canvas";
import Paginations from "./uikit/pagination";
import Popovers from "./uikit/popovers";
import Progresss from "./uikit/progress";
import Ribbon from "./uikit/ribbon";
import Scrollspys from "./uikit/scrollspy";
import Spinners from "./uikit/spinner";
import Toasts from "./uikit/toast";
import Tooltips from "./uikit/tooltip";

//form
import Overview from "./uikit/form-overview";
import DisabledForms from "./uikit/disabled-form";
import Sizings from "./uikit/sizing";
import InputGroups from "./uikit/input-group";
import FilledInput from "./uikit/filled-input";
import AFormControls from "./uikit/alternate-form-control";
import FloatingLables from "./uikit/floating-lable";
import AFloatingLables from "./uikit/alternate-floating-lable";
import ToggleBtns from "./uikit/toggle-btn";
import Validations from "./uikit/validation";

// content
import Typographys from "./uikit/typography";
import Images from "./uikit/image";
import Figures from "./uikit/figure";
import Tables from "./uikit/table";

// Redux Selector / Action
import { useSelector } from "react-redux";

const UiComponent = () => {
    // collapse
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(document.documentElement.scrollTop > 250);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Fragment>
            <Container className="body-class-1 mt-5">
                <aside className={`mb-5 mobile-offcanvas bd-aside card iq-document-card sticky-xl-top text-muted align-self-start ${open3 && 'show'}`}
                    id="left-side-bar">
                    <div className="p-0 offcanvas-header">
                        <button className="btn-close float-end" onClick={() => setOpen3(!open3)}></button>
                    </div>
                    <h2 className="pb-2 h6 border-bottom">On this page</h2>
                    <div className="small" id="elements-section">
                        <ul className="list-unstyled mb-0">
                            <li className="mt-2">
                                <Button
                                    variant=" d-inline-flex align-items-center "
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open} >
                                    <i className="right-icon me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7">
                                            </path>
                                        </svg>
                                    </i>
                                    Components
                                </Button>
                                <Collapse in={open}>
                                    <ul className="list-unstyled ps-3 elem-list" id="components-collapse" to="#components">
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#accordion">
                                                Accordion
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#alerts">
                                                Alerts
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#badge">
                                                Badge
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#breadcrumb">
                                                Breadcrumb
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#buttons">
                                                Buttons
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#button-group">
                                                Button Group
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#calendar">
                                                Calendar
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#card">
                                                Card
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#carousel">
                                                Carousel
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#dropdowns">
                                                Dropdowns
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#list-group">
                                                List Group
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#modal">
                                                Modal
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#navs">
                                                Navs
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#navbar">
                                                Navbar
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#off-canvas">
                                                Off Canvas
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#pagination">
                                                Pagination
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#popovers">
                                                Popovers
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-item-center rounded" href="#ribbon">
                                                Ribbon
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#progress">
                                                Progress
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#scrollspy">
                                                Scrollspy
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#spinners">
                                                Spinners
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#toasts">
                                                Toasts
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#tooltips">
                                                Tooltips
                                            </Nav.Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>
                            <li className="my-2">
                                <Button
                                    variant=" d-inline-flex align-items-center "
                                    onClick={() => setOpen1(!open1)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open1}
                                >
                                    <i className="right-icon me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </i>
                                    Forms
                                </Button>
                                <Collapse in={open1}>
                                    <ul className="list-unstyled ps-3" id="forms-collapse" to="#forms">
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#overview">
                                                Overview
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#disabled-forms">
                                                Disabled Forms
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#sizing">
                                                Sizing
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#input-group">
                                                Input Group
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#a-form-control">
                                                Alertnate Input
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#floating-labels">
                                                Floating Labels
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#a-floating-labels">
                                                Alertnate Float Labels
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#toggle-btn">
                                                Toggle Button
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#validation">
                                                Validation
                                            </Nav.Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>
                            <li className="mb-2">
                                <Button
                                    variant=" d-inline-flex align-items-center "
                                    onClick={() => setOpen2(!open2)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open2}
                                >
                                    <i className="right-icon me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7">
                                            </path>
                                        </svg>
                                    </i>
                                    Contents
                                </Button>
                                <Collapse in={open2}>
                                    <ul className="list-unstyled ps-3" id="contents-collapse" to="#content">
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#typography"    >
                                                Typography
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#images">
                                                Images
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#tables">
                                                Tables
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link className="d-inline-flex align-items-center rounded" href="#figures">
                                                Figures
                                            </Nav.Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="bd-cheatsheet container-fluid bg-trasprent p-0">
                    <section id="components">
                        <div className="iq-side-content sticky-xl-top">
                            <Card className="">
                                <Card.Body className="">
                                    <h4 className="fw-bold">Components</h4>
                                </Card.Body>
                            </Card>
                        </div>
                        <Accordions />
                        <Alerts />
                        <Badges />
                        <Breadcrumbs />
                        <Buttons />
                        <ButtonGroups />
                        <DropDowns />
                        <Calenders />
                        <Cards />
                        <Carousels />
                        <UiCollapse />
                        <ListGroups />
                        <Modals />
                        <Navs />
                        <Navbars />
                        <OffCanvass />
                        <Paginations />
                        <Popovers />
                        <Progresss />
                        <Ribbon />
                        <Scrollspys />
                        <Spinners />
                        <Toasts />
                        <Tooltips />

                    </section>

                    <section id="forms">
                        <div className="iq-side-content sticky-xl-top">
                            <Card className="">
                                <Card.Body className="">
                                    <h4 className="fw-bold">Forms</h4>
                                </Card.Body>
                            </Card>
                        </div>
                        <Overview />
                        <DisabledForms />
                        <Sizings />
                        <InputGroups />
                        <FilledInput />
                        <AFormControls />
                        <FloatingLables />
                        <AFloatingLables />
                        <ToggleBtns />
                        <Validations />
                    </section>

                    <section id="content">
                        <div className="iq-side-content sticky-xl-top">
                            <Card className="">
                                <Card.Body className="">
                                    <h4 className="fw-bold">Contents</h4>
                                </Card.Body>
                            </Card>
                        </div>
                        <Typographys />
                        <Images />
                        <Tables />
                        <Figures />
                    </section>
                </div>
            </Container>

            {/* Back-To-Top */}
            <div
                id="back-to-top"
                style={{ display: isVisible ? 'block' : 'none' }}
                className={`animate__animated ${isVisible ? 'animate__fadeIn' : 'animate__fadeOut'}`}
            >
                <a
                    id="top"
                    href="#top"
                    onClick={scrollToTop}
                    className="p-0 btn btn-secondary btn-sm position-fixed top border-0"
                    style={{ bottom: '20px', right: '20px', zIndex: 1000 }}
                >
                    <svg
                        width="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 15.5L12 8.5L19 15.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            </div>
            {/* End Back-To-Top */}

            <div className="middle" style={{ display: 'none' }}>
                <button data-trigger="left-side-bar" className="d-xl-none btn btn-sm mid-menu" type="button" onClick={() => { setOpen3(!open3) }}>
                    <i className="icon">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.75 11.7256L4.75 11.7256" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round"></path>
                            <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </i>
                </button>
            </div>
        </Fragment>
    )
}

export default UiComponent
