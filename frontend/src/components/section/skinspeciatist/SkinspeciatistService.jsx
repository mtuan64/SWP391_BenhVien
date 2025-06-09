import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import ButtonBox from '../../widgets/ButtonBox'
import IconboxTransprent from '../../widgets/IconboxTransprent'

// Images
import AntiAgeingTreatment1 from '/assets/images/skin-specialist/Anti-Ageing-Treatment-1.png'
import LaserTreatment1 from '/assets/images/skin-specialist/laser-treatment-1.png'
import SkinTreatment1 from '/assets/images/skin-specialist/skin-treatment-1.png'
import PlasticSurgery1 from '/assets/images/skin-specialist/plastic-surgery-1.png'

export default function SkinspeciatistService() {
  const IconServiceData = [
    {
      iconImage: AntiAgeingTreatment1,
      iconboxTitle: "Ageing Treatment",
      iconboxDesc: "It is a long established fact that a will be distracted by the",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: SkinTreatment1,
      iconboxTitle: "Skin Treatment",
      iconboxDesc: "It is a long established fact that a will be distracted by the",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: LaserTreatment1,
      iconboxTitle: "Laser Treatment",
      iconboxDesc: "It is a long established fact that a will be distracted by the",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: PlasticSurgery1,
      iconboxTitle: "Plastic Surgery",
      iconboxDesc: "It is a long established fact that a will be distracted by the",
      buttonUrl: "/service/service1"
    }
  ]
  return (
    <div className="section-padding bg-primary-subtle skin-specialist-services">
      <Container>
        <Card className="mb-0">
            <Card.Body className="p-0">
                <Row className="align-items-center m-0">
                    <Col lg="4" className="p-3 p-md-5">
                      <Title subTitle="OUR SERVICES" rightText="Welcome To" leftText=" KiviCare" titleDescription="It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout." />
                      <div className="mt-4 button-primary">
                        <ButtonBox buttonText="Read More" buttonUrl="/service/service1" />
                      </div>
                    </Col>
                    <Col lg="8" className="p-md-5 p-0 border-start">
                      <Row className="py-0 py-md-5 gy-md-5 gy-0">
                        {IconServiceData.map((item, index) => (
                          <Col md="6" key={index}>
                            <div className="no-img-bg pe-lg-5 pe-md-3">
                                <IconboxTransprent isBorder={true} isButtonHide={true} iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} />
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
