
import React from 'react'
import { useState, Fragment, memo } from 'react'
import { CardBody, Row, Col, Button, Form, Card, CardHeader  } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Dropdown } from "react-bootstrap";


//full calender
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from "@fullcalendar/list"
import bootstrapPlugin from '@fullcalendar/bootstrap';

//Moment
import moment from "moment";

//Flatpicker
import Flatpickr from "react-flatpickr";

import ChoicesJs from '../components/choices'
  
//select
const options = [
    { value: 'Select', label: 'Select' },
    { value: 'Anesthetics', label: 'Anesthetics' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'ENT', label: 'ENT' },
    { value: 'Gastroenterology', label: 'Gastroenterology' },
]


const PatientAppointment = () => {

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : r;
            return v.toString(16);
        });
    }

    const events= 
        [
        {
            id: uuidv4(),
            title: 'Regular Checkup',
            drname:'Dr.Stuart Jonas',
            start: moment(new Date(), 'YYYY-MM-DD').add(-22, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
            backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)',
            textColor: 'var(--bs-primary)'
        },
        {
            id: uuidv4(),
            title: 'Skin Treatment',
            drname:'Dr.Amine louis',
            start: moment(new Date(), 'YYYY-MM-DD').add(-6, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
            backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)',
            textColor: 'var(--bs-primary)'
        },
        {
            id: uuidv4(),
            title: 'Cardiologist',
            drname: 'Dr.Keino Shine',
            start: moment(new Date(), 'YYYY-MM-DD').add(-1, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
            backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)',
            textColor: 'var(--bs-primary)'
        },
        
        {
            id: uuidv4(),
            title: 'Dentist',
            drname: 'Dr.Olivia Wilson',
            start: moment(new Date(), 'YYYY-MM-DD').add(4, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
            backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)',
            textColor: 'var(--bs-primary)'
        }
      ]
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-5 gap-3 flex-wrap">
                <div>
                    <h1 className="mt-5">Appointments</h1>
                    <span className="mb-4">Your All Appointment Schedule Is Here.Check Now!</span>
                </div>
                <Button onClick={handleShow}>
                    <span className="btn-inner">
                        <span className="text d-inline-block align-middle">Add Appointment</span>
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
            <Row>
                <Col lg="12" className='calendar-s'>
                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col lg="6" md="4">
                                    <Dropdown className="dropdown text-end">
                                    <Dropdown.Toggle className="arrow dropdown btn border text-body p-33 mb-3 mb-md-0 rounded" id="dropdownMenuAppReq">
                                        <svg className="icon-30 bg-primary-subtle p-1 me-2" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M3 16.87V9.25699H21V16.931C21 20.07 19.0241 22 15.8628 22H8.12733C4.99561 22 3 20.03 3 16.87ZM7.95938 14.41C7.50494 14.431 7.12953 14.07 7.10977 13.611C7.10977 13.151 7.46542 12.771 7.91987 12.75C8.36443 12.75 8.72997 13.101 8.73985 13.55C8.7596 14.011 8.40395 14.391 7.95938 14.41ZM12.0198 14.41C11.5653 14.431 11.1899 14.07 11.1701 13.611C11.1701 13.151 11.5258 12.771 11.9802 12.75C12.4248 12.75 12.7903 13.101 12.8002 13.55C12.82 14.011 12.4643 14.391 12.0198 14.41ZM16.0505 18.09C15.596 18.08 15.2305 17.7 15.2305 17.24C15.2206 16.78 15.5862 16.401 16.0406 16.391H16.0505C16.5148 16.391 16.8902 16.771 16.8902 17.24C16.8902 17.71 16.5148 18.09 16.0505 18.09ZM11.1701 17.24C11.1899 17.7 11.5653 18.061 12.0198 18.04C12.4643 18.021 12.82 17.641 12.8002 17.181C12.7903 16.731 12.4248 16.38 11.9802 16.38C11.5258 16.401 11.1701 16.78 11.1701 17.24ZM7.09989 17.24C7.11965 17.7 7.49506 18.061 7.94951 18.04C8.39407 18.021 8.74973 17.641 8.72997 17.181C8.72009 16.731 8.35456 16.38 7.90999 16.38C7.45554 16.401 7.09989 16.78 7.09989 17.24ZM15.2404 13.601C15.2404 13.141 15.596 12.771 16.0505 12.761C16.4951 12.761 16.8507 13.12 16.8705 13.561C16.8804 14.021 16.5247 14.401 16.0801 14.41C15.6257 14.42 15.2503 14.07 15.2404 13.611V13.601Z"
                                                    fill="currentColor"></path>
                                                <path opacity="0.4"
                                                    d="M3.00336 9.2569C3.0162 8.6699 3.0656 7.5049 3.15846 7.1299C3.63267 5.0209 5.24298 3.6809 7.54485 3.4899H16.4559C18.738 3.6909 20.3681 5.0399 20.8423 7.1299C20.9342 7.4949 20.9836 8.6689 20.9964 9.2569H3.00336Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M8.30486 6.59C8.73955 6.59 9.06556 6.261 9.06556 5.82V2.771C9.06556 2.33 8.73955 2 8.30486 2C7.87017 2 7.54416 2.33 7.54416 2.771V5.82C7.54416 6.261 7.87017 6.59 8.30486 6.59Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M15.6949 6.59C16.1197 6.59 16.4556 6.261 16.4556 5.82V2.771C16.4556 2.33 16.1197 2 15.6949 2C15.2603 2 14.9342 2.33 14.9342 2.771V5.82C14.9342 6.261 15.2603 6.59 15.6949 6.59Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                            <span className="fw-500 text-primary">All Appointments</span>{' '}
                                            <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                        <Dropdown.Item href="#">View</Dropdown.Item>
                                        <Dropdown.Item href="#">Delete</Dropdown.Item>
                                        <Dropdown.Item href="#">Edit</Dropdown.Item>
                                        <Dropdown.Item href="#">Print</Dropdown.Item>
                                        <Dropdown.Item href="#">Download</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col lg="6" md="8" className="text-sm-start text-md-end">
                                    <div className="btn-toolbar d-inline-flex  gap-3 flex-wrap mb-0 flex-column flex-md-row">
                                        <div className="form-group input-group mb-0 search-input">
                                            <span className="input-group-text">
                                                <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5"
                                                    strokeLinecap="round" strokeLinejoin="round"></circle>
                                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5"
                                                    strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </span>
                                            <Form.Control type="text" placeholder="Search..." />
                                            </div>
                                        <div>
                                            <Button variant="outline-primary" className="px-4">
                                                <span className="btn-inner">
                                                    <span className="text d-inline-block align-middle">Find Appointments</span>
                                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                                            viewBox="0 0 8 8" fill="none">
                                                            <path
                                                                d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="pt-0">
                            {/* <div id="bookingcalendar" className="rounded overflow-hidden"></div> */}
                            <FullCalendar   
                                className='calendar-s'             
                                plugins={[ dayGridPlugin,listPlugin,bootstrapPlugin, ]}
                                headerToolbar={{
                                    
                                    left:'prev,next today',
                                    center:'title',
                                    right:'dayGridMonth,dayGridWeek,dayGridDay',
                                    
                                }}
                           events={events}
                                    />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* Add offcanvas */}
            <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                    <Offcanvas.Header closeButton className='border-bottom'>
                        <Offcanvas.Title as="h3">Add Appointment</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="form-group col-md-12">
                            <Form.Group className="mb-3">
                                <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control"  />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Doctor Name</Form.Label>
                                <Form.Control type="text" className="form-control" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date And Time <span className="text-danger">*</span></Form.Label>
                                <Flatpickr options={{ minDate: "today"}} className="form-control flatpickrdate"  />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Services<span className="text-danger">*</span></Form.Label>
                                <ChoicesJs options={options} className="js-choice" select="one" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                                <textarea className='form-control' rows='2' placeholder="Provide Description"></textarea>
                            </Form.Group>
                        </div>
                    </Offcanvas.Body>
                    <div className="offcanvas-footer border-top">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block">  
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Save</span>
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

        </Fragment>
    )
}

export default PatientAppointment