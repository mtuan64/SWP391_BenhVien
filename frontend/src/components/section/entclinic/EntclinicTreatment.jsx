import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import IconboxStandard from '../../widgets/IconboxStandard';

// Images
import EarTreatment1 from '/assets/images/ent-clinic/Ear-Treatment-1.webp'
import NoseTreatment1 from '/assets/images/ent-clinic/Nose-Treatment-1.webp'
import ThroatTreatment1 from '/assets/images/ent-clinic/Throat-Treatment-1.webp'
import PioneerOfTreatment1 from '/assets/images/ent-clinic/Pioneer-Of-Treatment-1.webp'

export default function EntclinicTreatment() {
  const TreatmentIconData = [
    {
      iconImage: EarTreatment1,
      iconboxTitle: "Ear Treatment",
      iconboxDesc: "KiviCare ENT provides medical evaluation and treatment for a variety of ear conditions.",
      btnUrl: "/service/service1"
    },
    {
      iconImage: NoseTreatment1,
      iconboxTitle: "Nose Treatment",
      iconboxDesc: "KiviCare ENT provides medical evaluation and treatment for a variety of ear conditions.",
      btnUrl: "/service/service1"
    },
    {
      iconImage: ThroatTreatment1,
      iconboxTitle: "Throat Treatment",
      iconboxDesc: "KiviCare ENT provides medical evaluation and treatment for a variety of ear conditions.",
      btnUrl: "/service/service1"
    },
    {
      iconImage: PioneerOfTreatment1,
      iconboxTitle: "Pioneer Treatment",
      iconboxDesc: "KiviCare ENT provides medical evaluation and treatment for a variety of ear conditions.",
      btnUrl: "/service/service1"
    }
  ]
  return (
    <div className="section-padding bg-primary-subtle">
        <Container>
          <div className="text-center position-relative">
            <ScrollingText scrollTitle="Treatments" />
            <Title subTitle="Treatments" rightText="Providing Best  ENT Treatments" />
          </div>
          <Row className="gy-4">
            {TreatmentIconData.map((item, index) => (
              <Col lg="3" md="6" key={index}>
                <IconboxStandard iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} btnUrl={item.btnUrl} />
              </Col>
            ))}            
          </Row>
        </Container>
    </div>
  )
}
