import React, { Fragment } from 'react'
import Image from 'react-bootstrap/Image';
import FilterRating from './FilterRating';

export default function TestimonialStandardWithSeprator({isTeastimonialicon, isRatting, isAuthorimagehide, ...props}) {
  return (
    <Fragment>
      <div className="iq-testimonial testimonial-standard with-seprator">
        <div className="iq-testimonial-content">
          {isTeastimonialicon === true && (
            <div className="testimonial-icon text-end">
              <Image src={props.quoteImage} alt="quote" className="img-fluid" loading="lazy" />
          </div>
          )}
          <p className="text-body fw-normal fst-italic">
            {props.testimonialContent}
          </p>
        </div>
        {isRatting === true && (
          <div className="ratting-block">
            <FilterRating rating={props.ratting} />
          </div>
        )}
        <div className="iq-testimonial-member border-top">
          {isAuthorimagehide === true ? (
            <div className="avtar-name">
                <h5 className="iq-lead text-capitalize m-0">{props.testimonialUser}</h5>
                <span className="iq-post-meta text-secondary text-uppercase">{props.testimonialMeta}</span>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div className="iq-testimonial-avtar">
                  <Image src={props.testimonialImage} alt="user" className="img-fluid rounded-circle" loading="lazy" />
              </div>
              <div className="avtar-name">
                  <h5 className="iq-lead text-capitalize m-0">{props.testimonialUser}</h5>
                  <span className="iq-post-meta text-secondary text-capitalize">{props.testimonialMeta}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}
