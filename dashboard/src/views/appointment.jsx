import React from "react";
import { useState } from 'react';

// react-botstrap
import { Row, Col, Tab, Nav, Button, Table, Image, Form } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
// import Pagination from 'react-bootstrap/Pagination';

// Sweetalert
import Swal from "sweetalert2";

// react-router
import { Link } from "react-router-dom";

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

import ChoicesJs from '../components/choices'

//Flatpicker
import Flatpickr from "react-flatpickr";

import img1 from '/assets/images/table/10.png'
import img2 from '/assets/images/table/11.png'
import img3 from '/assets/images/table/12.png'
import img4 from '/assets/images/table/13.png'
import img5 from '/assets/images/table/14.png'
import img6 from '/assets/images/table/15.png'
import img7 from '/assets/images/table/16.png'

//select
const options = [
    { value: 'Select', label: 'Select' },
    { value: 'New Patient', label: 'New Patient' },
    { value: 'Old Patient', label: 'Old Patient' }
]
const options1 = [
    { value: 'Select', label: 'Select' },
    { value: 'New Patient', label: 'New Patient' },
    { value: 'Old Patient', label: 'Old Patient' }
]

const Appointment = () => {
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

    function deleteBtn() {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this item",
            icon: "error",
            confirmButtonColor: `rgb(192, 50, 33)`,
            showCancelButton: true,
            backdrop: `rgba(60,60,60,0.8)`,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
        });
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const appointmentUpcomingList = [
        {
            No: 1,
            Profile: img1,
            Name: "Courtney Henry",
            Email: "courntney@gmail.com",
            DOB: "24 May at 10:00 AM",
            Reason: "Acne Treatment",
            Type: "New Patient"
        },
        {
            No: 2,
            Profile: img2,
            Name: "Jerome Bell",
            Email: "jerome@gmail.com",
            DOB: "28 may at 12:00 PM",
            Reason: "Tooth Cleaning",
            Type: "New Patient"
        },
        {
            No: 3,
            Profile: img3,
            Name: "Darrell Steward",
            Email: "darrell@gmail.com",
            DOB: "30 May at 04:00 PM",
            Reason: "Skin Whitening",
            Type: "Old Patient"
        },
        {
            No: 4,
            Profile: img4,
            Name: "Esther Howard",
            Email: "esther@gmail.com",
            DOB: "06 June at 10:00 AM",
            Reason: "Eye Checkup",
            Type: "Old Patient"
        },
        {
            No: 5,
            Profile: img5,
            Name: "Floyd Miles",
            Email: "floyd@gmail.com",
            DOB: "06 June at 11:00 AM",
            Reason: "Regular",
            Type: "Old Patient"
        },
        {
            No: 6,
            Profile: img6,
            Name: "Guy Hawkins",
            Email: "guy@gmail.com",
            DOB: "08 June at 10:30 AM",
            Reason: "Fever",
            Type: "New Patient"
        },
        {
            No: 7,
            Profile: img7,
            Name: "Amine Steward",
            Email: "amine@gmail.com",
            DOB: "13 June at 01:00 PM",
            Reason: "Malaria",
            Type: "Old Patient"
        }
    ]

    const appointmentRequestList = [
        {
            No: 1,
            Profile: img1,
            Name: "Courtney Henry",
            Email: "courntney@gmail.com",
            DOB: "24 May at 10:00 AM",
            Reason: "Acne Treatment",
            Type: "New Patient"
        },
        {
            No: 2,
            Profile: img2,
            Name: "Jerome Bell",
            Email: "jerome@gmail.com",
            DOB: "28 may at 12:00 PM",
            Reason: "Tooth Cleaning",
            Type: "New Patient"
        },
        {
            No: 3,
            Profile: img3,
            Name: "Darrell Steward",
            Email: "darrell@gmail.com",
            DOB: "30 May at 04:00 PM",
            Reason: "Skin Whitening",
            Type: "Old Patient"
        },
        {
            No: 4,
            Profile: img4,
            Name: "Esther Howard",
            Email: "esther@gmail.com",
            DOB: "06 June at 10:00 AM",
            Reason: "Eye Checkup",
            Type: "Old Patient"
        },
        {
            No: 5,
            Profile: img5,
            Name: "Floyd Miles",
            Email: "floyd@gmail.com",
            DOB: "06 June at 11:00 AM",
            Reason: "Regular",
            Type: "Old Patient"
        },
        {
            No: 6,
            Profile: img6,
            Name: "Guy Hawkins",
            Email: "guy@gmail.com",
            DOB: "08 June at 10:30 AM",
            Reason: "Fever",
            Type: "New Patient"
        },
        {
            No: 7,
            Profile: img7,
            Name: "Amine Steward",
            Email: "amine@gmail.com",
            DOB: "13 June at 01:00 PM",
            Reason: "Malaria",
            Type: "Old Patient"
        },
    ]

    return (
        <>
            <TopNav title="Appointments" />
            <Row>
                <Col lg="12">
                    <Card>
                        <Tab.Container defaultActiveKey="first">
                            <div className="card-header">
                                <Row className="align-items-center gy-3">
                                    <Col md="4" lg="6" className="text-md-start">
                                        <h4>Appointments</h4>
                                        <p className="mb-0">6 appointment today</p>
                                    </Col>
                                    <Col md="8" lg="6" className="text-md-end">
                                        <div className="">
                                            <Nav as="ul" id="appointment-table-tab" role="tablist" className="nav nav-tabs d-inline-flex align-items-center gap-3 flex-wrap mb-0 px-0">
                                                <li>
                                                    <Button as="a" variant="primary" onClick={handleShow}>
                                                        <span className="btn-inner">
                                                            <span className="text d-inline-block align-middle">Add Appointment</span>{" "}
                                                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                                    <path
                                                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                                        fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <Nav.Link eventKey="first" variant="nav-link btn" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab" aria-controls="upcoming"
                                                        aria-selected="true">Upcoming</Nav.Link>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <Nav.Link eventKey="second" variant="nav-link btn" id="request-tab" data-bs-toggle="tab" data-bs-target="#request" type="button" role="tab" aria-controls="request"
                                                        aria-selected="true">Request</Nav.Link>
                                                </li>
                                            </Nav>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Card.Body className="pt-0">
                                <Tab.Content>
                                    <Tab.Pane className="fade show" eventKey="first" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                                        <div className="table-responsive">
                                            <Table className="table border-end border-start align-middle rounded">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Names</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Date And Time</th>
                                                        <th scope="col">Reason</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {appointmentUpcomingList.map((item, index) => (
                                                        <tr data-item="list" key={index}>
                                                            <th scope="row">{item.No}</th>
                                                            <td>
                                                                <div className="d-flex align-items-center gap-3">
                                                                    <img src={item.Profile} className="img-fluid flex-shrink-0 icon-40 object-fit-cover" alt="icon" />
                                                                    <h5 className="mb-0">{item.Name}</h5>
                                                                </div>
                                                            </td>
                                                            <td>{item.Email}</td>
                                                            <td>{item.DOB}</td>
                                                            <td>{item.Reason}</td>
                                                            <td>{item.Type}</td>
                                                            <td>
                                                                <a variant="" className="d-inline-block pe-2" onClick={handleShow1}>
                                                                    <span className="text-success">
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                                strokeWidth="1.5" strokeLinecap="round"
                                                                                strokeLinejoin="round" />
                                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                                d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                                stroke="currentColor" strokeWidth="1.5"
                                                                                strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                                strokeWidth="1.5" strokeLinecap="round"
                                                                                strokeLinejoin="round" />
                                                                        </svg>
                                                                    </span>
                                                                </a>{" "}
                                                                <Link to="#" className="d-inline-block ps-2 delete-btn" onClick={deleteBtn}>
                                                                    <span className="text-danger">
                                                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M12.4938 6.10107C12.4938 6.10107 12.0866 11.1523 11.8503 13.2801C11.7378 14.2963 11.1101 14.8918 10.0818 14.9106C8.12509 14.9458 6.16609 14.9481 4.21009 14.9068C3.22084 14.8866 2.60359 14.2836 2.49334 13.2853C2.25559 11.1388 1.85059 6.10107 1.85059 6.10107"
                                                                                stroke="currentColor" strokeWidth="1.5"
                                                                                strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M13.5312 3.67969H0.812744" stroke="currentColor"
                                                                                strokeWidth="1.5" strokeLinecap="round"
                                                                                strokeLinejoin="round" />
                                                                            <path
                                                                                d="M11.0804 3.67974C10.4917 3.67974 9.98468 3.26349 9.86918 2.68674L9.68693 1.77474C9.57443 1.35399 9.19343 1.06299 8.75918 1.06299H5.58443C5.15018 1.06299 4.76918 1.35399 4.65668 1.77474L4.47443 2.68674C4.35893 3.26349 3.85193 3.67974 3.26318 3.67974"
                                                                                stroke="currentColor" strokeWidth="1.5"
                                                                                strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane
                                        className="fade"
                                        eventKey="second"
                                        id="request"
                                        role="tabpanel"
                                        aria-labelledby="request-tab"
                                    >
                                        <div className="table-responsive">
                                            <Table className="border-end border-start align-middle rounded">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Names</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Date And Time</th>
                                                        <th scope="col">Reason</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {appointmentRequestList.map((item, index) => (
                                                        <tr data-item="list" key={index}>
                                                            <th scope="row">{item.No}</th>
                                                            <td>
                                                                <div className="d-flex align-items-center gap-3">
                                                                    <img src={item.Profile} className="img-fluid flex-shrink-0 icon-40 object-fit-cover" alt="icon" />
                                                                    <h6 className="mb-0">{item.Name}</h6>
                                                                </div>
                                                            </td>
                                                            <td>{item.Email}</td>
                                                            <td>{item.DOB}</td>
                                                            <td>{item.Reason}</td>
                                                            <td>{item.Type}</td>
                                                            <td>
                                                                <Button variant="" onClick={handleShow1} className="badge rounded-0 bg-success-subtle fw-500 px-3 py-2 border-0 me-2">Accept</Button>
                                                                {" "}
                                                                <Button className="badge rounded-0 bg-danger-subtle fw-500 px-3 py-2 border-0">Cancel</Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                                <div className="row align-items-center mt-4">
                                    <div className="col-sm-6">
                                        <span>Showing 01 to 07 of 20 entries</span>
                                    </div>
                                    <div className="col-sm-6 text-sm-end mt-sm-0 mt-3">
                                        <div className="d-inline-flex align-items-center gap-3 flex-wrap card-navigation">
                                            <a href="#" className="text-body link-primary">
                                                <svg className="icon-20" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>{" "}
                                                <span className="align-middle">Previous</span>
                                            </a>
                                            <a href="#" className="text-body link-primary">
                                                <span className="align-middle">Next</span>{" "}
                                                <svg className="icon-20" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>

            {/* Add offcanvas */}
            <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title as="h3">Add Appointments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Profile Image </Form.Label>
                            <Form.Control type="file" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="email" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date And Time <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control date_flatpicker flatpickr-input active" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Reason <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                        <Form.Group className="custom-choicejs">
                            <Form.Label>Type <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options} className="js-choice" select="one" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" className="btn btn-primary d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Save</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                        <Button className="btn btn-secondary d-block" type="button" aria-label="Close">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Close</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>
            </Offcanvas>

            {/* Edit offcanvas */}
            <Offcanvas show={show1} placement={'end'} onHide={handleClose1}>
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title as="h3">Edit Appointments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Courtney Henry" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Profile Image </Form.Label>
                            <Form.Control type="file" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="email" className="form-control" defaultValue="courntney@gmail.com" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date And Time <span className="text-danger">*</span></Form.Label>
                            <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="2023-07-02" defaultValue="2023-07-02" readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Reason <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Acne Treatment" />
                        </Form.Group>

                        <Form.Group className="mb-3 custom-choicejs">
                            <Form.Label>Type <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options1} className="js-choice" select="one" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" className="btn btn-primary d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Update</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                        <Button className="btn btn-secondary d-block" type="button" aria-label="Close"  onClick={handleClose1}>
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Close</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>
            </Offcanvas>
        </>
    )
}

export default Appointment;
