import React from 'react'
import { Fragment } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const Color = () => {
    return (
        <Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Header className="mb-0">
                            <div className="header-title">
                                <h4 className="card-title">KiviCare Color</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                        <p>Similar to the contextual text color classes, easily set the background of an element to any contextual
                            class. Anchor components will darken on hover, just like the text classes. Background utilities <strong>do not
                                set <code>color</code></strong>, so in some cases you’ll want to use <code>.text-*</code> utilities.</p>
                        <Row className="mt-4 gy-3">
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-primary pt-5 pb-5 text-center rounded"></p>
                                <h6>Primary</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-secondary pt-5 pb-5 text-center rounded"></p>
                                <h6>Secondary</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-success pt-5 pb-5 text-center rounded"></p>
                                <h6>Success</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-danger pt-5 pb-5 text-center rounded"></p>
                                <h6>Danger</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-warning pt-5 pb-5 text-center rounded"></p>
                                <h6>Warning</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-info pt-5 pb-5 text-center rounded"></p>
                                <h6>Info</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-light pt-5 pb-5 text-center rounded"></p>
                                <h6>Light</h6>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-dark pt-5 pb-5 text-center rounded"></p>
                                <h6>Dark</h6>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header className="mb-0">
                            <div className="header-title">
                                <h4 className="card-title">KiviCare Color</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                        <p>Similar to the contextual text color classes, easily set the background of an element to any contextual
                            class. Anchor components will darken on hover, just like the text classes. Background utilities <strong>do not
                                set <code>color</code></strong>, so in some cases you’ll want to use <code>.text-*</code> utilities.</p>
                        <Row className="mt-4">
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-primary-subtle pt-5 pb-5 text-center rounded">Primary</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-secondary-subtle pt-5 pb-5 text-center rounded">Secondary</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-success-subtle pt-5 pb-5 text-center rounded">Success</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-danger-subtle pt-5 pb-5 text-center rounded">Danger</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-warning-subtle pt-5 pb-5 text-center rounded">Warning</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-info-subtle pt-5 pb-5 text-center rounded">Info</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-light-subtle pt-5 pb-5 text-center rounded">Light</p>
                            </Col>
                            <Col lg={2} md={6} className="text-center">
                                <p className="bg-dark-subtle pt-5 pb-5 text-center rounded custom-text-dark">Dark</p>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header className="mb-0">
                            <div className="header-title">
                                <h4 className="card-title">KiviCare Text Color</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                        <p>Contextual text classes also work well on anchors with the provided hover and focus states. <strong>Note that
                            the <code>.text-white</code> and <code>.text-muted</code> class has no additional link styling beyond
                            underline.</strong></p>
                            <p className="text-primary">.text-primary</p>
                            <p className="text-secondary">.text-secondary</p>
                            <p className="text-success">.text-success</p>
                            <p className="text-danger">.text-danger</p>
                            <p className="text-warning">.text-warning</p>
                            <p className="text-bg-info">.text-bg-info</p>
                            <p className="text-light bg-dark">.text-light</p>
                            <p className="text-dark">.text-dark</p>
                            <p className="text-muted">.text-muted</p>
                            <p className="text-white bg-dark">.text-white</p>
                            <p className="text-black-50">.text-black-50</p>
                            <p className="text-white-50 bg-dark mb-0">.text-white-50</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header className="mb-0">
                            <div className="header-title">
                                <h4 className="card-title">KiviCare Text Color</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                        <p>Contextual text classes also work well on anchors with the provided hover and focus states. <strong>Note that
                            the <code>.text-white</code> and <code>.text-muted</code> class has no additional link styling beyond
                            underline.</strong></p>
                        <p><a href="#" className="text-primary">Primary link</a></p>
                        <p><a href="#" className="text-secondary">Secondary link</a></p>
                        <p><a href="#" className="text-success">Success link</a></p>
                        <p><a href="#" className="text-danger">Danger link</a></p>
                        <p><a href="#" className="text-warning">Warning link</a></p>
                        <p><a href="#" className="text-bg-info">bg-Info link</a></p>
                        <p><a href="#" className="text-light bg-dark">Light link</a></p>
                        <p><a href="#" className="text-dark">Dark link</a></p>
                        <p><a href="#" className="text-muted">Muted link</a></p>
                        <p className="mb-0"><a href="#" className="text-white bg-dark">White link</a></p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header className="mb-0">
                            <div className="header-title">
                                <h4 className="card-title">KiviCare Text Color</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                        <p>Contextual text classes also work well on anchors with the provided hover and focus states. <strong>Note that
                            the <code>.text-white</code> and <code>.text-muted</code> class has no additional link styling beyond
                            underline.</strong></p>
                        <p className="bg-primary-subtle ps-3 pe-3 pt-2 pb-2 rounded">Primary link</p>
                        <p className="bg-secondary-subtle ps-3 pe-3 pt-2 pb-2 rounded">Secondary link</p>
                        <p className="bg-success-subtle ps-3 pe-3 pt-2 pb-2 rounded">Success link</p>
                        <p className="bg-danger-subtle ps-3 pe-3 pt-2 pb-2 rounded">Danger link</p>
                        <p className="bg-warning-subtle ps-3 pe-3 pt-2 pb-2 rounded">Warning link</p>
                        <p className="bg-info-subtle ps-3 pe-3 pt-2 pb-2 rounded">bg-Info link</p>
                        <p className="bg-dark-subtle ps-3 pe-3 pt-2 pb-2 rounded mb-0 custom-text-dark">Dark link</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header className="mb-0">
                            <div className="header-title">
                                <h4 className="card-title">KiviCare Text Color</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                        <p>Contextual text classes also work well on anchors with the provided hover and focus states. <strong>Note that
                            the <code>.text-white</code> and <code>.text-muted</code> class has no additional link styling beyond
                            underline.</strong></p>
                        <p><a href="#" className="bg-primary-subtle ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">Primary link</a></p>
                        <p><a href="#" className="bg-secondary-subtle ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">Secondary link</a></p>
                        <p><a href="#" className="bg-success-subtle ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">Success link</a></p>
                        <p><a href="#" className="bg-danger-subtle ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">Danger link</a></p>
                        <p><a href="#" className="bg-warning-subtle ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">Warning link</a></p>
                        <p><a href="#" className="bg-info-subtle ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">bg-Info link</a></p>
                        <p className="mb-0"><a href="#" className="dark ps-3 pe-3 pt-2 pb-2 rounded d-inline-block">Dark link</a></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Color
