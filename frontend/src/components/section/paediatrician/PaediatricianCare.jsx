import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import IconboxBackgroundHover from '../../widgets/IconboxBackgroundHover';

export default function PaediatricianCare() {
  const ServiceData = [
    {
      iconClass: "flaticon-award",
      iconboxTitle: "Qualified Doctors",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
      buttonUrl: "service/service1"
    },
    {
      iconClass: "flaticon-inspection",
      iconboxTitle: "Work Improvements",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
      buttonUrl: "service/service1"
    },
    {
      iconClass: "flaticon-insurance",
      iconboxTitle: "Restore Confidence",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
      buttonUrl: "service/service1"
    },
    {
      iconClass: "flaticon-ip",
      iconboxTitle: "Hygienic Clinic",
      iconboxDesc: "There are many variations of passages of Lorem Ipsum available",
      buttonUrl: "service/service1"
    }
  ]
  return (
    <div className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col md="6">
              <Title subTitle="special care" rightText="Additional Benefits " leftText="From KiviCare"/>
            </Col>
            <Col md="6">
              <p className="mb-0">
                Children undergo rapid physical and mental changes as they grow. We understand this fact & assess a
                  child’s health status based on the normal ranges for their age.
              </p>
            </Col>
          </Row>
          <Row className="mt-5 mt-lg-0 mt-md-0">
            {ServiceData.map((item, index) => (
              <Col lg="3" md="6" key={index}>
                <IconboxBackgroundHover isIcon={true} iconClass={item.iconClass} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
  )
}
