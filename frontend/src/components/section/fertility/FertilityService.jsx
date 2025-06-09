import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import ButtonBox from '../../widgets/ButtonBox';
import IconboxTransprent from '../../widgets/IconboxTransprent';

// Images
import service1 from '/assets/images/fertility-clinic/service-1.webp'
import service2 from '/assets/images/fertility-clinic/service-2.webp'
import service3 from '/assets/images/fertility-clinic/service-3.webp'
import service4 from '/assets/images/fertility-clinic/service-4.webp'

export default function FertilityService() {
  const ServiceIconData = [
    {
      iconImage: service1,
      iconboxTitle: "Fertility Counseling",
      iconboxDesc: "To make this journey smooth, all KiviCare centres have qualified and dedicated counsellors on board.",
      buttonUrl: ""
    },
    {
      iconImage: service3,
      iconboxTitle: "IUI Treatment",
      iconboxDesc: "To make this journey smooth, all KiviCare centres have qualified and dedicated counsellors on board.",
      buttonUrl: ""
    },
    {
      iconImage: service2,
      iconboxTitle: "Embryoscope",
      iconboxDesc: "To make this journey smooth, all KiviCare centres have qualified and dedicated counsellors on board.",
      buttonUrl: ""
    },
    {
      iconImage: service4,
      iconboxTitle: "Sperm Retrieval",
      iconboxDesc: "To make this journey smooth, all KiviCare centres have qualified and dedicated counsellors on board.",
      buttonUrl: ""
    }
  ]
  return (
    <div className="section-padding-top scrolling-top">
        <Container>
          <Card>
            <Card.Body className="p-0">
              <Row className="align-items-center m-0">
                  <Col lg="5" className="fertility-service">
                    <Title subTitle="KiviCare SERVICES" rightText="Fertility Services & " leftText="Treatments." titleDescription="We at KiviCare
                IVF offer world-class solutions in fertility treatments with the help of advanced tools and
                the experience of pioneer gynecologists team" />
                    <div className="mt-5">
                      <div className="button-primary">
                        <ButtonBox buttonText="Read More" buttonUrl="/service/service1" />
                      </div>
                    </div>
                  </Col>
                  <Col lg="7" className="padding-80 border-start">
                    <Row className="gy-md-5 gy-0">
                      {ServiceIconData.map((item, index) => (
                          <Col md="6" key={index}>
                            <div className="no-img-bg pe-lg-5 fertility-clinic">
                                <IconboxTransprent isBorder={true} iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} />
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
