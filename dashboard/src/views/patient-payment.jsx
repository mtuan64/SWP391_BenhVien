import React from 'react'
import { useState, Fragment, memo } from 'react'

// react-botstrap
import { Card, Row, Col, Button, CardHeader, CardBody, Table, Form } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';

// react-router
import { Link } from "react-router-dom";

//Flatpicker
import Flatpickr from "react-flatpickr";

const PatientPayment = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const patientPaymentList = [
        {
            No: 1,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare skin specialist",
            Name:"Dr. Amine Louis",
            Date:"24 Apr At 10:00 AM",
        },
        {
            No: 2,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare dentist",
            Name:"Dr. Alexandra Johnson",
            Date:"28 Mar At 12:00 PM",
        },
        {
            No: 3,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare skin specialist",
            Name:"Dr. Benjamin Davis",
            Date:"30 Mar At 04:00 PM",
        },
        {
            No: 4,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare eye care",
            Name:"Dr. Emily Thompson",
            Date:"06 Feb At 10:00 AM",
        },
        {
            No: 5,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare general",
            Name:"Dr. Christopher Martinez",
            Date:"06 Jan At 11:00 AM",
        },
        {
            No: 6,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare general",
            Name:"Dr. Olivia Wilson",
            Date:"08 Jan At 10:30 AM",
        },
        {
            No: 7,
            Pdf: "Invoice Pdf 1",
            Clinic: "kivicare general",
            Name:"Dr. Ethan Rodriguez",
            Date:"13 Jan At 01:00 PM",
        }
    ]
    return (
        <Fragment>
            <div className='mt-5'>
                <h1 className='mb-3'>Payments</h1>
                <span className='mx-0 text-capitalize">your check your payment records in detail.'></span>
            </div>
            <Row className="mt-5 mb-5">
                <Col lg="6">
                    <Card className="p-5">
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                            <div className="content">
                                <h3 className="mb-2">Payment Method</h3>
                                <span className="mx-0 text-capitalize">your credit card information.</span>
                            </div>
                            <Button type='button' variant='primary'>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Change</span>
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                        <div className="d-flex align-items-center gap-3 mt-5 flex-wrap">
                            <div className="p-3 bg-white shadow">
                                <svg className='me-2' width="36" height="13" viewBox="0 0 36 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M9.00032 12.7412H5.88477L3.54848 3.09097C3.43759 2.64706 3.20214 2.25462 2.8558 2.06966C1.99146 1.60484 1.03902 1.23492 0 1.04835V0.676814H5.01891C5.7116 0.676814 6.23111 1.23492 6.31769 1.88309L7.52989 8.8441L10.6439 0.676814H13.6729L9.00032 12.7412ZM15.4049 12.7412H12.4625L14.8854 0.676814H17.8278L15.4049 12.7412ZM21.6342 4.02025C21.7208 3.37047 22.2403 2.99893 22.8464 2.99893C23.7988 2.90565 24.8363 3.09222 25.7022 3.55543L26.2217 0.957914C25.3559 0.586381 24.4034 0.399811 23.5391 0.399811C20.6833 0.399811 18.6052 2.0709 18.6052 4.39017C18.6052 6.15455 20.0772 7.08097 21.1162 7.63907C22.2403 8.19557 22.6732 8.5671 22.5866 9.1236C22.5866 9.95834 21.7208 10.3299 20.8564 10.3299C19.8174 10.3299 18.7784 10.0516 17.8275 9.58681L17.308 12.1859C18.347 12.6491 19.4711 12.8357 20.5101 12.8357C23.7122 12.9274 25.7022 11.2579 25.7022 8.75206C25.7022 5.59645 21.6342 5.41148 21.6342 4.02025ZM36.0001 12.7412L33.6638 0.676814H31.1543C30.6348 0.676814 30.1153 1.04835 29.9421 1.60484L25.6159 12.7412H28.6449L29.2495 10.9784H32.9711L33.3175 12.7412H36.0001ZM31.5872 3.92715L32.4515 8.47401H30.0287L31.5872 3.92715Z"
                                        fill="#172B85" />
                                </svg>
                            </div>
                            <div className="visa-content">
                                <h5 className="mb-2">Visa Credit Card </h5>
                                <h6 className="m-0 text-capitalize text-body">Expire In Year 2024</h6>
                            </div>
                        </div>
                        <div className="mt-5">
                            <ul className="list-inline m-0 p-0 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                <li>
                                    <div className="d-flex align-items-center gap-2">
                                        <h5 className="mb-0">
                                            <span className="text-primary"><svg className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg"
                                                    width="16" height="16" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z"
                                                        stroke="currentColor" strokeWidth="1.42857" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </span>Holder Name:
                                        </h5>
                                        <span>Amine Steward</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex align-items-center gap-2">
                                        <h5 className="mb-0">
                                            <span className="text-primary">
                                                <svg className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M11.5317 12.4724C15.5208 16.4604 16.4258 11.8467 18.9656 14.3848C21.4143 16.8328 22.8216 17.3232 19.7192 20.4247C19.3306 20.737 16.8616 24.4943 8.1846 15.8197C-0.493478 7.144 3.26158 4.67244 3.57397 4.28395C6.68387 1.17385 7.16586 2.58938 9.61449 5.03733C12.1544 7.5765 7.54266 8.48441 11.5317 12.4724Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </span>Phone Number:
                                        </h5>
                                        <Link href="tel:+6802023210" className="text-body">+ (680) 202-3210</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex align-items-center gap-2">
                                        <h5 className="mb-0">
                                            <span className="text-primary">
                                                <svg className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M17.9028 8.85107L13.4596 12.4641C12.6201 13.1301 11.4389 13.1301 10.5994 12.4641L6.11865 8.85107"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </span>Email:
                                        </h5>
                                        <Link href="mailto:amine@gmail.com" className="text-body">amine@gmail.com</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card className="p-5">
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                            <div className="content">
                                <h3 className="mb-2">Payment Method</h3>
                                <span className="mx-0 text-capitalize">your credit card information.</span>
                            </div>
                            <Button type='button' variant='primary'>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Change</span>
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                        <Row className="mt-5">
                            <Col md="6">
                                <ul className="list-inline m-0 p-0">
                                    <li className="mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="mb-0">
                                                Package:
                                            </h5>
                                            <span>Basic</span>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="mb-0">
                                                Membership Fee:
                                            </h5>
                                            <span><span className="text-danger">$25</span>/Year</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="mb-0">
                                                Start Date:
                                            </h5>
                                            <span>20 June, 2022</span>
                                        </div>
                                    </li>
                                </ul>
                            </Col>
                            <Col md="6" className='mt-md-0 mt-3'>
                                <ul className="list-inline m-0 p-0">
                                    <li className="mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="mb-0">
                                                Payment Method:
                                            </h5>
                                            <span>Visa Credit Card</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center gap-2">
                                            <h5 className="mb-0">
                                                Expire Date:
                                            </h5>
                                            <span>19 June, 2023</span>
                                        </div>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col className="mt-5">
                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col sm="6">
                                    <h4>Payments</h4>
                                    <p className="mb-0">Online Transaction History.</p>
                                </Col>
                                <Col sm="6" className="text-sm-end mt-sm-0 mt-4">
                                    <Link href="#" className="btn btn-primary" download><svg height="16" width="16" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1221 15.436L12.1221 3.39502" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M15.0381 12.5083L12.1221 15.4363L9.20609 12.5083" stroke="currentColor"
                                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path
                                            d="M16.7551 8.12793H17.6881C19.7231 8.12793 21.3721 9.77693 21.3721 11.8129V16.6969C21.3721 18.7269 19.7271 20.3719 17.6971 20.3719L6.55707 20.3719C4.52207 20.3719 2.87207 18.7219 2.87207 16.6869V11.8019C2.87207 9.77293 4.51807 8.12793 6.54707 8.12793L7.48907 8.12793"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg> Download All</Link>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className='pt-0'>
                        <div className='table-responsive'>
                            <Table className="table border-end border-start align-middle mb-0 rounded">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Invoice PDF</th>
                                        <th scope="col">Clinic Name Transaction</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date And Time</th>
                                        <th scope="col">Download</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {patientPaymentList.map((item, index) => (
                                    <tr data-item="list" key={index}>
                                        <th scope="row">{item.No}</th>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="text-secondary">
                                                    <svg width="32" height="31" viewBox="0 0 27 26" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <g>
                                                            <path d="M22.9346 15.4375H19.6846V21.125" stroke="currentColor"
                                                                strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M22.1221 18.6875H19.6846" stroke="currentColor"
                                                                strokeLinecap="round" strokeLinejoin="round" />
                                                            <path
                                                                d="M5.87207 19.5H7.49707C8.03579 19.5 8.55245 19.286 8.93338 18.9051C9.31431 18.5241 9.52832 18.0075 9.52832 17.4688C9.52832 16.93 9.31431 16.4134 8.93338 16.0324C8.55245 15.6515 8.03579 15.4375 7.49707 15.4375H5.87207V21.125"
                                                                stroke="currentColor" strokeLinecap="round"
                                                                strokeLinejoin="round" />
                                                            <path
                                                                d="M12.3721 15.4375V21.125H13.9971C14.7513 21.125 15.4746 20.8254 16.0079 20.2921C16.5412 19.7588 16.8408 19.0355 16.8408 18.2812C16.8408 17.527 16.5412 16.8037 16.0079 16.2704C15.4746 15.7371 14.7513 15.4375 13.9971 15.4375H12.3721Z"
                                                                stroke="currentColor" strokeLinecap="round"
                                                                strokeLinejoin="round" />
                                                            <path
                                                                d="M5.87207 11.375V4.0625C5.87207 3.84701 5.95767 3.64035 6.11005 3.48798C6.26242 3.3356 6.46908 3.25 6.68457 3.25H16.4346L22.1221 8.9375V11.375"
                                                                stroke="currentColor" strokeLinecap="round"
                                                                strokeLinejoin="round" />
                                                            <path d="M16.4346 3.25V8.9375H22.1221" stroke="currentColor"
                                                                strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                <h5 className="mb-0 text-body">{item.Pdf}</h5>
                                            </div>
                                        </td>
                                        <td>{item.Clinic}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Date}</td>
                                        <td>
                                            <Link href="#" className="text-body align-middle" download><svg className="me-2" height="16"
                                                    width="16" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.1221 15.436L12.1221 3.39502" stroke="currentColor"
                                                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    </path>
                                                    <path d="M15.0381 12.5083L12.1221 15.4363L9.20609 12.5083"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round"></path>
                                                    <path
                                                        d="M16.7551 8.12793H17.6881C19.7231 8.12793 21.3721 9.77693 21.3721 11.8129V16.6969C21.3721 18.7269 19.7271 20.3719 17.6971 20.3719L6.55707 20.3719C4.52207 20.3719 2.87207 18.7219 2.87207 16.6869V11.8019C2.87207 9.77293 4.51807 8.12793 6.54707 8.12793L7.48907 8.12793"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round"></path>
                                                </svg> Download</Link>
                                        </td>
                                        <td>
                                            <Button variant="" className='p-0 pe-2' onClick={handleShow}>
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
             {/* Edit offcanvas */}
             <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Payment</Offcanvas.Title>
                </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="form-group col-md-12">
                            <Form.Group className="mb-3">
                                <Form.Label>Pdf Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control" defaultValue="" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Upload Invoice Pdf </Form.Label>
                                <Form.Control type="file" className="form-control" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Clinic Name Transaction <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="name" className="form-control" defaultValue="kivicare skin specialist" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Doctor Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" className="form-control" defaultValue="Dr. Amine Louis" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date And Time  <span className="text-danger">*</span></Form.Label>
                                <Flatpickr options={{ minDate: "today"}} className="form-control flatpickrdate" placeholder="2023-05-24" />
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
                            <Button variant='secondary' className="d-block" type="button" aria-label="Close">  
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

export default PatientPayment