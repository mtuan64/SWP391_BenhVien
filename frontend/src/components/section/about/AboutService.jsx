import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import IconboxBorder from '../../widgets/IconboxBorder';

export default function AboutService() {
    const iconBoxData = [
        {
          iconClass: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-businessman"></i>,
          iconboxTitle: "Family Consultation",
          iconboxDesc: "It is a long established fact that a reader will be distracted.",
          buttonUrl: "/service/service1"
        },
        {
          iconClass: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-insurance"></i>,
          iconboxTitle: "Health Services",
          iconboxDesc: "It is a long established fact that a reader will be distracted.",
          buttonUrl: "/service/service1"
        },
        {
          iconClass: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-calendar"></i>,
          iconboxTitle: "Health Checkup",
          iconboxDesc: "It is a long established fact that a reader will be distracted.",
          buttonUrl: "/service/service1"
        },
        {
          iconClass: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-reward-1"></i>,
          iconboxTitle: "Awesome Services",
          iconboxDesc: "It is a long established fact that a reader will be distracted.",
          buttonUrl: "/service/service1"
        }
    ]
  return (
    <div className="section-padding bg-primary-subtle text-body">
        <Container>
            <div className="text-center position-relative">
                <ScrollingText scrollTitle="Why Choose" />
            </div>
            <Row className="align-items-center gy-4">
                <Col md="6">
                    <Title subTitle="SERVICES" rightText="Why choose " leftText="Us" />
                </Col>
                <Col md="6">
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                </Col>
            </Row>
            <Row className="mt-2 gy-4">
                {iconBoxData.map((item, index) => (
                    <Col lg="3" md="6" key={index}>
                        <IconboxBorder isIcon={true} iconClass={item.iconClass} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl}/>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
  )
}
