import React from 'react'
import { Link } from 'react-router-dom'

// Json
import {socialData} from '../../staticData/socialMediaData'

export default function SocialMedia({isLabelHide, ...props}) {
  return (
    <ul className={`iq-social list-inline d-flex align-items-center gap-3 m-0 ${props.customClass}`}>
        {isLabelHide === true ? ("") : (
            <li className="label fw-500">Follow us :</li>
        )}        
        {socialData.map((item, index) => (
            <li key={index}>
                <Link to={item.socialUrl}>
                    <svg className="base-circle animated" width="38" height="38" viewBox="0 0 50 50">
                        <circle className="c1" cx="25" cy="25" r="23" stroke="#6e7990" strokeWidth="1"
                            fill="none"></circle>
                    </svg>
                    <i className={`${item.socialIcon}`}></i>                    
                </Link>
            </li>
        ))}
    </ul>
  )
}
