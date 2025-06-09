import React, { Fragment } from 'react'
import {Accordion} from 'react-bootstrap'


export default function Faq(props) {
  return (
    <Fragment>   
      <Accordion.Item eventKey={props.uniqid} className="custom-accordion mb-4 bg-white rounded-0">
        <Accordion.Header className="h5 fw-500">{props.faqTitle}</Accordion.Header>
        <Accordion.Body>
          {props.faqdesc}
        </Accordion.Body>
      </Accordion.Item>     
    </Fragment>
  )
}
