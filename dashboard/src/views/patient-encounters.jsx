import React from 'react'
import { useState, Fragment, memo} from 'react'

// react-botstrap
import { CardBody, Row, Col, Table, Button, Image,  Form  } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';
// react-router
import { Link } from "react-router-dom";

// Components
import Card from '../components/bootstrap/card'

//Flatpicker
import Flatpickr from "react-flatpickr";

import img1 from '/assets/images/dashboard/dr-amine-louis.png'
import img2 from '/assets/images/dashboard/dralexandrajohnson.png'
import img3 from '/assets/images/dashboard/dr-benjamin-davis.png'
import img4 from '/assets/images/dashboard/dr-emily-thompson.png'
import img5 from '/assets/images/dashboard/dr-christopher-martinez.png'
import img6 from '/assets/images/dashboard/dr-olivia-wilson.png'
import img7 from '/assets/images/dashboard/dr-ethan-rodriguez.png'


const PatientEncounters = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

        
    const patientEncountersList = [
        {
            No: 1,
            Profile: img1,
            Name:"Dr. Amine Louis",
            Clinic:"kivicare skin specialist",
            Visit:"24 Apr At 10:00 AM",
            Reason:"Acne Treatment",
            Note:"Half Of The Treatment Is Done.",
        },
        {
            No: 2,
            Profile: img2,
            Name:"Dr. Alexandra Johnson",
            Clinic:"kivicare dentist",
            Visit:"28 Mar At 12:00 PM",
            Reason:"Tooth Cleaning",
            Note:"-------",
        },
        {
            No: 3,
            Profile: img3,
            Name:"Dr. Benjamin Davis",
            Clinic:"kivicare skin specialist",
            Visit:"30 Mar At 04:00 PM",
            Reason:"Skin Whitening",
            Note:"-------",
        },
        {
            No: 4,
            Profile: img4,
            Name:"Dr. Emily Thompson",
            Clinic:"kivicare eye care",
            Visit:"06 Feb At 10:00 AM",
            Reason:"Eye Checkup",
            Note:"Decrease Eye Number.",
        },
        {
            No: 5,
            Profile: img5,
            Name:"Dr. Christopher Martinez",
            Clinic:"kivicare general",
            Visit:"06 Jan At 11:00 AM",
            Reason:"Regular",
            Note:"-------",
        },
        {
            No: 6,
            Profile: img6,
            Name:"Dr. Olivia Wilson",
            Clinic:"kivicare general",
            Visit:"08 Jan At 10:30 AM",
            Reason:"Fever",
            Note:"Just A Viral Fever.",
        },
        {
            No: 7,
            Profile: img7,
            Name:"Dr. Ethan Rodriguez",
            Clinic:"kivicare general",
            Visit:"13 Jan At 01:00 PM",
            Reason:"Malaria",
            Note:"-------",
        },
    ]

        return (
            <>
                <div className='d-flex align-items-sm-center align-items-start justify-content-between gap-5 flex-sm-row flex-column mt-5'>
                    <div>
                        <h1>Encounters</h1>
                        <span className="mx-0 text-capitalize">you check your total number of appointments and all other information.</span>
                    </div>
                    <Button variant="primary" onClick={handleShow}>
                        <span className="btn-inner">
                            <span className="text d-inline-block align-middle">Add New</span>
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
                <Row className='pt-5'>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <div className='table-responsive'>
                                    <Table className="table border-end border-start align-middle mb-0 rounded">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Doctors</th>
                                                <th scope="col">Clinic Name</th>
                                                <th scope="col">Last Visit</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col">Add Note</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patientEncountersList.map((item, index) => (
                                                <tr data-item="list" key={index}>
                                                    <th scope="row">{item.No}</th>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img src={item.Profile}
                                                                className="img-fluid flex-shrink-0 icon-40 object-fit-cover"
                                                                alt="dr-amine-louis" />
                                                            <h5 className="mb-0">{item.Name}</h5>
                                                        </div>
                                                    </td>
                                                    <td>{item.Clinic}</td>
                                                    <td>{item.Visit}</td>
                                                    <td>{item.Reason}</td>
                                                    <td>{item.Note}</td>
                                                    <td>
                                                        <Button variant="" className='p-0 pe-2' onClick={handleShow1}>
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
                                                        </Button>
                                                        <Link href="#" className="d-inline-block ps-2 delete-btn">
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
                            </CardBody>
                            <Card.Footer className="pt-0">
                                <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                                    <Pagination className="page-number gap-2">
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Item>{2}</Pagination.Item>
                                        <Pagination.Ellipsis />
                                        <Pagination.Item>{6}</Pagination.Item>
                                    </Pagination>
                                    <div>
                                        <Button variant='secondary' className="me-3">
                                            <span className="btn-inner">
                                                <span className="text d-inline-block align-middle">Previous</span>
                                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                                    </svg>
                                                </span>
                                            </span>
                                        </Button>
                                        <Button variant='primary' className="me-3">
                                            <span className="btn-inner">
                                                <span className="text d-inline-block align-middle">Next</span>
                                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                                    </svg>
                                                </span>
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                {/* Add offcanvas */}
                <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                    <Offcanvas.Header closeButton className='border-bottom'>
                        <Offcanvas.Title as="h3">Add Encounters</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="form-group col-md-12">
                            <Form.Group className="mb-3">
                                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control"  />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Profile Image </Form.Label>
                                <Form.Control type="file" className="form-control" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Clinic Name * <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Last Visit <span className="text-danger">*</span></Form.Label>
                                <Flatpickr options={{ minDate: "today"}} className="form-control flatpickrdate" placeholder="2023-05-24" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Reason <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control"  />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type <span className="text-danger">*</span></Form.Label>
                                <textarea className='form-control' rows='2'></textarea>
                            </Form.Group>
                        </div>
                    </Offcanvas.Body>
                    <div className="offcanvas-footer border-top">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" variant='primary' className="d-block">  
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Save</span>
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                            <Button className="d-block" variant='secondary' type="button" aria-label="Close">  
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Close</span>
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
                    <Offcanvas.Header closeButton className='border-bottom'>
                        <Offcanvas.Title as="h3">Edit Encounters</Offcanvas.Title>
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
                                <Form.Label>Clinic Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="name" className="form-control" defaultValue="kivicare skin specialist" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Visit  <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control date_flatpicker flatpickr-input active" defaultValue="2024-02-19" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Reason <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control" defaultValue="Acne Treatment" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type <span className="text-danger">*</span></Form.Label>
                                <textarea className='form-control' rows='2' defaultValue="Half Of The Treatment Is Done." ></textarea>
                            </Form.Group>
                        </div>
                    </Offcanvas.Body>
                    <div className="offcanvas-footer border-top">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block">  
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Update</span>
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                            <Button className="btn btn-secondary d-block" type="button" aria-label="Close">  
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Close</span>
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

export default PatientEncounters