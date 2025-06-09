import React from 'react'
import Card from '../../components/bootstrap/card'
import { Row, Col } from 'react-bootstrap'


//leaflet
import Leaflet from '../../components/leaflet'

const Vector = () => {
    return (
        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between mb-0">
                            <div className="header-title">
                                <h4 className="card-title">Vector</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Leaflet id="chart-map-column-04" className="custom-chart" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Vector
