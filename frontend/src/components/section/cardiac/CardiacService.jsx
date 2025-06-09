import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ButtonBox from '../../widgets/ButtonBox';
import IconboxTransprent from '../../widgets/IconboxTransprent';

// Images
import diagnosis from '/assets/images/cardiac/diagnosis.svg'
import cardiacRehabilitation from '/assets/images/cardiac/cardiac-rehabilitation.svg'
import coronaryHear from '/assets/images/cardiac/coronary-heart.svg'
import cardiacSurgery from '/assets/images/cardiac/cardiac-surgery.svg'

export default function CardiacService() {
  const IconBoxData = [
    {
        iconImage: diagnosis,
        iconboxTitle: "Diagnosis",
        iconboxDesc: "There are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },
    {
      iconImage: coronaryHear,
      iconboxTitle: "Coronary Heart",
      iconboxDesc: "There are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
        iconImage: cardiacRehabilitation,
        iconboxTitle: "Cardiac Rehabilitation",
        iconboxDesc: "There are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },

    {
      iconImage: cardiacSurgery,
      iconboxTitle: "Cardiac Surgery",
      iconboxDesc: "There are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
    }
  ]
  return (
    <div className="section-padding-top cardiac-service">
        <Container>
          <Card>
            <Card.Body className="p-0">
              <Row className="align-items-center m-0">
                <Col lg="5" className="fertility-service position-relative">
                  <ScrollingText scrollTitle="Services" />
                  <Title subTitle="KIVICARE SERVICES" rightText="Cardiac Services By " leftText="KiviCare" titleDescription="We at KiviCare offer
                      world-class solutions in cardiac treatments with the help of advanced tools and the experience
                      of pioneer cardiology team" />
                    <div className="mt-5">
                        <div className="button-primary">
                            <ButtonBox buttonText="Read More" buttonUrl="/service/service1" />
                        </div>
                    </div>
                </Col>
                <Col lg="7" className="padding-80 border-start position-relative">
                  <Row className="gy-md-5">
                    {IconBoxData.map((item, index) => (
                      <Col md="6" key={index}>
                        <div className="no-img-bg pe-lg-5">
                          <IconboxTransprent isBorder={true} isButtonHide={true} iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                        </div>
                      </Col>
                      ))}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
    </div>
  )
}
