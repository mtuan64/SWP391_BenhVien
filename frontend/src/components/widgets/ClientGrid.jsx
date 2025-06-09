import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'
// Json
import {clientData} from '../../staticData/clientData'


export default function ClientGrid() {
  return (
    <div className="iq-client-grid">
      <Row className="row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {clientData.map((item, index) => (
          <Col className="text-center border p-3">
            <Image src={item.clientImage} alt="client" className="iq-client-img" loading="lazy" />
          </Col>
        ))}
      </Row>
    </div>
  )
}
