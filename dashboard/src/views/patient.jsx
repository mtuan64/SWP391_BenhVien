import React from 'react'
import { Fragment, useState } from 'react'

import { Link } from 'react-router-dom';

// react-botstrap
import { Button, Form, FormCheck } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
// import Pagination from 'react-bootstrap/Pagination';

// Sweetalert
import Swal from "sweetalert2";

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

//Flatpicker
import Flatpickr from "react-flatpickr";

const Patient = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

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

    const patientlist = [
        {
            sr: 1,
            id: "#14356",
            patientname: "Isabella Brown",
            age: 23,
            phone: "+1 345 675 345",
            date: "24 May - 10:00 AM",
            gender: "Female",
            reason: "Vaccination",
            bloodgroup: "O +ve",
            drname: "Dr. David Johnson",
        },
        {
            sr: 2,
            id: "#14678",
            patientname: "Daniel White",
            age: 25,
            phone: "+1 555-123-4567",
            date: "30 May - 10:00 AM",
            gender: "Male",
            reason: "Gen. Check-Up",
            bloodgroup: "O +ve",
            drname: "Dr. Benjamin Davis",
        },
        {
            sr: 3,
            id: "#12431",
            patientname: "Ashley Garcia",
            age: 19,
            phone: "+44 20 1234 5678",
            date: "16 Jun - 10:00 AM",
            gender: "Female",
            reason: "Vaccination",
            bloodgroup: "B +ve",
            drname: "Dr. Emily Thompson",
        },
        {
            sr: 4,
            id: "#21356",
            patientname: "Jonathan Thomas",
            age: 20,
            phone: "+1 416-555-7890",
            date: "17 Jul - 10:00 AM",
            gender: "Female",
            reason: "Follow-up visit",
            bloodgroup: "A +ve",
            drname: "Dr. Olivia Wilson",
        },
        {
            sr: 5,
            id: "#65783",
            patientname: "Sophia Wilson",
            age: 28,
            phone: "+61 2 9876 5432",
            date: "09 Aug - 10:00 AM",
            gender: "Female",
            reason: "Flu Symptoms",
            bloodgroup: "AB -ve",
            drname: "Dr. Ethan Rodriguez",
        },
        {
            sr: 6,
            id: "#12567",
            patientname: "Benjamin Chen",
            age: 29,
            phone: "+49 30 12345678",
            date: "13 Aug - 10:00 AM",
            gender: "Male",
            reason: "Flu Symptoms",
            bloodgroup: "O +ve",
            drname: "Dr. Alexandra",
        },
        {
            sr: 7,
            id: "#15342",
            patientname: "Samantha Davis",
            age: 30,
            phone: "+33 1 2345 6789",
            date: "24 Sep - 10:00 AM",
            gender: "Male",
            reason: "Dental Cleaning",
            bloodgroup: "O +ve",
            drname: "Dr. Matthew",
        }
    ]

    return (
        <Fragment>
            <TopNav title="Patient" />
            <Card>
                <Card.Header className='flex-wrap gap-3'>
                    <div>
                        <h4>All Patient</h4>
                        <span>More Than 400+ New Payments</span>
                    </div>
                    <Button variant="primary" onClick={handleShow}>
                        <span className="btn-inner">
                            <span className="text d-inline-block align-middle">Add Patient</span>{" "}
                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path
                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                        </span>
                    </Button>
                </Card.Header>
                <Card.Body className="pt-0">
                    <div className="table-responsive">
                        <table className="table border-end border-start align-middle mb-0 rounded">
                            <thead className="table-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>ID</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Phone Number</th>
                                    <th>Date & Time</th>
                                    <th>Gender</th>
                                    <th>Reason</th>
                                    <th>Blood Group</th>
                                    <th>Doctor Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientlist.map((item, index) => (
                                    <tr data-item="list" key={index}>
                                        <th scope="row">{item.sr}</th>
                                        <td>{item.id}</td>
                                        <td>
                                            <h6 className="mb-0 text-body fw-normal">{item.patientname}</h6>
                                        </td>
                                        <td>{item.age}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.date}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.bloodgroup}</td>
                                        <td>{item.drname}</td>
                                        <td>
                                            <a variant="" className='d-inline-block pe-2' onClick={handleShow1}>
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
                                            <Link href="#" className="d-inline-block ps-2 delete-btn" onClick={deleteBtn}>
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
                        </table>
                    </div>
                </Card.Body>
                <Card.Footer className="pt-0">
                    <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <ul className="page-number m-0 p-0 list-unstyled d-flex gap-2">
                            <li className="text-center bg-primary text-white rounded">1</li>
                            <li className="text-center bg-primary-subtle text-dark rounded">2</li>
                            <li className="text-center text-dark rounded">...</li>
                            <li className="text-center bg-primary-subtle text-dark rounded">6</li>
                        </ul>
                        <div>
                            <Button className="btn-secondary text-white me-3" type="button">
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Previous</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                            </Button>{" "}
                            <Button className="btn-primary me-3" type="button">
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Next</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

            {/* Add offcanvas */}
            <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title as="h3">Add Patient</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Patient Id <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Age </Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date And Time <span className="text-danger">*</span></Form.Label>
                            <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="Select Date... " />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex align-items-center gap-3">
                                <Form.Check className="">
                                    <FormCheck.Input
                                        type="radio"
                                        name="radios"
                                        className="me-1"
                                        id="exampleRadio1"
                                    />
                                    <FormCheck.Label className="" htmlFor="exampleRadio1">
                                        Male
                                    </FormCheck.Label>
                                </Form.Check>
                                <Form.Check className="">
                                    <FormCheck.Input
                                        type="radio"
                                        name="radios"
                                        className="me-1"
                                        id="exampleRadio2"
                                    />
                                    <FormCheck.Label className="" htmlFor="exampleRadio1">
                                        Female
                                    </FormCheck.Label>
                                </Form.Check>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Reason <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Blood Group <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doctor Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" variant='primary' className="d-block">
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
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title as="h3">Edit Patient</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Patient Id <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="#14356" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Isabella Brown" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Age </Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="23" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="+1 345 675 345" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date And Time <span className="text-danger">*</span></Form.Label>
                            <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="2023-05-24" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex align-items-center gap-3">
                                <Form.Check className="">
                                    <FormCheck.Input type="radio" name="radios" className="me-1" id="exampleRadio1" />
                                    <FormCheck.Label className="" htmlFor="exampleRadio1">Male</FormCheck.Label>
                                </Form.Check>
                                <Form.Check className="">
                                    <FormCheck.Input type="radio" name="radios" className="me-1" id="exampleRadio1" defaultChecked />
                                    <FormCheck.Label className="" htmlFor="exampleRadio1">Female</FormCheck.Label>
                                </Form.Check>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Reason <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Vaccination" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Blood Group <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="O +ve" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doctor Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Dr. David Johnson" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" variant='primary' className="d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Update</span>
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                        <Button variant='secondary' className="d-block" type="button" aria-label="Close" onClick={handleClose1}>
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
        </Fragment>
    )
}

export default Patient
