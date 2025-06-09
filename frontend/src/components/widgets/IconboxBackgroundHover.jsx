import React from 'react'

export default function IconboxBackgroundHover({isIcon,isButtonHide, ...props}) {
  return (
    <div className="iconbox-border iq-icon-box iq-icon-box-bg p-3 p-md-5 position-relative">
      {isIcon === true ? (
        <div className="icon-box-icon">
          <i aria-hidden="true" className={`flaticon flaticon-flaticon ${props.iconClass}`}></i>
        </div>
       ) :(
        <div className="icon-box-icon">
            <img src={props.iconImage} alt="icon" className="img-fluid" loading="lazy" />
        </div>
       )}

      {isButtonHide === true ? (
        <div className="icon-box-content mt-3 mt-md-5">
          <h4 className="icon-box-title mb-2">{props.iconboxTitle}</h4>
          <p className="icon-box-desc m-0">{props.iconboxDesc}</p>
        </div>
      ) : (
        <div className="icon-box-content mt-3 mt-md-5">
          <h4 className="icon-box-title mb-2">{props.iconboxTitle}</h4>
          <p className="icon-box-desc m-0">{props.iconboxDesc}</p>
          <div className="iconbox-button mt-3 mt-md-5">
            <div className="iq-btn-container">
                <a className="iq-button iq-btn-link text-capitalize" href={props.buttonUrl}>
                  read more{" "}
                  <span className="btn-link-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                      </svg>
                  </span>
                </a>
            </div>
          </div>
      </div>
      )}
    </div>
  )
}
