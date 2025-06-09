import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Widgets
import IconboxList from '../../widgets/IconboxList'

// Images
import PatientCare1 from '/assets/images/skin-specialist/Patient-Care-1.png'
import ExperienceDoctors1 from '/assets/images/skin-specialist/Experience-Doctors-1.png'
import ModernEquipment1 from '/assets/images/skin-specialist/Modern-Equipment-1.png'

export default function SkinspeciatistIconbox() {
  const iconData = [
    {
      iconImage: PatientCare1,
      iconboxTitle: "High Standard Of Patient Care",
      listValue1: "I need help managing my pain",
      listValue2: "Advance Advisory Team",
      btnUrl: "/service/service2"
    },
    {
      iconImage: ExperienceDoctors1,
      iconboxTitle: "Experience Doctors And Support Staff",
      listValue1: "I need help managing my pain",
      listValue2: "Advance Advisory Team",
      btnUrl: "/service/service2"
    },
    {
      iconImage: ModernEquipment1,
      iconboxTitle: "Latest And Modern Equipment",
      listValue1: "I need help managing my pain",
      listValue2: "Advance Advisory Team",
      btnUrl: "/service/service2"
    }
  ]
  return (
    <div className="section-padding">
      <Container>
        <Row className="gy-5">
          {iconData.map((item, index) =>  (
            <Col lg="4" md={index === iconData.length - 1 ? "12" : "6"}  className={index != 1 ? "" : "active"} key={index}>
              <IconboxList iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} listValue1={item.listValue1} listValue2={item.listValue2} btnUrl={item.btnUrl} />
            </Col>)
          )}            
        </Row>
      </Container>
    </div>
  )
}
