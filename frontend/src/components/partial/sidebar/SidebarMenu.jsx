import React,{memo,Fragment} from 'react'

//Router
import { Link, useLocation } from 'react-router-dom'

//React-bootstrap
import { Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'

const SidebarMenu = memo((props) => {
    //location
    let location = useLocation();
  return (
    <Fragment>
      {props.isTag === 'true' &&
        <li className={`${location.pathname === `${props.pathname}` ? 'active' : ''} nav-item `}>
          <Link className={`${location.pathname === `${props.pathname}` ? 'active' : ''} nav-link `} aria-current="page" to={props.pathname}>
              <OverlayTrigger placement="right" overlay={<Tooltip>{props.title}</Tooltip>}>
                {props.children}
              </OverlayTrigger>
              <span className="item-name">{props.title}</span>
          </Link>
      </li>
      }
      {
        props.isTag === 'false' &&
        <Nav.Item as="li">
          <Link className={`${location.pathname === `${props.pathname}` ? 'active' : ''} nav-link`} to={props.pathname} onClick={props.modalopen} target={props.target}>
              { props.staticIcon === 'true' &&
                <i className="icon">
                  <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                          <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                  </svg>
                </i>
              }
              {props.children}
              <OverlayTrigger placement="right" overlay={<Tooltip>{props.title}</Tooltip>}>
                  <i className="sidenav-mini-icon" > {props.minititle} </i>
              </OverlayTrigger>
              <span className="item-name"> {props.title} </span>
          </Link>
        </Nav.Item>
      }
    </Fragment>
  )
})

SidebarMenu.displayName = "SidebarMenu"
export default SidebarMenu       