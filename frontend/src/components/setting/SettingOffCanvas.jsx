import { useState, memo, Fragment } from "react";

// react-router
import {Link} from 'react-router-dom'

//react-bootstrap
import { Offcanvas, Row, Col,CloseButton } from "react-bootstrap";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import { reset_state } from "../../store/setting/action";
import { useSelector,useDispatch } from "react-redux";
// Section Components
// Style Setting Section Components

import Direction from "./sections/direction";
const SettingOffCanvas = memo(() => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const resetTheme = (e) => {
    // dispatch(reset_state())
    const confirm = window.confirm(
      "Are you sure you want to reset your settings?"
    );
    if (confirm) {
      dispatch(reset_state());
    }
  };

  // Define selectors
  const themeSchemeDirection = useSelector(
    SettingSelector.theme_scheme_direction
  );
  return (
    <Fragment>
      <div className="rtl-box">
        <span className="btn btn-icon btn-setting bg-primary" id="settingbutton" role="button" onClick={(e) => { e.stopPropagation(); setShow(true); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.875em" height="1.875em" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd" />
          </svg>
        </span>
        <div className={`offcanvas ${themeSchemeDirection === "rtl" ? "offcanvas-start" : "offcanvas-end"}  live-customizer end ${show ? "show" : "" }`}>
          <Offcanvas.Header className="gap-3 pb-2">
              <Offcanvas.Title>Language Mode</Offcanvas.Title>
              <div className="d-flex gap-1 align-items-center">
                  <button className="btn btn-icon text-primary border-0" data-reset="settings" onClick={resetTheme}>
                      <span className="btn-inner">
                          <i className="fas fa-sync-alt"></i>
                      </span>
                  </button>
                  <CloseButton className="btn-icon btn-close px-0 shadow-none" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                  </CloseButton>
              </div>
          </Offcanvas.Header>
          <Offcanvas.Body className="pt-0 modes">
            <Row>
              <Col lg={12}>
                <div>
                  <div>
                    <Direction
                      themeSchemeDirection={themeSchemeDirection}
                    ></Direction>
                  </div>
                </div>
              </Col>
            </Row>
          </Offcanvas.Body>
        </div>
      </div>
    </Fragment>
  );
});

SettingOffCanvas.displayName = "SettingOffCanvas";
export default SettingOffCanvas;
