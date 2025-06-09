import React from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image';

export default function TeamOverdetail(props) {
  return (
    <div className="iq-team-block team-overdetail position-relative p-2">
      <div className="iq-team-img">
          <Image src={props.teamImage} alt="team" className="img-fluid w-100" loading="lazy" />
      </div>
      <div className="share iq-team-social position-absolute">
          <ul className="list-inline list-unstyled p-0 m-0">
            <li className="mb-2">
                <Link className="position-relative bg-primary text-white d-flex justify-content-center align-items-center" to="https://www.facebook.com/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
            </li>
            <li className="mb-2">
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
      <div className="iq-team-info position-absolute d-block w-100">
          <div className="iq-team-main-detail bg-white">
            <Link to="/doctor-details">
                <h5>{props.teamMemberName}</h5>
            </Link>
            <p className="mb-0 text-uppercase fw-bolder text-primary fw-500">{props.teamSpecialized}</p>
          </div>
      </div>
    </div>
  )
}
