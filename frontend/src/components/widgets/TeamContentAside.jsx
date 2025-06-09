import React from 'react'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

export default function TeamContentAside(props) {
  return (
    <div className="iq-team-block team-content-aside position-relative">
      <div className="iq-team-img">
          <Image src={props.teamImage} alt="team" className="img-fluid w-100" loading="lazy" />
      </div>
      <div className="team-content text-lg-start text-center mt-lg-0 mt-5">
            <div className="iq-team-info">
                <p className="mb-0 text-uppercase fw-500 font-size-14 letter-spacing-1">{props.teamSpecialized}</p>
                <Link to="/doctor-details">
                    <h4 className="iq-team-title">{props.teamMemberName}</h4>
                </Link>
            </div>
            <ul className="iq-social list-inline d-flex align-items-center justify-content-lg-start justify-content-center gap-2 pt-lg-3 mt-5 mb-0 mx-0">
                <li className="label">Follow us :</li>
                <li>
                    <Link to="https://www.facebook.com/" target="_blank">
                        <svg className="base-circle animated" width="35" height="35" viewBox="0 0 50 50">
                            <circle className="c1" cx="25" cy="25" r="23" stroke="#6e7990" strokeWidth="1" fill="none">
                            </circle>
                        </svg>
                        <i className="fab fa-facebook-f"></i>
                    </Link>
                </li>
                <li>
                    <Link to="https://twitter.com/" target="_blank">
                        <svg className="base-circle animated" width="35" height="35" viewBox="0 0 50 50">
                            <circle className="c1" cx="25" cy="25" r="23" stroke="#6e7990" strokeWidth="1" fill="none">
                            </circle>
                        </svg>
                        <i className="fab fa-twitter"></i>
                    </Link>
                </li>
                <li>
                    <Link to="https://www.google.com/" target="_blank">
                        <svg className="base-circle animated" width="35" height="35" viewBox="0 0 50 50">
                            <circle className="c1" cx="25" cy="25" r="23" stroke="#6e7990" strokeWidth="1" fill="none">
                            </circle>
                        </svg>
                        <i className="fab fa-google"></i>
                    </Link>
                </li>
            </ul>
      </div>
    </div>
  )
}
