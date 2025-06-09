import React from 'react'
import { Col, Row, Container, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import IconboxTransprent from '../../widgets/IconboxTransprent';

// Images
import serviceBg from '/assets/images/paediatrician/service-bg.webp';
import MediclaimFacilities1 from '/assets/images/ent-clinic/Mediclaim-Facilities-1.webp';
import StichlessSurgery1 from '/assets/images/ent-clinic/Stichless-surgery-1.webp';
import Awards1 from '/assets/images/ent-clinic/Awards-1.webp';

export default function PaediatricianWhyChoose() {
  const ServiceIconData = [
    {
      iconImage: MediclaimFacilities1,
      iconboxTitle: "Mediclaim Facilities",
      iconboxDesc: "A policy provides coverage against medical expenses that one might incur. Individuals who have a cashless claim",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: StichlessSurgery1,
      iconboxTitle: "Stitch-Less Surgery",
      iconboxDesc: "A policy provides coverage against medical expenses that one might incur. Individuals who have a cashless claim",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: Awards1,
      iconboxTitle: "Awards",
      iconboxDesc: "A policy provides coverage against medical expenses that one might incur. Individuals who have a cashless claim",
      buttonUrl: "/service/service1"
    }
  ]
  return (
    <div className="paediatricin-service position-relative">
        <Image src={serviceBg} alt="service-bg" className="service-bg img-fluid position-absolute" />
        <div className="bg-secondary text-white section-padding">
          <Container className="position-relative">
            <ScrollingText scrollTitle="choose us" />
            <Row>
              <Col lg="8" xxl="6" className="zindex">
                <Title subTitle="why choose us" rightText="Reasons Why You Should" leftText=" Choose Us" titleDescription="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable." />  
              </Col>
            </Row>
          </Container>
        </div>
        <div className="service-top">
          <Container className="px-md-5">
            <Row>
              <Col xl="1"></Col>
              <Col xl="10">
                <div className="card box-shadow mb-0">
                  <div className="card-body p-0">
                    <Row className="m-0">
                      {ServiceIconData.map((item, index) => (
                        <Col lg="4" md="6" className={`p-0 p-md-5 ${index === ServiceIconData.length - 1 ? '' : 'border-end' }`} key={index}>
                          <div className="no-img-bg py-0 py-lg-4">
                            <IconboxTransprent iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                          </div>
                        </Col>
                      ))}  
                    </Row>
                  </div>
                </div>
              </Col>
              <Col xl="1"></Col>
            </Row>
          </Container>
        </div>
      </div>
  )
}
