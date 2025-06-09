import React from 'react'
import { Fragment, useState } from 'react'


// react-botstrap
import { Col, Button, Form } from "react-bootstrap";
// import Pagination from 'react-bootstrap/Pagination';


// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";
import DoctorCategory from '../components/widget/doctorCategory';

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

const Category = () => {
    const Categorylist = [
        {
            isDrCategory: 'true',
            image: img1,
            CategoryName: "Skin And Beauty",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            isDrCategory: 'true',
            image: img2,
            CategoryName: "Psychiatrist",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img3,
            CategoryName: "Cardiac",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img4,
            CategoryName: "Pediatrician",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img5,
            CategoryName: "Orthopedics",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img6,
            CategoryName: "Dentist",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img7,
            CategoryName: "General Checkup",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img8,
            CategoryName: "Eye Care",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        },
        {
            image: img9,
            CategoryName: "Fertility",
            AppointmentStatus: "Total 300+ Appointments Completed",
            DoctorCount: "03 Doctors",
        }
    ]

    return (
        <Fragment>
            <TopNav title="Category" />
            <Card>
                <Card.Header>
                    <div>
                        <h4>All Department</h4>
                        <span>More Than 04+ New Department</span>
                    </div>
                </Card.Header>
                <Card.Body className="pt-0">
                    <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-2 row-cols-1">
                        {Categorylist.map((item, index) => (
                            <Col key={index}>
                                <DoctorCategory 
                                    image={item.image}
                                    CategoryName = {item.CategoryName}
                                    DoctorCategory = {item.DoctorCategory}
                                    AppointmentStatus = {item.AppointmentStatus}
                                    DoctorCount = {item.DoctorCount}
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
        </Fragment>
    )
}

export default Category
