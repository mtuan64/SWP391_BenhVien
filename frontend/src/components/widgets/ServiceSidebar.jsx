import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

// Images
import shortLogo from '/assets/images/pages/short-logo.png'
import { Image } from 'react-bootstrap'

export default function ServiceSidebar() {
  return (
    <Fragment>
      <div className="mt-5 sidebar-widget-working-hour bg-secondary-subtle text-body p-3 p-md-5">
        <div className="icon mb-4">
            <i className="far fa-clock"></i>
        </div>
        <h4 className="mb-3 fw-500">Opening Time</h4>
        <ul className="list-inline m-0">
            <li className="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between">
              <span>Monday - Friday</span>
              <span>6:00 - 7:00 pm</span>
            </li>
            <li className="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between">
              <span>Saturday</span>
              <span>8:00 - 9:00 pm </span>
            </li>
            <li className="d-flex align-items-center justify-content-between">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
        </ul>
      </div>

      <div className="mt-5 sidebar-widget-services bg-primary-subtle text-body p-3 p-md-5">
        <div className="image mb-5">
            <Image src={shortLogo} className="img-fluid" alt="image" />
        </div>
        <h4 className="mb-3">KiviCare Services</h4>
        <ul className="list-inline m-0">
            <li className="mb-2">
              <span><b>Call : </b></span>
              <span>+123456789</span>
            </li>
            <li className="mb-2">
              <span><b>Mail : </b></span>
              <span>support@example.com</span>
            </li>
            <li>
              <span><b>Address : </b></span>
              <span>1234 North Avenue Luke Lane, South Bend, IN 360001</span>
            </li>
        </ul>
        <div className="sidebar-widget-social-list mt-5">
          <ul className="list-inline m-0 p-0 d-flex align-items-center gap-3 flex-wrap">
            <li>
              <Link to="https://www.facebook.com/" className="facebook-icon">
                <i className="fab fa-facebook"></i>
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com/" className="twitter-icon">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/" className="youtube-icon">
                <i className="fab fa-youtube"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/" className="linkedin-icon">
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}
