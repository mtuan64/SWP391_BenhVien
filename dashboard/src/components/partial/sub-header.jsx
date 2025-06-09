import React, { memo, useState } from 'react'

//React-bootstrap
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ChoicesJs from '../../components/choices';

//Router
import { Link } from 'react-router-dom'

//Img
import topHeader from '/assets/images/dashboard/top-header.png'

//Flatpicker
import Flatpickr from "react-flatpickr";

//select
const options = [
    { value: 'CareWell Clinic', label: 'CareWell Clinic' },
    { value: 'Vitality Medical Center', label: 'Vitality Medical Center' },
    { value: 'Harmony Health Clinic', label: 'Harmony Health Clinic' },
    { value: 'Serene Care Clinic', label: 'Serene Care Clinic' },
    { value: 'Wellness Solutions Center', label: 'Wellness Solutions Center' },
    { value: 'Tranquil Care Clinic', label: 'Tranquil Care Clinic' }
]
const options1 = [
    { value: 'Amine Louis', label: 'Amine Louis' },
    { value: 'Alexandra Johnson', label: 'Alexandra Johnson' },
    { value: 'Benjamin Davis', label: 'Benjamin Davis' },
    { value: 'Emily Thompson', label: 'Emily Thompson' },
    { value: 'Christopher Martinez', label: 'Christopher Martinez' },
    { value: 'Olivia Wilson', label: 'Olivia Wilson' }
]
const options2 = [
    { value: 'Holistic Wellness Consultation', label: 'Holistic Wellness Consultation' },
    { value: 'Advanced Diagnostic Imaging', label: 'Advanced Diagnostic Imaging' },
    { value: 'Nutritional Counseling', label: 'Nutritional Counseling' },
    { value: 'Pain Management Therapy', label: 'Pain Management Therapy' },
    { value: 'Aesthetic Dermatology Treatments', label: 'Aesthetic Dermatology Treatments' },
    { value: 'Sports Injury Rehabilitation', label: 'Sports Injury Rehabilitation' }
]
const options3 = [
    { value: 'Isabella Brown', label: 'Isabella Brown' },
    { value: 'Daniel White', label: 'Daniel White' },
    { value: 'Ashley Garcia', label: 'Ashley Garcia' },
    { value: 'Jonathan Thomas', label: 'Jonathan Thomas' },
    { value: 'Sophia Wilson', label: 'Sophia Wilson' },
    { value: 'Benjamin Chen', label: 'Benjamin Chen' }
]
const options4 = [
    { value: 'Booked', label: 'Booked' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Check out', label: 'Check out' },
    { value: 'Check in', label: 'Check in' },
    { value: 'Cancelled', label: 'Cancelled' }
]

const SubHeader = memo((props) => {
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="iq-navbar-header">
            <Container fluid className=" iq-container">
                <Row>
                    <Col md="12">
                        <div className="flex-wrap d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h1 className="fw-bold mb-0">Hello KiviCare!</h1>
                            </div>
                            <Button className="btn-secondary" onClick={handleShow}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Appointment</span>{" "}
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
                    </Col>
                </Row>
            </Container>
            {/* {{!-- rounded-bottom if not using animation --}} */}
            <div className="iq-header-img">
                <img src={topHeader} alt="header" className="theme-color-default-img img-fluid w-100 h-100" loading="lazy" />
            </div>

            <Offcanvas show={show} placement="end" className="offcanvas-breadcrumb" onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title as="h3">Appointment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3 custom-choicejs">
                                <Form.Label className="form-label">Select Clinic <span className="text-danger">*</span></Form.Label>
                                <ChoicesJs options={options} className="js-choice" select="one" />
                            </Form.Group>
                            <Form.Group className="mb-3 custom-choicejs">
                                <Form.Label className="form-label">Doctor <span className="text-danger">*</span></Form.Label>
                                <ChoicesJs options={options1} className="js-choice" select="one" />
                            </Form.Group>
                            <Form.Group className="mb-3 custom-choicejs">
                                <Form.Label className="form-label">Service <span className="text-danger">*</span></Form.Label>
                                <ChoicesJs options={options2} className="js-choice" select="one" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="form-label" htmlFor="datetime">Date And Time <span className="text-danger">*</span></Form.Label>
                                <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="2023-07-02" />
                            </Form.Group>
                            <Form.Group className="mb-3 custom-choicejs">
                                <Form.Label className="form-label">Patient <span className="text-danger">*</span></Form.Label>
                                <ChoicesJs options={options3} className="js-choice" select="one" />
                            </Form.Group>
                            <Form.Group className="mb-3 custom-choicejs">
                                <Form.Label className="form-label">Status <span className="text-danger">*</span></Form.Label>
                                <ChoicesJs options={options4} className="js-choice" select="one" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="form-label" htmlFor="profile_image">Add Medical Report </Form.Label>
                                <Form.Control type="file" id="profile_image" accept=".jpeg, .jpg, .png, .gif" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Available Slot <span className="text-danger">*</span></Form.Label>
                                <div className="p-3 border rounded-3">
                                    <ButtonGroup aria-label="Basic example" className="flex-wrap gap-2">
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">09:30AM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">10:00AM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">10:30AM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">11:00AM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">11:30AM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">12:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">12:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">01:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">01:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">02:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">02:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">03:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">03:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">04:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">04:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">05:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">05:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">06:00PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">06:30PM</Button>
                                        <Button variant='outline-light' className="font-size-14 fw-light text-body p-1 rounded">07:00PM</Button>
                                    </ButtonGroup>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                                <textarea className='form-control' rows='2' placeholder="Provide Description"></textarea>
                            </Form.Group>
                        </Col>
                    </Row>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button variant='primary' type="submit" className="d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Save</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                        <Button variant='secondary' className="d-block" type="button" aria-label="Close" onClick={handleClose}>
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Cancel</span>{' '}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>
            </Offcanvas>
        </div>

    )
})

SubHeader.displayName = "SubHeader"
export default SubHeader
