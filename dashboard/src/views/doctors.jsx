import React from 'react'
import { Fragment, useState } from 'react'


// react-botstrap
import { Col, Button, Form } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";
import DoctorInfo from '../components/widget/doctor-info';
import ChoicesJs from '../components/choices'

//select
const options = [
    { value: 'Select', label: 'Select' },
    { value: 'Pediatrician', label: 'Pediatrician' },
    { value: 'General Checkup', label: 'General Checkup' },
    { value: 'Psychiatrist', label: 'Psychiatrist' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Eye Care', label: 'Eye Care' },
    { value: 'Cardia', label: 'Cardia' },
    { value: 'Dentist', label: 'Dentist' },
    { value: 'Fertility', label: 'Fertility' }
]
const options1 = [
    { value: 'Select', label: 'Select' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Fryday', label: 'Fryday' },
    { value: 'Satuarday', label: 'Satuarday' },
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday - Friday', label: 'Monday - Friday' }
]

// Images
import img1 from '/assets/images/doctor/1.webp'
import img2 from '/assets/images/doctor/2.webp'
import img3 from '/assets/images/doctor/3.webp'
import img4 from '/assets/images/doctor/4.webp'
import img5 from '/assets/images/doctor/5.webp'
import img6 from '/assets/images/doctor/6.webp'
import img7 from '/assets/images/doctor/7.webp'
import img8 from '/assets/images/doctor/8.webp'
import img9 from '/assets/images/doctor/9.webp'

const Doctors = () => {

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

    const doctorlist = [
        {
            image: img1,
            DoctorName: "Dr.Amine Louis",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img2,
            DoctorName: "Dr. Emily Thompson",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img3,
            DoctorName: "Dr. Ethan Rodriguez",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img4,
            DoctorName: "Dr. Alexandra Johnson",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img5,
            DoctorName: "Dr. Christopher Martinez",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img6,
            DoctorName: "Dr. Samantha Taylor",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img7,
            DoctorName: "Dr. Benjamin Davis",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img8,
            DoctorName: "Dr. Olivia Wilson",
            DoctorCategory: "Skin Specialist",
            WorkingTime: "Monday - Friday",
            PatientList: "120 patients served",
        },
        {
            image: img9,
            DoctorName: "Dr. Matthew Anderson",
            DoctorCategory: "Skin Specialist",
            PatientList: "120 patients served",
        }
    ]

    return (
        <Fragment>
            <TopNav title="Doctors" />
            <Card>
                <Card.Header>
                    <div>
                        <h4>All Doctors</h4>
                        <span>More Than 25+ New Doctors</span>
                    </div>
                    <Button variant="primary" onClick={handleShow}>
                        <span className="btn-inner">
                            <span className="text d-inline-block align-middle">Add New</span>{" "}
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
                    <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-2 row-cols-1">
                        {doctorlist.map((item, index) => (
                            <Col key={index}>
                                <DoctorInfo
                                    image={item.image}
                                    DoctorName={item.DoctorName}
                                    DoctorCategory={item.DoctorCategory}
                                    WorkingTime={item.WorkingTime}
                                    PatientList={item.PatientList}
                                />
                            </Col>
                        ))}
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
                    <Offcanvas.Title as="h3">Add Doctor</Offcanvas.Title>
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

                        <Form.Group className="mb-3 custom-choicejs">
                            <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options} className="js-choice" select="one" />
                        </Form.Group>

                        <Form.Group className="custom-choicejs mb-3">
                            <Form.Label>Availability <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options} className="js-choice" select="one" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Patients Served </Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" variant="primary" className="d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Save</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>{" "}
                        <Button variant="secondary" className="d-block" type="button" aria-label="Close" onClick={handleClose}>
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
        </Fragment>
    )
}

export default Doctors
