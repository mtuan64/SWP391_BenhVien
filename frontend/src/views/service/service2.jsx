import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import BreadCrumb from '../../components/partial/BreadCrumb';
import ServiceBox from '../../components/widgets/ServiceBox';

// Json
import {serviceData} from '../../staticData/serviceData'

export default function Service2() {
  return (
    <Fragment>
      <BreadCrumb title="Service" />
      <div className="section-padding">
        <Container>
          <Row className="row-cols-xl-3 row-cols-md-2 row-cols-1 gy-5">
            {serviceData.map((item, index) => (
              <Col lg="4" md="6" key={index}>
                <ServiceBox serviceTitle={item.serviceTitle} serviceDescription={item.serviceDescription} serviceImage={item.serviceImage} serviceIcon={item.serviceIcon} btnUrl={item.btnUrl} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
