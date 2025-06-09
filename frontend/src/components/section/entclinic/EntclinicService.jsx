import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import IconboxTransprent from '../../widgets/IconboxTransprent';

// Images
import MediclaimFacilities1 from '/assets/images/ent-clinic/Mediclaim-Facilities-1.webp'
import StichlessSurgery1 from '/assets/images/ent-clinic/Stichless-surgery-1.webp'
import Awards1 from '/assets/images/ent-clinic/Awards-1.webp'

export default function EntclinicService() {
  const ServiceIconData = [
    {
      iconImage: MediclaimFacilities1,
      iconboxTitle: "Qualified Doctors",
      iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: StichlessSurgery1,
      iconboxTitle: "Work Improvements",
      iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: Awards1,
      iconboxTitle: "Restoring Confidence",
      iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout",
      buttonUrl: "/service/service1"
    }
  ]
  return (
    <div className="ent-clinic-service">
        <div className="bg-primary-subtle section-padding">
            <Container>
              <div className="position-relative">
                <ScrollingText scrollTitle="Why Choose us" />
              </div>
              <Row>
                <Col lg="8">
                  <Title subTitle="Services" rightText="Reason Why Choose Us" titleDescription="KiviCare is proud to be a leader and trusted provider of ENT services. For over 20 years, we have and continue to provide world class ENT/Otolaryngology services" />
                </Col>
              </Row>
            </Container>
        </div>
        <div className="service-top">
          <Container className="px-md-5">
              <Row>
                <Col xl="1"></Col>
                <Col xl="10">
                  <Card className="box-shadow mb-0 z-1">
                      <Card.Body className="p-0">
                        <Row className="m-0">
                      {ServiceIconData.map((item, index) => (
                        <Col lg="4" md={`${index === ServiceIconData.length - 1 ? "12" : "6"}`} className={`p-0 p-md-5 ${index === ServiceIconData.length - 1 ? "" : "border-end"}`} key={index}>
                              <div className="no-img-bg py-0 py-lg-4">
                                  <IconboxTransprent iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                              </div>
                            </Col>
                          ))}                          
                        </Row>
                      </Card.Body>
                  </Card>
                </Col>
                <Col xl="1"></Col>
              </Row>
          </Container>
        </div>
      </div>
  )
}
