import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// widget
import Logo from '../widgets/Logo';
import SocialMedia from '../widgets/SocialMedia';

// Images
import blog1 from '/assets/images/gallery/blog-1.jpg'
import blog2 from '/assets/images/gallery/blog-2.jpg'
import blog3 from '/assets/images/gallery/blog-3.jpg'
import blog4 from '/assets/images/gallery/blog-4.jpg'
import blog5 from '/assets/images/gallery/blog-5.jpg'
import blog6 from '/assets/images/gallery/blog-6.jpg'

// library
import FsLightbox from "fslightbox-react";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import { reset_state } from "../../store/setting/action";
import { useSelector,useDispatch } from "react-redux";

export default function Sidebar({ logoDynamic, show, handleClose, targetId, ...props }) {
  const [toggler, setToggler] = useState(false);
  const [toggler1, setToggler1] = useState(false);
  const [toggler2, setToggler2] = useState(false);
  const [toggler3, setToggler3] = useState(false);
  const [toggler4, setToggler4] = useState(false);
  const [toggler5, setToggler5] = useState(false);

  const currentYear = new Date().getFullYear();

    // Define selectors
    const themeSchemeDirection = useSelector(
      SettingSelector.theme_scheme_direction
    );

  return (
    <Offcanvas placement={`${themeSchemeDirection === "rtl" ? "start" : "end"}`} show={show && targetId === 'right-panel-toggle'} onHide={handleClose} target={`#${targetId}`} {...props}>
      <Offcanvas.Header closeButton className="border-bottom px-5 mb-5 py-4">
        <Logo logoDynamic={true} logoImage={logoDynamic} />
      </Offcanvas.Header>
      <Offcanvas.Body className="px-5 d-flex flex-column justify-content-between">
        <div className="mb-5 pb-5 border-bottom">
          <h4 className="mb-3">Gallery:</h4>
          <Row className="row-cols-xl-3 row-cols-md-2 row-cols-2 gx-3 gy-3">
            <div className="col">
              <span data-fslightbox="gallery" type="button" className="h-100 d-inline-block" onClick={() => setToggler(!toggler)}>
                <img src={blog1} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                <FsLightbox
                  toggler={toggler}
                  sources={[blog1]}
                />
              </span>
            </div>
            <div className="col">
              <span data-fslightbox="gallery" type="button" className="h-100 d-inline-block" onClick={() => setToggler1(!toggler1)}>
                <img src={blog2} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                <FsLightbox
                  toggler={toggler1}
                  sources={[blog2]}
                />
              </span>
            </div>
            <div className="col">
              <span data-fslightbox="gallery" type="button" className="h-100 d-inline-block" onClick={() => setToggler2(!toggler2)}>
                <img src={blog3} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                <FsLightbox
                  toggler={toggler2}
                  sources={[blog3]}
                />
              </span>
            </div>
            <div className="col">
              <span data-fslightbox="gallery" type="button" className="h-100 d-inline-block" onClick={() => setToggler3(!toggler3)}>
                <img src={blog4} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                <FsLightbox
                  toggler={toggler3}
                  sources={[blog4]}
                />
              </span>
            </div>
            <div className="col">
              <span data-fslightbox="gallery" type="button" className="h-100 d-inline-block" onClick={() => setToggler4(!toggler4)}>
                <img src={blog5} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                <FsLightbox
                  toggler={toggler4}
                  sources={[blog5]}
                />
              </span>
            </div>
            <div className="col">
              <span data-fslightbox="gallery" type="button" className="h-100 d-inline-block" onClick={() => setToggler5(!toggler5)}>
                <img src={blog6} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                <FsLightbox
                  toggler={toggler5}
                  sources={[blog6]}
                />
              </span>
            </div>
          </Row>
        </div>
        <div className="mb-5 pb-5 border-bottom">
          <h4 className="mb-3">Contact Us:</h4>
          <p>4517, Washington Ave, Manchester, Kentucky, England 524163.</p>
          <p>kivicare@example.com</p>
          <p>Phone : (480) 555-0103</p>
        </div>
        <div className="mb-5">
          <h4 className="mb-3">Follow Us:</h4>
          <SocialMedia isLabelHide={true} />
        </div>
        <p className="pt-3 mb-0 border-top">© {currentYear} KiviCare, All Rights Reserved.</p>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
