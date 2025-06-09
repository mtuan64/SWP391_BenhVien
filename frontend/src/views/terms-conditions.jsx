import React, { Fragment } from 'react'
import { Container, Accordion } from 'react-bootstrap'

// widgets
import BreadCrumb from '../components/partial/BreadCrumb'
import Faq from '../components/widgets/Faq'

export default function TermsConditions() {
  const termsData = [
    {
      "uniqid": "01",
      "faqTitle": "Lorem Ipsum Dolor Sit",
      "faqdesc": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything."
    },
    {
      "uniqid": "02",
      "faqTitle": "Consectetur Adipiscing Elit",
      "faqdesc": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything."
    },
    {
      "uniqid": "03",
      "faqTitle": "Etiam Sit Amet Justo Non?",
      "faqdesc": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything."
    },
    {
      "uniqid": "04",
      "faqTitle": " Velit Accumsan Laoreet?",
      "faqdesc": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything."
    },
    {
      "uniqid": "05",
      "faqTitle": "Donec Volutpat Metus In Erat",
      "faqdesc": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything."
    }
  ]
  return (
    <Fragment>
      <BreadCrumb title="Privacy Policy" />
      <div className="section-padding">
        <Container>
        <div className="accordion" id="main-faq">
          <Accordion defaultActiveKey={termsData[0]?.uniqid} className="mb-3">
            {termsData.map((item, index) => (
              <Faq uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} key={index} />
            ))}
          </Accordion>
        </div>
        </Container>
      </div>
    </Fragment>
  )
}
