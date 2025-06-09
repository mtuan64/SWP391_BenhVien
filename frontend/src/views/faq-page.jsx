import React, { Fragment } from 'react'
import { Container, Accordion } from 'react-bootstrap';

// Widgets
import BreadCrumb from '../components/partial/BreadCrumb';
import Faq from '../components/widgets/Faq';

// Json
import {faqData} from '../staticData/faqData'

export default function FaqPage() {
  return (
    <Fragment>
      <BreadCrumb title="Faq" />
      <div className="section-padding">
        <Container>
          <div className="accordion" id="main-faq">
            <Accordion defaultActiveKey={faqData[0]?.uniqid} className="mb-3">
              {faqData.map((item, index) => (
                <Faq key={index} uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} />
              ))}
            </Accordion>
          </div> 
        </Container>
      </div>
    </Fragment>
  )
}
