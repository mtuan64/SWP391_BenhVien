import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ServiceBox from '../../widgets/ServiceBox';

// Json
import {serviceData} from '../../../staticData/serviceData';

// Images
import MediclaimFacilities1 from '/assets/images/ent-clinic/Mediclaim-Facilities-1.webp';
import StichlessSurgery1 from '/assets/images/ent-clinic/Stichless-surgery-1.webp';
import Awards1 from '/assets/images/ent-clinic/Awards-1.webp';

export default function PaediatricianService() {
  return (
    <div className="section-padding">
      <Container>
        <div className="text-center position-relative">
          <ScrollingText scrollTitle="our services" />
          <Title subTitle="our services" rightText="The World’s Best Child Care " leftText="Treatment" />
        </div>
        <Row className="row-cols-xl-3 row-cols-md-2 row-cols-1 gy-5">
          {serviceData.slice(0, 3).map((item, index) => (
            <Col key={index}>
              <ServiceBox  serviceTitle={item.serviceTitle} serviceDescription={item.serviceDescription} serviceImage={item.serviceImage} serviceIcon={item.serviceIconAlternate} btnUrl={item.btnUrl} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
