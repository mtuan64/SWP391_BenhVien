import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'

// Widgets
import ScrollingText from '../../widgets/ScrollingText'
import Title from '../../widgets/Title'
import IconboxTransprent from '../../widgets/IconboxTransprent'

// Images
import service1 from '/assets/images/Dentist-Page/service-1.webp'
import service2 from '/assets/images/Dentist-Page/service-2.webp'
import service3 from '/assets/images/Dentist-Page/service-3.webp'

export default function DentistService() {
  const ServiceData = [
    {
        iconImage: service1,
        iconboxTitle: "Family Consultation",
        iconboxDesc: "It is a long established fact that a reader will be distracted by the readable content",
        buttonUrl: "/service/cardiologist"
    },
    {
        iconImage: service2,
        iconboxTitle: "Health Services",
        iconboxDesc: "It is a long established fact that a reader will be distracted by the readable content",
        buttonUrl: "/service/neurologist"
    },
    {
        iconImage: service3,
        iconboxTitle: "Minor Procedures",
        iconboxDesc: "It is a long established fact that a reader will be distracted by the readable content",
        buttonUrl: "/service/psychiatrists"
    }
  ]
  return (
    <div className="section-service-box bg-light-dentist section-padding position-relative ">
      <Container className="position-relative title-content">
        <Row>
          <Col lg="6">
            <ScrollingText ScrollingText="Our Services" />
            <Title subTitle="Services" rightText="We Provide Medical " leftText="Services." titleDescription="It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout." />
          </Col>
          <Col lg="6" className="d-lg-block d-none">
          </Col>
        </Row>
        <Card>
          <Card.Body className="p-0">
              <Row>
              {ServiceData.map((item, index) => (
                <Col lg="4"  md={index === ServiceData.length - 1 ? "12" : "6"}  className={index === ServiceData.length - 1 ? '' : 'iq-box-right-border'} key={index}>
                    <div className="no-img-bg box-padding p-0 p-lg-5 p-md-5">
                      <IconboxTransprent isBorder={true} iconImage={item.iconImage} iconclassName={item.iconClass} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                    </div>
                  </Col>
                ))}                  
              </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
