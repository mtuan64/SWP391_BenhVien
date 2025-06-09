import React from 'react'
import { Image } from 'react-bootstrap'
import FilterRating from './FilterRating'

export default function TestimonialAuthor({isRatting, ...props}) {
  return (
    <div className="iq-testimonial testimonial-author">
      <div className="iq-testimonial-content d-lg-flex">
          <div className="iq-testimonial-avtar me-lg-5 pe-lg-5 mb-lg-0 mb-5 flex-shrink-0">
              <Image src={props.testimonialImage} alt="user" className="img-fluid" loading="lazy" />
          </div>
          <div className="iq-testimonial-content-inner">
              <p className="mt-0 mb-3 fst-italic fw-500 letter-spacing-1 lh-lg text-body fs-5">{props.testimonialContent}</p>
              {isRatting === true && (
                <div className="ratting-block">
                  <FilterRating rating={props.ratting} />
                </div>
              )}              
              <div className="avtar-name mt-5">
                  <h4 className="iq-lead text-capitalize m-0 fw-normal">{props.testimonialUser}</h4>
                  <span className="iq-post-meta text-secondary text-uppercase">{props.testimonialMeta}</span>
              </div>
          </div>
      </div>
  </div>
  )
}
