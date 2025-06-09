import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

// Widgets
import ScrollingText from '../../widgets/ScrollingText';
import ButtonBox from '../../widgets/ButtonBox';
import ServiceCreative from '../../widgets/ServiceCreative';

// Json
import { serviceData } from '../../../staticData/serviceData';

export default function OrthopedicsService() {
  return (
    <div className="ortho-service">
      <div className="bg-secondary text-white section-padding">
        <Container>
          <div className="position-relative text-center">
            <ScrollingText scrollTitle="our services" />
          </div>
          <div className="iq-title-box mb-0 text-center">
            <span className="iq-subtitle text-uppercase text-primary">KiviCare services</span>
            <h2 className="iq-title iq-heading-title">
              <span className="right-text text-capitalize fw-500 text-white">Long-Term Orthopedic Care </span>
              <span className="left-text text-capitalize fw-light text-white">by KiviCare</span>
            </h2>
        </div>
        </Container>
      </div>
      <div className="service-top">
        <Container>
          <Row className="row-cols-xl-3 row-cols-md-2 row-cols-1 gy-5">
            {serviceData.slice(0, 3)?.map((item, index) => (
              <Col className={`${index === 0 ? "mt-0" : "mt-5  mt-md-0"} ${index === 3 && "col mt-5 mt-xl-0"} `}>
                <ServiceCreative serviceimage={item.serviceImage} serviceIcon={item.serviceIcon} serviceTitle={item.serviceTitle} serviceCategory={item.serviceCategory} serviceDescription={item.serviceDescription} btnUrl={item.btnUrl} />
              </Col>
            ))}              
          </Row>
          <div className="text-center mt-5 pt-0 pt-md-5">
            <ButtonBox buttonText="view all" buttonUrl="/service/service2" />
        </div>
        </Container>
      </div>
    </div>
  )
}
