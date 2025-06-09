import React from 'react'
import {  Container, Row, Col, Image, Card } from 'react-bootstrap';

// Widgets
import IconboxTransprent from '../../widgets/IconboxTransprent';

// Images
import pattern3 from '/assets/images/orthopedics/pattern-3.webp'
import pattern4 from '/assets/images/orthopedics/pattern-4.webp'
import qualifiedDoctors from '/assets/images/orthopedics/qualified-doctors.svg'
import trustedTreatment from '/assets/images/orthopedics/trusted-treatment.svg'
import services247 from '/assets/images/orthopedics/24-7-services.svg'
import hygienicClinic from '/assets/images/orthopedics/hygienic-clinic.svg'

export default function OrthopedicsSpecialCare() {
  const IconBoxData = [
    {
        iconImage: qualifiedDoctors,
        iconboxTitle: "Qualified Doctor",
        iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
    },
    {
      iconImage: trustedTreatment,
      iconboxTitle: "Trusted Treatment",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
    },
    {
      iconImage: services247,
      iconboxTitle: "24/7 Services",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
    },
    {
      iconImage: hygienicClinic,
      iconboxTitle: "Hygienic Clinic",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
    }
  ]
  return (
    <div className="ortho-service">
      <div className="bg-secondary text-white section-padding position-relative">
        <Image src={pattern3} alt="pattern" className="img-fluid position-absolute d-none d-lg-block start-0 top-0 rtl-image-flip" />
        <Image src={pattern4} alt="pattern" className="img-fluid position-absolute d-none d-lg-block end-0 top-0 rtl-image-flip" /> 
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="iq-title-box mb-md-0">
                  <span className="iq-subtitle text-uppercase text-primary">SPECIAL CARE</span>
                  <h2 className="iq-title iq-heading-title">
                    <span className="right-text text-capitalize fw-500 text-white">Featured Treatment </span>
                    <span className="left-text text-capitalize fw-light text-white">By Kivicare</span>
                  </h2>
              </div>
            </Col>
            <Col lg="6">
            <span>Children undergo rapid physical and mental changes as they grow. We understand this fact &
                assess a child’s health status based on the normal ranges for their age.</span>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="service-top">
        <Container className="px-md-5">
            <Card className="box-shadow mb-0">
              <Card.Body className="p-0">
                <Row className="m-0 orthopedics-iconbox">
                  {IconBoxData.map((item, index) => (
                    <Col lg="3" md="6" className="hover-box-shadow p-0 p-md-5 border-end">
                      <div className="no-img-bg py-0 py-lg-4">
                          <IconboxTransprent isBorder={true} isButtonHide={true} iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                      </div>
                    </Col>
                    ))} 
                </Row>
              </Card.Body>
            </Card>
        </Container>
      </div>
    </div>
  )
}
