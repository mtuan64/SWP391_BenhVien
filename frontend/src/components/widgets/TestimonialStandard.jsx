import React, { Fragment } from 'react'
import FilterRating from './FilterRating'
import RatingStar from './RatingStar'

export default function TestimonialStandard( {isTeastimonialicon, isRatting, isAuthorImageHide,...props}) {
  return (
    <div className="iq-testimonial testimonial-standard">
      <div className="iq-testimonial-content">
        {isTeastimonialicon === true && (
            <div className="testimonial-icon">
              <img
                src={props.quoteImage}
                alt="quote"
                className="img-fluid"
                loading="lazy"
              />
            </div>
          )}
          <p className="text-body fw-normal fst-italic">{props.testimonialContent}</p>
      </div>
      {isRatting === true && (
        <div className="ratting-block">
          <FilterRating rating={props.ratting} />
        </div>
      )}
       <div className="iq-testimonial-member mt-5 d-flex gap-3">
        {isAuthorImageHide === true ? (
          <div className="avtar-name">
            <h5 className="iq-lead text-capitalize m-0">{props.testimonialUser}</h5>
            <span className="iq-post-meta text-secondary text-uppercase">{props.testimonialMeta}</span>
          </div>
        ) : (
          <Fragment>
            <div className="iq-testimonial-avtar">
              <img
                src={props.testimonialImage}
                alt="user"
                className="img-fluid rounded-circle"
                loading="lazy"
              />
            </div>
            <div className="avtar-name">
              <h5 className="iq-lead text-capitalize m-0">{props.testimonialUser}</h5>
              <span className="iq-post-meta text-secondary text-capitalize">{props.testimonialMeta}</span>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
