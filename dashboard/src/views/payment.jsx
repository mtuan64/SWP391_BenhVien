import React from 'react'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

// react-botstrap
import { Dropdown, Button, Form, Table } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
// import Pagination from 'react-bootstrap/Pagination';

// Sweetalert
import Swal from "sweetalert2";

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

import ChoicesJs from '../components/choices'

//Flatpicker
import Flatpickr from "react-flatpickr";

//select
const options = [
    { value: 'Select', label: 'Select' },
    { value: 'Online', label: 'Online' },
    { value: 'Case', label: 'Case' },
]
const options2 = [
    { value: 'Select', label: 'Select' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Failed', label: 'Failed' },
    { value: 'Refunded', label: 'Refunded' },
    { value: 'Authorized', label: 'Authorized' },
    { value: 'Voided', label: 'Voided' },
    { value: 'Overdue', label: 'Overdue' },
]

const Payment = () => {
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

    const PaymentList = [
        {
            SrNo: "1",
            CustomerName: "Isabella Brown",
            DateTime: "24 May At 10:00 AM",
            PaymentMethod: "Cash",
            Amount: "$500",
            PaymentStatus: "Completed"
        },
        {
            SrNo: "2",
            CustomerName: "Daniel White",
            DateTime: "7 July At 02:15 PM",
            PaymentMethod: "Online",
            Amount: "$410",
            PaymentStatus: "Completed"
        },
        {
            SrNo: "3",
            CustomerName: "Ashley Garcia",
            DateTime: "23 July At 11:00 AM",
            PaymentMethod: "Online",
            Amount: "$150",
            PaymentStatus: "Completed"
        },
        {
            SrNo: "4",
            CustomerName: "Jonathan Thomas",
            DateTime: "13 Aug At 04:30 PM",
            PaymentMethod: "Online",
            Amount: "$390",
            PaymentStatus: "Completed"
        },
        {
            SrNo: "5",
            CustomerName: "Sophia Wilson",
            DateTime: "24 Aug At 06:45 PM",
            PaymentMethod: "Cash",
            Amount: "$235",
            PaymentStatus: "Completed"
        },
        {
            SrNo: "6",
            CustomerName: "Benjamin Chen",
            DateTime: "09 Sep At 01:00 PM",
            PaymentMethod: "Cash",
            Amount: "$220",
            PaymentStatus: "Completed"
        },
        {
            SrNo: "7",
            CustomerName: "Samantha Davis",
            DateTime: "23 Sep At 03:30 PM",
            PaymentMethod: "Online",
            Amount: "$370",
            PaymentStatus: "Completed"
        }
    ]

    return (
        <Fragment>
            <TopNav title="Payment" />
            <Card>
                <Card.Header>
                    <div>
                        <h4>All Payments</h4>
                        <span>More Than 400+ Payment</span>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle className="arrow dropdown btn btn-light-subtle border text-body py-2 px-3" id="dropdownMenuAppoinmentToday">
                            <span className="fw-500">Month</span>{' '}
                            <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                                    fill="currentColor" />
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                            <Dropdown.Item href="#">January</Dropdown.Item>
                            <Dropdown.Item href="#">February</Dropdown.Item>
                            <Dropdown.Item href="#">March</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body className="pt-0">
                    <div className="table-responsive">
                        <Table className="table border-end border-start align-middle mb-0 rounded">
                            <thead className="table-dark">
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Customer Name</th>
                                    <th>Date & Time</th>
                                    <th>Payment Method</th>
                                    <th>Amount</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PaymentList.map((item, index) => (
                                    <tr data-item="list" key={index}>
                                        <th scope="row">{item.SrNo}</th>
                                        <td>{item.CustomerName}</td>
                                        <td>{item.DateTime}</td>
                                        <td>{item.PaymentMethod}</td>
                                        <td>{item.Amount}</td>
                                        <td>{item.PaymentStatus}</td>
                                        <td>
                                            <a variant="" className='d-inline-block pe-2' onClick={handleShow}>
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
                        </Table>
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
            {/* Edit offcanvas */}
            <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title as="h3">Edit Payment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Isabella Brown" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date And Time <span className="text-danger">*</span></Form.Label>
                            <Flatpickr options={{ minDate: "today" }} className="form-control flatpickrdate" placeholder="2023-05-24" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Payment Method <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options} className="js-choice" select="one" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="$500" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Payment Status <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options2} className="js-choice" select="one" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" variant='primary' className="d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Update</span>{" "}
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
        </Fragment>
    )
}

export default Payment
