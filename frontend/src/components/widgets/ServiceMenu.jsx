import React from 'react'
import { Link } from 'react-router-dom'

export default function ServiceMenu({isActive, ...props}) {
  return (
    <Link to={props.serviceUrl} className={`d-block py-3 px-4 ${isActive && "active" }`}>
      <span className="d-flex align-items-center justify-content-between">
        <span>{props.serviceTitle}</span>
        <span className="icon"><i className="fas fa-plus"></i></span>
      </span>
    </Link>
  )
}
