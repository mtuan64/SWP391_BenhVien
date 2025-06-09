import React from 'react'
import { Fragment, memo, useEffect } from 'react'
// react-botstrap
import { Row, Col } from 'react-bootstrap'

// Components
import DoctorBox from '../components/widget/doctor-box';

// Images
import img1 from '/assets/images/doctor/1.webp';
import img2 from '/assets/images/doctor/2.webp';
import img3 from '/assets/images/doctor/3.webp';
import img4 from '/assets/images/doctor/4.webp';
import img5 from '/assets/images/doctor/5.webp';
import img6 from '/assets/images/doctor/6.webp';
import img7 from '/assets/images/doctor/7.webp';
import img8 from '/assets/images/doctor/8.webp';

const PatientDoctor = () => {

    const patientdoctorlist = [
        {
            Image: img1,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Amine Louis",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img2,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Alexandra Johnson",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img3,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Benjamin Davis",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img4,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Emily Thompson",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img5,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Christopher Martinez",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img6,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Olivia Wilson",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img7,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Ethan Rodriguez",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
        {
            Image: img8,
            Status:"1000+ Appointment Completed",
            Name: "Dr. Emily Thompson",
            Designation: "Senior General Physician",
            Reviews: "4.5 (3,762 reviews)",
        },
    ]

    return (
        <Fragment>
            <div className="mt-5">
                <h1 className='mb-3'>Hello! Amine Steward</h1>
                <span className='mx-0 text-capitalize'>Have a nice day. don’t forget to take care of your self.'</span>
             </div>
             <Row className='mt-5 mb-5'>
                    {patientdoctorlist.map((item, index) => (
                        <Col className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                            <DoctorBox 
                                DoctorImage={item.Image}
                                DoctorStatus = {item.Status}
                                DoctorName = {item.Name}
                                DoctorDesignation = {item.Designation}
                                DoctorReviews = {item.Reviews}
                            />
                        </Col>
                    ))}
             </Row>
        </Fragment>
    )
}

export default PatientDoctor