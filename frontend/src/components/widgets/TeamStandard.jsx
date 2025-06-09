import React from 'react'
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';

export default function TeamStandard(props) {
  return (
    <div className="iq-team-block team-standard position-relative">
      <div className="iq-team-img">
          <Image src={props.teamImage} alt="team" className="img-fluid w-100" loading="lazy" />
      </div>
      <div className="share iq-team-social position-absolute text-center w-100">
          <ul className="list-inline d-flex align-items-center justify-content-center gap-3">
            <li>
                <Link className="position-relative bg-primary text-white d-flex justify-content-center align-items-center" to="https://www.facebook.com/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
            </li>
            <li>
                <Link className="position-relative bg-primary text-white d-flex justify-content-center align-items-center" to="https://twitter.com/">
                  <i className="fab fa-twitter"></i>
                </Link>
            </li>
            <li>
                <Link className="position-relative bg-primary text-white d-flex justify-content-center align-items-center" to="https://www.google.com/">
                  <i className="fab fa-google"></i>
                </Link>
            </li>
          </ul>
      </div>
      <div className="iq-team-info text-center pt-5 px-3 pb-3 letter-spacing-1">
          <Link to="/doctor-details">
            <h5 className="mb-2 iq-team-title">{props.teamMemberName}</h5>
          </Link>
          <p className="mb-0 mt-1 text-uppercase fw-500 letter-spacing-2">{props.teamSpecialized}</p>
      </div>
    </div>
  )
}
