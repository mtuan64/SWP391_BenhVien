import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import IconboxBackgroundHover from '../../widgets/IconboxBackgroundHover'

export default function EyecareIconBox() {
  const ServiceData = [
    {
      iconClass: 'flaticon-paper-plane',
      iconboxTitle: "Eye Q-Lasik",
      iconboxDesc: "It is a long established fact that a will be distracted",
      buttonUrl: "service/service1"
    },
    {
      iconClass: 'flaticon-inspection',
      iconboxTitle: "Glaucoma",
      iconboxDesc: "It is a long established fact that a will be distracted",
      buttonUrl: "service/service1"
    },
    {
      iconClass: 'flaticon-insurance',
      iconboxTitle: "Cataract",
      iconboxDesc: "It is a long established fact that a will be distracted",
      buttonUrl: "service/service1"
    },
    {
      iconClass: 'flaticon-ip',
      iconboxTitle: "Cornea",
      iconboxDesc: "It is a long established fact that a will be distracted",
      buttonUrl: "service/service1"
    }
  ]
  return (
    <div className="care-service section-padding-bottom">
      <Container>
        <Row className="px-3">
          {ServiceData.map((item, index) => (
            <Col lg="3" md="6" className="p-0" key={index}>
              <IconboxBackgroundHover isIcon={true} iconClass={item.iconClass} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
            </Col>
          ))}            
        </Row>
      </Container>
    </div>
  )
}
