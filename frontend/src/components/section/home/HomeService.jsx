import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'

// Widget
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import ButtonBox from '../../widgets/ButtonBox'
import IconboxTransprent from '../../widgets/IconboxTransprent'

export default function HomeService() {
  const ServiceData = [
    {
        iconClass: "flaticon-in-love",
        iconboxTitle: "Family Consultation",
        iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout.",
        buttonUrl: "service/oncologist"
    },
    {
        iconClass: "flaticon-insurance",
        iconboxTitle: "Home Health Services",
        iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout.",
        buttonUrl: "service/entspecialist"
    },
    {
        iconClass: "flaticon-thumbs-up",
        iconboxTitle: "Minor Procedures",
        iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout.",
        buttonUrl: "service/neurologist"
    }
  ]
  return (
    <div className="section-service-box bg-secondary-subtle section-padding position-relative">
        <Container className="position-relative title-content">
            <Row>
                <Col lg="6">
                    <ScrollingText scrollTitle="Our Services" />
                    <Title subTitle="Services" leftText="Services." rightText="We Provide Medical " titleDescription="It is a long established fact that a reader will be distracted by
    the readable content of a page when looking at its layout." />
                    <div className="mt-3 mb-5">
                        <ButtonBox buttonUrl="service/service1" buttonText="all service" />
                    </div>
                </Col>
                <Col lg="6" className="d-lg-block d-none"></Col>
            </Row>
            <Card className="mb-0">
                <Card.Body className="p-0">
                    <Row>
                        {ServiceData.map((item, index) => (
                            <Col lg="4" md="6" className={index === ServiceData.length - 1 ? '' : 'iq-box-right-border'} key={index}>
                                <IconboxTransprent isBorder={true} isIcon={true} iconClass={item.iconClass} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                            </Col>
                        ))}                                
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
