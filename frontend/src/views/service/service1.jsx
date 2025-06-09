import React, { Fragment, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import BreadCrumb from '../../components/partial/BreadCrumb';
import FancyBox from '../../components/widgets/FancyBox';

// Images
import doctor1 from '/assets/images/general/doctor.svg'
import treatment from '/assets/images/general/treatment.svg'
import service from '/assets/images/general/service.svg'
import heartRate from '/assets/images/service/heart-rate.svg'
import xray from '/assets/images/service/x-ray.svg'
import chemotherapy from '/assets/images/service/chemotherapy.svg'
import flask from '/assets/images/service/flask.svg'
import stethoscope from '/assets/images/service/stethoscope.svg'
import ambulance from '/assets/images/service/ambulance.svg'

export default function Service1() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fancyBoxData = [
    {
      fancyboxImage: doctor1,
      fancyboxTitle: "Qualified Doctors",
      fancyboxDesc: "A person who holds a degree recognised by the Medical Council is registered",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: treatment,
      fancyboxTitle: "Trusted Treatment",
      fancyboxDesc: "KiviCare has many types of treatment to relieve symptoms for all types illness .",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: service,
      fancyboxTitle: "24/7 Services",
      fancyboxDesc: "KiviCare is at your service 24×7 aiming to provide the best services of medical",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: heartRate,
      fancyboxTitle: "Health CheckUp",
      fancyboxDesc: "A usual full-body health check-up is made up of blood and urine tests lungs function tests.",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: xray,
      fancyboxTitle: "X-Ray",
      fancyboxDesc: "An X-ray is an imaginaring test that produces pictures of the organs, tissues of the body.",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: chemotherapy,
      fancyboxTitle: "Blood Bank",
      fancyboxDesc: "Blood banking is the process that takes place in the lab to make sure that donated blood.",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: flask,
      fancyboxTitle: "Laboratory",
      fancyboxDesc: "Clinical lab services are tests on specimens from the body that are used to treat patients.",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: stethoscope,
      fancyboxTitle: "Outdoor Checkup",
      fancyboxDesc: "Clinics / Hospitals of Outdoor Checkup Services, Emergency Care Service.",
      buttonUrl: "/service/service-detail"
    },
    {
      fancyboxImage: ambulance,
      fancyboxTitle: "Ambulance",
      fancyboxDesc: "Emergency ambulance services have dedicated staff to handle medical conditions at any time anywhere.",
      buttonUrl: "/service/service-detail"
    }

  ]
  return (
    <Fragment>
      <BreadCrumb title="Service" />
      <div className="section-padding">
        <Container>
          <Row className="row-cols-xl-3 row-cols-md-2 row-cols-1">
            {fancyBoxData.map((item, index) => (
              <Col lg="4" md="6" className="text-center mt-5" key={index}>
                <FancyBox fancyboxImage={item.fancyboxImage} fancyboxTitle={item.fancyboxTitle} fancyboxDesc={item.fancyboxDesc} buttonUrl={item.buttonUrl} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
