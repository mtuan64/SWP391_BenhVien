import React from 'react'
import {useState, Fragment } from 'react'
import { CardBody, Col, Row, Image, CardHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../components/bootstrap/card'


// img
import avatars1 from '/assets/images/avatars/01.png';

import gallery1 from '/assets/images/gallery/blog1.jpg'
import gallery2 from '/assets/images/gallery/blog-2.jpg'
import gallery3 from '/assets/images/gallery/blog-3.jpg'
import gallery4 from '/assets/images/gallery/blog-4.jpg'
import gallery5 from '/assets/images/gallery/blog-5.jpg'
import gallery6 from '/assets/images/gallery/blog-6.jpg'

// FsLightbox
import ReactFsLightbox from "fslightbox-react";
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const UserProfile = () => {
    const userEducationlist = [
        {
            Year: "2012",
            Degree:"MBBS, M.D",
            Institute: "University of Wyoming",
            Result: "Distinction",
        },
        {
            Year: "2016",
            Degree:"M.D. of Medicine",
            Institute: "Netherland Medical College",
            Result: "Distinction",
        },
    ]
    const userExperiencelist = [
        {
            Year: "2016 - 2020",
            Department:"MBBS, M.D",
            Position: "Senior Doctor",
            Hospital:"Midtown Medical Clinic",
            Result: "Good",
        },
        {
            Year: "2020 - 2022",
            Department:"M.D. of Medicine",
            Position: "Associate Prof.",
            Hospital:"Netherland Medical College",
            Result: "Distinction",
        },
    ]

    
    const [imageController, setImageController] = useState({
        toggler: false,
        slide: 1,
      });
      function imageOnSlide(number) {
        setImageController({
          toggler: !imageController.toggler,
          slide: number,
        });
      }
    return (
        <Fragment>
              <FsLightbox
                    toggler={imageController.toggler}
                    sources={[
                    gallery1,
                    gallery2,
                    gallery3,
                    gallery4,
                    gallery5,
                    gallery6,
                    ]}
                    slide={imageController.slide}
                />
           <Row>
                <Col lg="4">
                    <Card>
                        <CardBody>
                            <div className="doctor-details-block">
                                <div className="doc-profile-bg bg-primary" style={{ height: '150px' }}></div>
                                <div className="doctor-profile text-center">
                                    <img src={avatars1} alt="profile-img" className="avatar-130 rounded-circle" />
                                    <div className="text-center mt-3 pl-3 pr-3">
                                        <h4><b>Bini Jets</b></h4>
                                        <p>Doctor</p>
                                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repudiandae
                                            eveniet harum.</p>
                                    </div>
                                    <hr/>
                                    <ul className="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0 list-unstyled">
                                        <li className="text-center">
                                            <h1 className="counter">4500</h1>
                                            <span>Operations</span>
                                        </li>
                                        <li className="text-center">
                                            <h1 className="counter">100</h1>
                                            <span>Hospital</span>
                                        </li>
                                        <li className="text-center">
                                            <h1 className="counter">10000</h1>
                                            <span>Patients</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="card-header d-flex justify-content-between mb-0">
                            <h3 className="mb-0">Personal Information</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="about-info m-0 p-0">
                                <Row>
                                    <div className="col-4 mb-1">First Name:</div>
                                    <div className="col-8 mb-1">Bini</div>
                                    <div className="col-4 mb-1">Last Name:</div>
                                    <div className="col-8 mb-1">Jets</div>
                                    <div className="col-4 mb-1">Age</div>
                                    <div className="col-8 mb-1">27</div>
                                    <div className="col-4 mb-1">Position:</div>
                                    <div className="col-8 mb-1">Senior doctor</div>
                                    <div className="col-4 mb-1">Email:</div>
                                    <div className="col-8 mb-1"><a href="mailto:biniJets24@demo.com"> biniJets24@demo.com </a></div>
                                    <div className="col-4 mb-1">Phone:</div>
                                    <div className="col-8 mb-1"><a href="tel:001-2351-25612">001 2351 256 12</a></div>
                                    <div className="col-4">Location:</div>
                                    <div className="col-8">USA</div>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="d-flex justify-content-between mb-0">
                            <h3 className="mb-0">Photos</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="row row-cols-xl-3 row-cols-md-2 row-cols-2">
                                <Col className="col p-0">
                                    <Link onClick={() => imageOnSlide(1)} to="#">
                                        <Image  src={gallery1} className="p-2 img-fluid w-100"  alt="profile-image"  loading="lazy" />
                                    </Link>
                                </Col>
                                <Col className="col p-0">
                                    <Link onClick={() => imageOnSlide(2)} to="#">
                                        <Image  src={gallery2} className="p-2 img-fluid w-100"  alt="profile-image"  loading="lazy" />
                                    </Link>
                                </Col>
                                <Col className="col p-0">
                                    <Link onClick={() => imageOnSlide(3)} to="#">
                                        <Image  src={gallery3} className="p-2 img-fluid w-100"  alt="profile-image"  loading="lazy" />
                                    </Link>
                                </Col>
                                <Col className="col p-0">
                                    <Link onClick={() => imageOnSlide(4)} to="#">
                                        <Image  src={gallery4} className="p-2 img-fluid w-100"  alt="profile-image"  loading="lazy" />
                                    </Link>
                                </Col>
                                <Col className="col p-0">
                                    <Link onClick={() => imageOnSlide(5)} to="#">
                                        <Image  src={gallery5} className="p-2 img-fluid w-100"  alt="profile-image"  loading="lazy" />
                                    </Link>
                                </Col>
                                <Col className="col p-0">
                                    <Link onClick={() => imageOnSlide(6)} to="#">
                                        <Image  src={gallery6} className="p-2 img-fluid w-100"  alt="profile-image"  loading="lazy" />
                                    </Link>
                                </Col>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="8">
                    <Row>
                        <Col md="6">
                            <Card>
                                <CardHeader className="d-flex justify-content-between mb-0">
                                    <h3 className="mb-0">Speciality</h3>
                                </CardHeader>
                                <CardBody>
                                    <ul className="speciality-list m-0 p-0">
                                        <li className="d-flex mb-4 align-items-center gap-4">
                                            <div className="user-img img-fluid"><a href="#" className="bg-primary-subtle"><i
                                                    className="fas fa-award"></i></a>
                                            </div>
                                            <div className="media-support-info ml-3">
                                            <h6 className="mb-0">Professional</h6>
                                            <p className="mb-0">Certified Skin Treatment</p>
                                            </div>
                                        </li>
                                        <li className="d-flex mb-4 align-items-center gap-4">
                                            <div className="user-img img-fluid"><a href="#" className="bg-secondary-subtle"><i
                                                    className="fas fa-award"></i></a>
                                            </div>
                                            <div className="media-support-info ml-3">
                                            <h6 className="mb-0">Certified</h6>
                                            <p className="mb-0">Cold Laser Operation</p>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center gap-4">
                                            <div className="user-img img-fluid"><a href="#" className="bg-success-subtle"><i
                                                    className="fas fa-award"></i></a>
                                            </div>
                                            <div className="media-support-info ml-3">
                                            <h6 className="mb-0">Medication Laser</h6>
                                            <p className="mb-0">Hair Lose Product</p>
                                            </div>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card>
                                <CardHeader className="d-flex justify-content-between mb-0">
                                    <h3 className="mb-0">Notifications</h3>
                                </CardHeader>
                                <CardBody>
                                    <ul className="iq-timeline p-0 w-100 list-unstyled">
                                        <li className="position-relative">
                                            <div className="timeline-dots border-primary"></div>
                                            <h6 className="mb-0">Dr. Joy Send you Photo</h6>
                                            <small className="mt-1">23 June 2023</small>
                                        </li>
                                        <li className="position-relative">
                                            <div className="timeline-dots border-secondary"></div>
                                            <h6 className="mb-0">Reminder : Opertion Time!</h6>
                                            <small className="mt-1">15 July 2023</small>
                                        </li>
                                        <li className="position-relative">
                                            <div className="timeline-dots border-success"></div>
                                            <h6 className="mb-0">Patient Call</h6>
                                            <small className="mt-1">14 July 2023</small>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card>
                            <CardHeader className="d-flex justify-content-between mb-0">
                                <h3 className="mb-0">Schedule</h3>
                            </CardHeader>
                                <CardBody>
                                    <ul className="list-inline m-0 p-0">
                                        <li>
                                            <h6 className="float-start mb-1">Ruby saul (Blood Check)</h6>
                                            <small className="float-end mt-1">Today</small>
                                            <div className="d-inline-block w-100">
                                            <p className="badge bg-primary">09:00 AM</p>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="float-start mb-1">Anna Mull (Fever)Today</h6>
                                            <small className="float-end mt-1">Today</small>
                                            <div className="d-inline-block w-100">
                                            <p className="badge bg-secondary">09:15 AM</p>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="float-start mb-1">Petey Cruiser (X-ray)</h6>
                                            <small className="float-end mt-1">Today</small>
                                            <div className="d-inline-block w-100">
                                            <p className="badge bg-info">10:00 AM</p>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="float-start mb-1">Anna Sthesia (Full body Check up)</h6>
                                            <small className="float-end mt-1">Today</small>
                                            <div className="d-inline-block w-100">
                                            <p className="badge bg-success">01:00 AM</p>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="float-start mb-1">Paul Molive (Operation)</h6>
                                            <small className="float-end mt-1">Tomorrow</small>
                                            <div className="d-inline-block w-100">
                                            <p className="badge bg-danger mb-0">09:00 AM</p>
                                            </div>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card>
                                <CardHeader className="d-flex justify-content-between mb-0">
                                    <h3 className="mb-0">Patients Notes</h3>
                                </CardHeader>
                                <CardBody>
                                    <ul className="list-inline m-0 p-0">
                                        <li className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                            <h6 className="mb-0">Treatment Was Good!</h6>
                                            <p className="mb-0">Eye Test</p>
                                            </div>
                                            <div><button className="rounded bg-success-subtle py-2 px-3 fw-500  border-0 me-2">Open</button></div>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                            <h6 className="mb-0">My Helth Is Better Now</h6>
                                            <p className="mb-0">Fever Test</p>
                                            </div>
                                            <div><button className="rounded bg-success-subtle py-2 px-3 fw-500  border-0 me-2">Open</button></div>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                            <h6 className="mb-0">No Effacted</h6>
                                            <p className="mb-0">Thyroid Test</p>
                                            </div>
                                            <div><button className="rounded bg-danger-subtle py-2 px-3 fw-500  border-0 me-2">Close</button></div>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                            <h6 className="mb-0">Operation Successfull</h6>
                                            <p className="mb-0">Orthopaedic</p>
                                            </div>
                                            <div><button className="rounded bg-success-subtle py-2 px-3 fw-500  border-0 me-2">Open</button></div>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                            <h6 className="mb-0">Mediacal Care Is Just A Click Away</h6>
                                            <p className="mb-0">Join Pain</p>
                                            </div>
                                            <div><button className="rounded bg-danger-subtle py-2 px-3 fw-500  border-0 me-2">Close</button></div>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between">
                                            <div>
                                            <h6 className="mb-0">Treatment Is Good</h6>
                                            <p className="mb-0">Skin Treatment</p>
                                            </div>
                                            <div><button className="rounded bg-success-subtle py-2 px-3 fw-500  border-0 me-2">Open</button></div>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="12">
                            <Card>
                                <CardHeader className="d-flex justify-content-between mb-0">
                                    <h3 className="mb-0">Education</h3>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <table className="table border-end border-start align-middle mb-0 rounded">
                                            <thead className="table-dark">
                                            <tr>
                                                <th scope="col">Year</th>
                                                <th scope="col">Degree</th>
                                                <th scope="col">Institute</th>
                                                <th scope="col">Result</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {userEducationlist.map((item, index) => (
                                                    <tr data-item="list" key={index}>
                                                        <td>{item.Year}</td>
                                                        <td>{item.Degree}</td>
                                                        <td>{item.Institute}</td>
                                                        <td><span className="badge bg-success">{item.Result}</span></td>
                                                    </tr>
                                                ))} 
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="12">
                            <Card>
                                <CardHeader className="d-flex justify-content-between mb-0">
                                    <h3 className="mb-0">Experience</h3>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <table className="table border-end border-start align-middle mb-0 rounded">
                                            <thead className="table-dark">
                                            <tr>
                                                <th scope="col">Year</th>
                                                <th scope="col">Department</th>
                                                <th scope="col">Position</th>
                                                <th scope="col">Hospital</th>
                                                <th scope="col">Result</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {userExperiencelist.map((item, index) => (
                                                <tr data-item="list" key={index}>
                                                    <td>{item.Year}</td>
                                                    <td>{item.Department}</td>
                                                    <td>{item.Position}</td>
                                                    <td>{item.Hospital}</td>
                                                    <td><span className="badge bg-success">{item.Result}</span></td>
                                                </tr>
                                            ))} 
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>        
        </Fragment>
    )
}

export default UserProfile
