import React from 'react'
import { Fragment, useState } from 'react'

import { Button, Col, Row, Image, Form } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

import ChoicesJs from '../components/choices'
//flatpicker
import Flatpickr from "react-flatpickr";
//select
const options = [
    { value: 'Select Designation *', label: 'Select Designation *' },
    { value: 'Dentist', label: 'Dentist' },
    { value: 'Psychiatrist', label: 'Psychiatrist' },
    { value: 'Therapist', label: 'Therapist' },
    { value: 'Orthopedic', label: 'Orthopedic' },
]

// Images
import img1 from '/assets/images/avatars/14.png';

const Setting = () => {
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState([]);

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case "Enter":
            case "Tab":
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue("");
                event.preventDefault();
                break;
            default:
        }
    };
    const [open, setOpen] = useState(true);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    return (
        <Fragment>
            <TopNav title="Setting" />
            <Row>
                <Col lg="12">
                    <Card>
                        <div className="card-header d-flex justify-content-between flex-sm-row flex-column gap-4">
                            <h3 className="mb-0">Profile Setting</h3>
                            <div className="d-inline-flex flex-wrap gap-4 align-items-center">
                                <Button variant='secondary' type='button'>
                                    <span className="btn-inner">
                                        <span className="text d-inline-block align-middle">Cancel</span>{" "}
                                        <span className="icon d-inline-block align-middle ms-1 ps-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path
                                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </span>
                                    </span>
                                </Button>
                                <Button variant='primary' type='button'>
                                    <span className="btn-inner">
                                        <span className="text d-inline-block align-middle">Save</span>{" "}
                                        <span className="icon d-inline-block align-middle ms-1 ps-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path
                                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </span>
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <Card.Body className="pt-0 mt-3">
                            <Row>
                                <Col lg="12">
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="flex-shrink-0 d-inline-block position-relative">
                                            <img src={img1} alt="Dr-profile" loading="lazy" />
                                            <span className="bg-success p-2 rounded-circle position-absolute end-0 bottom-0 border border-3 border-white me-1 mb-1"></span>
                                        </div>
                                        <div className="content">
                                            <h4 className="mb-2">Dr. Christopher</h4>
                                            <p className="m-0">Update Your Photo or Details.</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="mt-5 pt-5">
                                <Form>
                                    <div className="mb-5 pb-5 border-bottom">
                                        <h4 className="mb-4">Personal Detail</h4>
                                        <Row>
                                            <Col lg="4" md="6" className="">
                                                <Form.Control type="text" placeholder="Your First Name *" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                <Form.Control type="text" placeholder="Your Last Name *" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-lg-0 mt-4">
                                                <Form.Control type="email" placeholder="E-mail Address *" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-4">
                                                <Form.Control type="email" placeholder="Phone Number *" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-4">
                                                <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="Date Of Birth *" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-4">
                                                <ChoicesJs options={options} className="js-choice" select="one" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mb-5 pb-5 border-bottom">
                                        <h4 className="mb-4">Change Password</h4>
                                        <Row>
                                            <Col lg="4" md="6">
                                                <Form.Control type="password" placeholder="Enter Old Password" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                <Form.Control type="password" placeholder="Enter New Password" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-lg-0 mt-4">
                                                <Form.Control type="password" placeholder="Enter Confirm Password" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mb-5 pb-5 border-bottom">
                                        <h4 className="mb-4">Hospital Detail</h4>
                                        <Row>
                                            <Col lg="4" md="6">
                                                <Form.Control type="text" placeholder="Hospital Name" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                <Form.Control type="text" placeholder="Hospital Address" />
                                            </Col>
                                            <Col lg="4" md="6" className="mt-lg-0 mt-4">
                                                <Form.Control type="email" placeholder="Hospital E-mail Address" />
                                            </Col>
                                            <Col lg="3" className="d-lg-block d-none"></Col>
                                            <Col lg="6" className="col-md-6 mt-4">
                                                <div className="form-upload position-relative form-control text-center">
                                                    <Form.Control type="file" id="upload-file" className="position-absolute top-0 bottom-0 start-0 end-0 z-index-1 w-100 opacity-0 cursor-pointer" />
                                                    <span className="d-inline-block">Drop Your Hospital Images Here</span>
                                                </div>
                                            </Col>
                                            <Col lg="3" className="d-lg-block d-none"></Col>
                                        </Row>
                                    </div>
                                    <div className="mt-5">
                                        <h4 className="mb-5">Weekly Schedule</h4>
                                        <div className="border py-4 px-5 rounded">
                                            <div className="form-collapse mb-3 pb-3 border-bottom">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Monday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>
                                                        {" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen(!open)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open} className="mt-5">
                                                    <div>
                                                        <Row>
                                                            <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                            </Col>
                                                            <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                            </Col>
                                                            <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                                <Button variant='light-subtle' type='button' className="w-100 h-100">I am on Holiday</Button>
                                                            </Col>
                                                            <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                                <Button type='button' variant='outline-primary ' className="w-100 h-100">Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div className="form-collapse mb-3 pb-3 border-bottom">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Tuesday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>{" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open1 ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen1(!open1)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open1} className="mt-5">
                                                    <Row>
                                                        <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button variant='light-subtle' type='button' className="w-100">I am on Holiday</Button>
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button type='button' variant='outline-primary ' className="w-100">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                            <div className="form-collapse mb-3 pb-3 border-bottom">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Wednesday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>{" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open2 ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen2(!open2)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open2} className="mt-5">
                                                    <Row>
                                                        <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button variant='light-subtle' type='button' className="w-100">I am on Holiday</Button>
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button type='button' variant='outline-primary ' className="w-100">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                            <div className="form-collapse mb-3 pb-3 border-bottom">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Thursday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>{" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open3 ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen3(!open3)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open3} className="mt-5">
                                                    <Row>
                                                        <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button variant='light-subtle' type='button' className="w-100">I am on Holiday</Button>
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button type='button' variant='outline-primary ' className="w-100">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                            <div className="form-collapse mb-3 pb-3 border-bottom">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Friday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>{" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open4 ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen4(!open4)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open4} className="mt-5">
                                                    <Row>
                                                        <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button variant='light-subtle' type='button' className="w-100">I am on Holiday</Button>
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button type='button' variant='outline-primary ' className="w-100">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                            <div className="form-collapse mb-3 pb-3 border-bottom">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Saturday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>{" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open5 ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen5(!open5)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open5} className="mt-5">
                                                    <Row>
                                                        <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button variant='light-subtle' type='button' className="w-100">I am on Holiday</Button>
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button type='button' variant='outline-primary ' className="w-100">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                            <div className="form-collapse">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-sm-row flex-column">
                                                    <div className="collapse-title">
                                                        <h6 className="mb-0">Sunday</h6>
                                                    </div>
                                                    <div className="edit-date">
                                                        <span className="me-3">09:00 am to 06:00 pm</span>{" "}
                                                        <span
                                                            className={`edit-date-icon cursor-pointer ${open6 ? "text-danger" : "text-primary"}`}
                                                            onClick={() => setOpen6(!open6)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                    stroke="currentColor" strokeWidth="1.5"
                                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                    strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Collapse in={open6} className="mt-5">
                                                    <Row>
                                                        <Col lg="4" md="6">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Starting Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="4" md="6" className="mt-md-0 mt-4">
                                                                <Flatpickr options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", }} placeholder="Ending Time" className="form-control time_flatpicker " />
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button variant='light-subtle' type='button' className="w-100">I am on Holiday</Button>
                                                        </Col>
                                                        <Col lg="2" md="6" className="mt-md-0 mt-4">
                                                            <Button type='button' variant='outline-primary ' className="w-100">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Setting
