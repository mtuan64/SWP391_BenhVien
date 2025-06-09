import React, { Fragment, useState } from 'react'

// react-bootstrap
import { Col, Row, Button, Form, Image, Nav, Tab } from 'react-bootstrap'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

// react-router
import {Link} from 'react-router-dom'

// Widgets
import BreadCrumb from '../components/partial/BreadCrumb'

// Images
import clinic1 from '/assets/images/pages/clinic-1.webp'
import clinic2 from '/assets/images/pages/clinic-2.webp'
import dralexandrajohnson from '/assets/images/general/dralexandrajohnson.webp'
import drEmilyThompson from '/assets/images/general/dr-emily-thompson.webp'
import doctorHomeVisit from '/assets/images/general/doctor-home-visit.png'
import extraction from '/assets/images/general/extraction.webp'
import teethCleaning from '/assets/images/general/teeth-cleaning.webp'
import rootCanel from '/assets/images/general/root-canel.webp'
import paymentOffline from '/assets/images/general/payment-offline.png'
import paymentWoocommerce from '/assets/images/general/payment-woocommerce.png'
import paymentPaypal from '/assets/images/general/payment-paypal.png'

export default function Appointment() {
  const [show, setShow] = useState("clinic");
  const clinicData = [
    {
      clinicId: "clinic1",
      clinicImage: clinic1,
      clinicName: "Miracle Clinic",
      clinicAddress: "3/e, Naaz Bldg, Lamington Road, Mumbai, 400004, India",
      clinicEmail: "miracle_clinic@kivicare.com"
    },
    {
      clinicId: "clinic2",
      clinicImage: clinic2,
      clinicName: "Valley Clinic",
      clinicAddress: "3/e, Naaz Bldg, Lamington Road, Mumbai, 400004, India",
      clinicEmail: "valley_clinic@kivicare.com"
    }
  ]
  const doctorData = [
    {
      doctorId: "doc1",
      doctorImage: dralexandrajohnson,
      doctorName: "Alexandra Johnson",
      doctorExp: "Exp: 2yr",
      doctorEmail: "alexandra_johnson@kivicare.com"
    },
    {
      doctorId: "doc2",
      doctorImage: drEmilyThompson,
      doctorName: "Emily Thompson",
      doctorExp: "Exp: 2yr",
      doctorEmail: "emily_thompson@kivicare.com"
    }
  ]
  const serviceOtherData = [
    {
      serviceId: "service01",
      serviceImage: doctorHomeVisit,
      serviceTitle: "Home Visit",
      servicePrice: "$500/-",
    }
  ]
  const serviceGeneralData = [
    {
      serviceId: "service1",
      serviceImage: extraction,
      serviceTitle: "Extractions",
      servicePrice: "$100/-",
    },
    {
      serviceId: "service2",
      serviceImage: teethCleaning,
      serviceTitle: "Teeth Cleaning",
      servicePrice: "$150/-",
    },
    {
      serviceId: "service3",
      serviceImage: rootCanel,
      serviceTitle: "Root Cana",
      servicePrice: "$100/-",
    }
  ]
  const appointmentTimeData = [
    {
      appoinTime: "09:30am"
    },
    {
      appoinTime: "10:00am"
    },
    {
      appoinTime: "10:30am"
    },
    {
      appoinTime: "11:00am"
    },
    {
      appoinTime: "11:30am"
    },
    {
      appoinTime: "12:00pm"
    },
    {
      appoinTime: "12:30pm"
    },
    {
      appoinTime: "01:00pm"
    },
    {
      appoinTime: "01:30pm"
    },
    {
      appoinTime: "02:00pm"
    },
    {
      appoinTime: "02:30pm"
    },
    {
      appoinTime: "03:00pm"
    }
  ]
  const paymentData = [
    {
      paymentId: "pay1",
      paymentName: "Pay Later",
      paymentImage: paymentOffline,
    },
    {
      paymentId: "pay2",
      paymentName: "Woocommerce",
      paymentImage: paymentWoocommerce,
    },
    {
      paymentId: "pay3",
      paymentName: "Paypal",
      paymentImage: paymentPaypal,
    }
  ]

  return (
    <Fragment>
      <BreadCrumb title="Appointment" />
      <div className="section-padding">
        <Row>
          <Col xl="2" lg="1" className="d-none d-lg-block"></Col>
          <Col xl="8" lg="10">
            <div className="appointment-tab-form p-3 bg-white box-shadow">
              <Row className="g-3">
                <Col lg="4">
                  <ul id="appointment-tab-list" className="bg-primary p-4 list-inline m-0 d-flex justify-content-lg-between justify-content-center h-100 flex-lg-column">
                    <li className={`${ show === "clinic" ? "active" : "" || show === "doctor" ? "active done" : "" || show === "doctorservice" ? "active done" : "" || show === "datetime" ? "active done" : "" ||  show === "datetime" ? "active done" : "" || show === "upload" ? "active done" : "" || show === "user" ? "active done" : "" || show === "confirmation" ? "active done" : "" || show === "confirmationdetail" ? "active done" : "" || show === "payment" ? 'active done' : '' || show === "confirm" ? 'active done' : '' }  mb-lg-3 me-lg-0 me-sm-3 me-2`}>
                        <Link to="#" className="d-inline-block">
                          <span className="d-flex gap-3">
                            <span className="tab-position text-center pe-lg-0 pe-sm-4 pe-3">
                              <span className="d-inline-block active-circle"></span>
                            </span>
                            <span className="tab-content d-lg-block d-none">
                              <span className="tab-title d-block mb-1">
                                Choose a Clinic
                              </span>
                              <span className="tab-desc">
                                Please select a Clinic you want to visit
                              </span>
                            </span>
                          </span>
                        </Link>
                     </li>  
                     <li className={`${ show === "doctor" ? "active" : "" || show === "doctorservice" ? "active done" : "" ||  show === "datetime" ? "active done" : "" || show === "datetime" ? "active done" : "" || show === "upload" ? "active done" : "" || show === "user" ? "active done" : "" || show === "confirmation" ? "active done" : "" || show === "confirmationdetail" ? "active done" : "" || show === "payment" ? 'active done' : '' || show === "confirm" ? 'active done' : ''} mb-lg-3 me-lg-0 me-sm-3 me-2`}>
                        <Link to="#" className="d-inline-block">
                          <span className="d-flex gap-3">
                            <span className="tab-position text-center pe-lg-0 pe-sm-4 pe-3">
                                <span className="d-inline-block active-circle"></span>
                            </span>
                            <span className="tab-content d-lg-block d-none">
                              <span className="tab-title d-block mb-1">
                                Choose Your Doctor
                              </span>
                              <span className="tab-desc">
                                Pick a specific Doctor to perform your service
                              </span>
                            </span>
                          </span>
                        </Link>
                     </li> 
                     <li className={`${ show === "doctorservice" ? "active" : "" || show === "datetime" ? "active done" : "" || show === "datetime" ? "active done" : "" || show === "upload" ? "active done" : "" ||  show === "user" ? "active done" : "" || show === "confirmation" ? "active done" : "" || show === "confirmationdetail" ? "active done" : "" || show === "payment" ? 'active done' : '' || show === "confirm" ? 'active done' : '' } mb-lg-3 me-lg-0 me-sm-3 me-2`}>
                        <Link to="javascript:void(0);" className="d-inline-block">
                           <span className="d-flex gap-3">
                              <span className="tab-position text-center pe-lg-0 pe-sm-4 pe-3">
                                 <span className="d-inline-block active-circle"> </span>
                              </span>
                              <span className="tab-content d-lg-block d-none">
                                 <span className="tab-title d-block mb-1">
                                    Doctor Services
                                 </span>
                                 <span className="tab-desc">
                                    Please select a service from below options
                                 </span>
                              </span>
                           </span>
                        </Link>
                     </li> 
                     <li className={`${ show === "datetime" ? "active" : "" || show === "upload" ? "active done" : "" || show === "user" ? "active done" : "" || show === "confirmation" ? "active done" : "" || show === "confirmationdetail" ? "active done" : "" || show === "payment" ? 'active done' : '' || show === "confirm" ? 'active done' : ''} mb-lg-3 me-lg-0 me-sm-3 me-2`}>
                        <Link to="javascript:void(0);" className="d-inline-block">
                           <span className="d-flex gap-3">
                              <span className="tab-position text-center pe-lg-0 pe-sm-4 pe-3">
                                 <span className="d-inline-block active-circle"></span>
                              </span>
                              <span className="tab-content d-lg-block d-none">
                                 <span className="tab-title d-block mb-1">
                                    Select Date and Time
                                 </span>
                                 <span className="tab-desc">
                                    Select date to see a timeline of available slots
                                 </span>
                              </span>
                           </span>
                        </Link>
                     </li>
                     <li className={`${ show === "upload" ? "active" : "" || show === "user" ? "active done" : "" || show === "confirmation" ? "active done" : "" || show === "confirmationdetail" ? "active done" : "" || show === "payment" ? 'active done' : '' || show === "confirm" ? 'active done' : ''} mb-lg-3 me-lg-0 me-sm-3 me-2`}>
                        <Link to="javascript:void(0);" className="d-inline-block">
                           <span className="d-flex gap-3">
                              <span className="tab-position text-center pe-lg-0 pe-sm-4 pe-3">
                                 <span className="d-inline-block active-circle"> </span>
                              </span>
                              <span className="tab-content d-lg-block d-none">
                                 <span className="tab-title d-block mb-1">
                                    Appointment Extra Data
                                 </span>
                                 <span className="tab-desc">
                                    Upload file and description about appointment
                                 </span>
                              </span>
                           </span>
                        </Link>
                     </li>
                     <li className={`${ show === "user" ? "active" : "" || show === "confirmation" ? "active done" : "" || show === "confirmationdetail" ? "active done" : "" || show === "payment" ? 'active done' : '' || show === "confirm" ? 'active done' : ''} mb-lg-3 me-lg-0 me-sm-3 me-2`}>
                        <Link href="javascript:void(0);" className="d-inline-block">
                           <span className="d-flex gap-3">
                              <span className="tab-position text-center pe-lg-0 pe-sm-4 pe-3">
                                 <span className="d-inline-block active-circle"> </span>
                              </span>
                              <span className="tab-content d-lg-block d-none">
                                 <span className="tab-title d-block mb-1">
                                    User Detail Information
                                 </span>
                                 <span className="tab-desc">
                                    Please provide you contact details
                                 </span>
                              </span>
                           </span>
                        </Link>
                     </li>
                     <li className={`${ show === "confirmation" ? "active" : "" || show === "confirmationdetail" ? "active" : "" || show === "payment" ? 'active' : '' || show === "confirm" ? 'active done' : ''} d-inline-block`}>
                        <span className="d-flex gap-3">
                          <span className="tab-position text-center">
                              <span className="d-inline-block active-circle"></span>
                          </span>
                          <span className="tab-content d-lg-block d-none">
                              <span className="tab-title d-block mb-1">
                                Confirmation
                              </span>
                              <span className="tab-desc">
                                Confirm your booking
                              </span>
                          </span>
                        </span>
                     </li>
                  </ul>
                </Col>
                <Col lg="8" className='mt-lg-3 mt-5'>
                  <div className="border h-100 position-relative">
                    <div className={`${show === "clinic" ? "d-block" : "d-none"} appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Select Clinic</h5>
                          <div className="d-inline-block">
                            <div className="form-group input-group mb-0 search-input">
                                <Form.Control type="text" placeholder="Search..." />
                                <span className="input-group-text">
                                    <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24"
                                      fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="11.7669" cy="11.7666" r="8.98856"
                                          stroke="currentColor" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round">
                                      </circle>
                                      <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor"
                                          strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round">
                                      </path>
                                    </svg>
                                </span>
                            </div>
                          </div>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                          <Row>
                            {clinicData.map((item, index) => (
                               <Col sm="6" key={index} className={`${index === clinicData.length-1 && 'mt-sm-0 mt-4'}`}>
                                  <Form.Check className='form-check-inline m-0 p-0 position-relative d-block box-checked'>
                                    <Form.Check.Input type="radio" className="form-check-input" name="radios" id={item.clinicId} />
                                    <Form.Check.Label className="form-check-label d-inline-block w-100" htmlFor={item.clinicId}>
                                      <span className="d-block appointment-clinic-box p-4 text-center">
                                        <span className="d-block mb-4">
                                          <Image alt="img" src={item.clinicImage} height="80" width="80" className="rounded-circle object-cover" />
                                        </span>
                                        <span className="d-block h5 mb-2">{item.clinicName}</span>
                                        <span className="text-body">{item.clinicAddress}</span>
                                        <span className="d-block h6 mt-3 mb-1 fw-500">Email</span>
                                        <span className="text-body">{item.clinicEmail}</span>
                                      </span>
                                    </Form.Check.Label>
                                  </Form.Check>
                              </Col>
                            ))}
                          </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3">
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("doctor")}>Next</span>{" "}
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "doctor" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Select Doctor</h5>
                          <div className="d-inline-block">
                            <div className="form-group input-group mb-0 search-input">
                                <Form.Control type="text" placeholder="Search..." />
                                <span className="input-group-text">
                                    <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24"
                                      fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="11.7669" cy="11.7666" r="8.98856"
                                          stroke="currentColor" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round">
                                      </circle>
                                      <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor"
                                          strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round">
                                      </path>
                                    </svg>
                                </span>
                            </div>
                          </div>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                          <Row>
                            {doctorData.map((item, index) => (
                              <Col sm="6" key={index}>
                                <div className="form-check form-check-inline m-0 p-0 position-relative d-block box-checked">
                                  <Form.Check>
                                    <Form.Check.Input type="radio"  name="radios" className="form-check-input" id={item.doctorId} />
                                    <Form.Check.Label className="form-check-label d-inline-block overflow-hidden w-100" htmlFor={item.doctorId}>
                                      <span className="d-block appointment-doctor-box p-4 text-center position-relative">
                                        <span className="d-block bg-light py-5 position-absolute top-0 start-0 end-0">
                                          <span className="py-1"></span>
                                        </span>
                                        <span className="d-block mb-3 position-relative">
                                          <Image alt="img"  src={item.doctorImage} height="80" width="80" className="rounded-circle object-cover p-1 bg-white" />
                                        </span>
                                        <span className="d-block h5 mb-2">{item.doctorName}</span>
                                        <span className="d-flex align-items-center gap-1 justify-content-between">
                                          <span className="border d-inline-block w-25"></span>
                                          <span className="bg-secondary px-3 py-2 rounded-pill text-white">{item.doctorExp}</span>
                                          <span className="border d-inline-block w-25"></span>
                                        </span>
                                        <span className="d-block h6 mt-3 mb-1 fw-500">Email</span>
                                        <span className="text-body">{item.doctorEmail}</span>
                                      </span>
                                    </Form.Check.Label>
                                  </Form.Check>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("clinic")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("doctorservice")}>Next</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "doctorservice" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Select Service</h5>
                          <div className="d-inline-block">
                            <div className="form-group input-group mb-0 search-input">
                                <Form.Control type="text" placeholder="Search..." />
                                <span className="input-group-text">
                                    <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24"
                                      fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="11.7669" cy="11.7666" r="8.98856"
                                          stroke="currentColor" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round">
                                      </circle>
                                      <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor"
                                          strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round">
                                      </path>
                                    </svg>
                                </span>
                            </div>
                          </div>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                          <h5 className="mb-3 text-secondary">Other</h5>
                          <Row>
                            {serviceOtherData.map((item, index) => (
                              <Col sm="4" key={index}>
                                <div className="form-check form-check-inline m-0 p-0 position-relative d-block box-checked">
                                  <Form.Check>
                                    <Form.Check.Input type="radio"  name="radios" className="form-check-input" id={item.serviceId} />
                                    <Form.Label className="form-check-label d-inline-block overflow-hidden w-100" htmlFor={item.serviceId}>
                                      <span className="d-block p-4 text-center position-relative">
                                          <span className="d-block mb-3 position-relative">
                                            <Image alt="img" src={item.serviceImage} height="70" width="70" className="object-cover" />
                                          </span>
                                          <span className="d-block h6 fw-500 mt-3 mb-1">{item.serviceTitle}</span>
                                          <span className="text-body">{item.servicePrice}</span>
                                      </span>
                                    </Form.Label>
                                  </Form.Check>
                                </div>
                              </Col>
                            ))}                            
                          </Row>
                          <h5 className="my-3 text-secondary">General Dentistry</h5>
                          <Row>
                            {serviceGeneralData.map((item, index) => (
                              <Col sm="4" key={index}>
                                <div className="form-check form-check-inline m-0 p-0 position-relative d-block box-checked">
                                  <Form.Check>
                                    <Form.Check.Input type="radio"  name="radios" className="form-check-input" id={item.serviceId} />
                                    <Form.Label className="form-check-label d-inline-block overflow-hidden w-100" htmlFor={item.serviceId}>
                                      <span className="d-block p-4 text-center position-relative">
                                        <span className="d-block mb-3 position-relative">
                                            <Image alt="img" src={item.serviceImage} height="70" width="70" className="rounded-circle object-cover" />
                                        </span>
                                        <span className="d-block h6 fw-500 mt-3 mb-1">{item.serviceTitle}</span>
                                        <span className="text-body">{item.servicePrice}</span>
                                      </span>
                                    </Form.Label>
                                  </Form.Check>
                                </div>
                              </Col>
                            ))}                            
                          </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("doctor")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("datetime")}>Next</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "datetime" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Select Date and Time</h5>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                            <Row>
                              <Col sm="6">
                                <div className="form-group mb-0 p-3 bg-primary-subtle inline-flatpickr">
                                {/* <Form.Control type="hidden" name="inline" className="d-none inline_flatpickr" /> */}
                                <Flatpickr options={{
                                  inline: true,
                                  minDate: "2017-01-01"
                                }} />
                                </div>
                              </Col>
                              <Col sm="6" className="mt-sm-0 mt-4">
                                <div className="p-3 bg-primary-subtle">
                                  <Row className="gx-3">
                                    {appointmentTimeData.map((item, index) => (
                                      <Col md="4" sm="6" className="mt-3" key={index}>
                                        <button className="btn bg-white text-body text-uppercase p-2 w-100">{item.appoinTime}</button>
                                      </Col>
                                    ))}                                    
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("doctorservice")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("upload")}>Next</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "upload" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">More About Appointment</h5>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                            <Form.Label className="form-label h6">Appointment Descriptions</Form.Label>
                            <Form.Control as="textarea" rows={4} />
                            <Form.Label className="form-label h6 mt-5">Add Medical Report</Form.Label>
                            <Form.Control type="file" />
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("datetime")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("user")}>Next</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "user" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Enter Details</h5>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                            <Row className="h-100">
                              <Col sm="12">
                              <Tab.Container id="left-tabs-example" defaultActiveKey="register">
                                <Nav variant="pills" className="nav-tabs m-0">
                                  <Nav.Item>
                                    <Nav.Link eventKey="register">Register</Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link eventKey="login">Login</Nav.Link>
                                  </Nav.Item>
                                </Nav>
                                <Tab.Content className="h-100">
                                  <Tab.Pane eventKey="register" className="h-100">
                                    <div className="py-5 px-4 bg-primary-subtle h-100">
                                      <Row>
                                        <Col sm="6">
                                          <Form.Label className="h6">First Name *</Form.Label>
                                          <Form.Control type="text"  placeholder="Enter Your First Name" required />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                          <Form.Label className="h6">Last Name *</Form.Label>
                                          <Form.Control type="text"  placeholder="Enter Your Last Name" required />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                          <Form.Label className="h6">Email *</Form.Label>
                                          <Form.Control type="email"  placeholder="Enter Your Email" required />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                          <Form.Label className="h6">Contact *</Form.Label>
                                          <Row className="g-2">
                                              <div className="col-4">
                                                <Form.Select aria-label="Default select example">
                                                  <option>select</option>
                                                  <option selected="">+44 United Kingdom </option>
                                                  <option value="1">+91 India</option>
                                                  <option value="2">+1 United States </option>
                                                  <option value="3">+84 Vietnam </option>
                                                </Form.Select>
                                              </div>
                                              <div className="col-8">
                                                <Form.Control type="text"  placeholder="Enter Your Number" required />
                                              </div>
                                          </Row>
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                          <Form.Label className="h6">Gender *</Form.Label>
                                          <div className="d-flex align-items-center flex-wrap gap-3">
                                            <Form.Check type="radio"
                                                label="Male"
                                                id={`disabled-default-1`}
                                              />
                                                <Form.Check type="radio"
                                                label="Female"
                                                id={`disabled-default-2`}
                                              />
                                                <Form.Check type="radio"
                                                label="Other"
                                                id={`disabled-default-3`}
                                              />
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="login" className="h-100">
                                    <div className="py-5 px-4 bg-primary-subtle h-100">
                                      <Row>
                                        <Col sm="6">
                                          <Form.Label className="h6">Username or Email *</Form.Label>
                                          <Form.Control type="text" placeholder="Enter Your Username or Email" />
                                        </Col>
                                        <Col sm="6">
                                          <Form.Label className="h6">Password *</Form.Label>
                                          <Form.Control type="text" placeholder="************" />
                                        </Col>
                                      </Row>
                                    </div>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Tab.Container>
                              </Col>
                            </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("upload")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("confirmationdetail")}>Next</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "confirmationdetail" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Confirmation Detail</h5>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                            <Row>
                              <Col sm="6">
                                <h6 className="text-secondary mb-3 fw-500 text-uppercase">Clinic Info</h6>
                                <div className="p-4 bg-primary-subtle">
                                    <h6 className="mb-2">Valley Clinic</h6>
                                    <p className="m-0 text-body">3/e, Naaz Bldg, Lamington Road, Mumbai, 400004, India </p>
                                </div>
                                <h6 className="text-secondary mt-5 mb-3 fw-500 text-uppercase">Patient Info</h6>
                                <div className="p-4 bg-primary-subtle">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-2">Name:</h6>
                                              </td>
                                              <td className="p-0 border-0">
                                                <p className="mb-2 text-end">John Deo</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-2">Number:</h6>
                                              </td>
                                              <td className="p-0 border-0">
                                                <p className="mb-2 text-end">+91 123456789</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-0">Email:</h6>
                                              </td>
                                              <td className="p-0 border-0">
                                                <p className="mb-0 text-end">johndeo@gmail.com</p>
                                              </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  </div>
                                </div>
                              </Col>
                              <Col sm="6" className="mt-sm-0 mt-5">
                                <h6 className="text-secondary mb-3 fw-500 text-uppercase">Appointment Summary </h6>
                                <div className="p-4 border">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <p className="mb-2">Doctor:</p>
                                              </td>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-2 text-end">Emily Thompson</h6>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <p className="mb-2">Date:</p>
                                              </td>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-2 text-end">July 1, 2023</h6>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <p className="mb-0">Time:</p>
                                              </td>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-0 text-end">02:30 PM</h6>
                                              </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  </div>
                                  <div className="p-4 bg-primary-subtle mt-4">
                                    <h6 className="mb-2">Services</h6>
                                    <div
                                        className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                        <p className="m-0 text-body">Home Visit</p>
                                        <h6 className="m-0">$500/-</h6>
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4">
                                    <h5 className="m-0">Total Price</h5>
                                    <p className="m-0 text-primary">$500/-</p>
                                  </div>
                              </div>
                              </Col>
                            </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("user")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("payment")}>Next</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "payment" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                      <div className="tab-widget-inner h-100">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 mx-3 border-bottom">
                          <h5 className="mb-0 flex-shrink-0">Payment Selection</h5>
                        </div>
                        <div className="tab-widget-inner-data pt-5 pb-3 px-3">
                            <Row className="h-100">
                              <Col sm="6">
                                <h6 className="text-secondary mb-3 fw-500 text-uppercase">Select Payment</h6>
                                <div className="p-4 bg-primary-subtle">
                                  {paymentData.map((item, index) => (
                                    <div className="mb-3">
                                      <div className="form-check form-check-inline m-0 p-0 position-relative d-block box-checked">
                                        <Form.Check>
                                          <Form.Check.Input type="radio"  name="radios" className="form-check-input" id={item.paymentId} />
                                          <Form.Label className="form-check-label d-flex align-items-center justify-content-between bg-white w-100 px-5 py-3" htmlFor={item.paymentId}>
                                            <Image src={item.paymentImage} alt="image" />
                                            <span className="text-body">{item.paymentName}</span>
                                          </Form.Label>
                                        </Form.Check>
                                      </div>
                                    </div>
                                  ))}                                  
                                </div>
                              </Col>
                              <Col sm="6">
                                <h6 className="text-secondary mb-3 fw-500 text-uppercase">Appointment Summary</h6>
                                <div className="p-4 border">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <p className="mb-2">Doctor:</p>
                                              </td>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-2 text-end">Emily Thompson</h6>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <p className="mb-2">Date:</p>
                                              </td>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-2 text-end">July 1, 2023</h6>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td className="p-0 border-0">
                                                <p className="mb-0">Time:</p>
                                              </td>
                                              <td className="p-0 border-0">
                                                <h6 className="mb-0 text-end">02:30 PM</h6>
                                              </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  </div>
                                  <div className="p-4 bg-primary-subtle mt-4">
                                    <h6 className="mb-2">Services</h6>
                                    <div
                                        className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                        <p className="m-0 text-body">Home Visit</p>
                                        <h6 className="m-0">$500/-</h6>
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4">
                                    <h5 className="m-0">Total Price</h5>
                                    <p className="m-0 text-primary">$500/-</p>
                                  </div>
                              </div>
                              </Col>
                            </Row>
                        </div>
                        <div className="d-flex align-items-center justify-content-end px-3 mb-3 mt-3 gap-3">
                          <Button className="iq-button text-capitalize back" >
                            <span className="iq-btn-text-holder position-relative" onClick={() => setShow("confirmationdetail")}>Previous</span>
                            <span className="iq-btn-icon-holder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                  viewBox="0 0 8 8" fill="none">
                                  <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                              </svg>
                            </span>
                          </Button>
                          <Button className="bg-primary iq-button text-capitalize next">
                              <span className="iq-btn-text-holder position-relative" onClick={() => setShow("confirm")}>Confirm</span>
                              <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                      d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                      fill="currentColor"></path>
                                </svg>
                              </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className={`${show === "confirm" ? "d-block" : "d-none"} appointment-tab-content appointment-content-active h-100`}>
                    <div className="tab-widget-inner h-100">
                      <div className="tab-widget-inner-data py-5 px-3 h-100 d-flex align-items-center justify-content-center">
                        <div className="row">
                            <div className="col-sm-12">
                              <div className="text-center">
                                  <div className="mb-5 text-success">
                                    <svg className="checkmark-animated"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
                                        data-v-6b4a22d6="">
                                        <circle className="checkmark__circle" cx="26" cy="26" r="25"
                                          fill="none" data-v-6b4a22d6=""></circle>
                                        <path className="checkmark__check" fill="none"
                                          d="M14.1 27.2l7.1 7.2 16.7-16.8" data-v-6b4a22d6="">
                                        </path>
                                    </svg>
                                  </div>
                                  <h4>Your Appointment is Booked Sucessfully!</h4>
                                  <p>Please check your email for verification</p>
                              </div>
                              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap mt-5">
                                  <a href="/appointment" className="bg-primary iq-button text-capitalize">
                                    <span className="iq-btn-text-holder position-relative">Book More Appointments</span>
                                    <span className="iq-btn-icon-holder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                          viewBox="0 0 8 8" fill="none">
                                          <path
                                              d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                              fill="currentColor"></path>
                                        </svg>
                                    </span>
                                  </a>
                                  <a href="javascript:void(0);" className="iq-button text-capitalize">
                                    <span className="iq-btn-text-holder position-relative">Print Detail</span>
                                    <span className="iq-btn-icon-holder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                          viewBox="0 0 8 8" fill="none">
                                          <path
                                              d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                              fill="currentColor"></path>
                                        </svg>
                                    </span>
                                  </a>
                                  <a href="javascript:void(0);" className="bg-primary iq-button text-capitalize">
                                    <span className="iq-btn-text-holder position-relative">Add To Calendar</span>
                                    <span className="iq-btn-icon-holder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                          viewBox="0 0 8 8" fill="none">
                                          <path
                                              d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                              fill="currentColor"></path>
                                        </svg>
                                    </span>
                                  </a>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xl="2" lg="1" className="d-none d-lg-block"></Col>
        </Row>
      </div>
    </Fragment>
  )
}
