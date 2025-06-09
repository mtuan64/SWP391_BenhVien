import React, { memo, Fragment, useState, useEffect } from 'react'

//react-bootstrap
import { Row, Col, Image } from 'react-bootstrap'

//components
import Card from '../../components/bootstrap/card'

//router
import { Link } from 'react-router-dom'

//progressbar
import Progress from '../../components/progress'

// img
import shap1 from '/assets/images/shapes/01.png'
import shap2 from '/assets/images/shapes/02.png'
import shap3 from '/assets/images/shapes/03.png'
import shap4 from '/assets/images/shapes/04.png'
import shap5 from '/assets/images/shapes/06.png'
import shap6 from '/assets/images/shapes/01.png'

const BootstrapTable = memo(() => {

   const [width, setWidth] = useState(0);
   const [width1, setWidth1] = useState(0);
   const [width2, setWidth2] = useState(0);
   const [width3, setWidth3] = useState(0);
   const [width4, setWidth4] = useState(0);
   const [width5, setWidth5] = useState(0);

   useEffect(() => {
      const interval = setTimeout(() => {
         setWidth(60);
         setWidth1(10);
         setWidth2(100);
         setWidth3(100);
         setWidth4(25);
         setWidth5(40);
      }, 2000);

      return () => clearTimeout(interval);
   }, []);


   return (
      <Fragment>
         <Row>
            <Col sm="12">
               <Card>
                  <Card.Header className="d-flex justify-content-between">
                     <div className="header-title">
                        <h4 className="card-title">Bootstrap Table</h4>
                     </div>
                  </Card.Header>
                  <Card.Body className="p-0">
                     <div className="table-responsive mt-4">
                        <table id="basic-table" className="table table-striped mb-0" role="grid">
                           <thead>
                              <tr>
                                 <th>Companies</th>
                                 <th>Members</th>
                                 <th>Budget</th>
                                 <th>Status</th>
                                 <th>Completion</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <Image className="rounded img-fluid avatar-40 me-3 bg-primary-subtle"
                                          src={shap1} alt="profile" loading="lazy" />
                                       <h6>Soft UI XD Version</h6>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="iq-media-group iq-media-group-1">
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">MM</div>
                                       </Link>
                                    </div>
                                 </td>
                                 <td>$14000</td>
                                 <td><div className="text-info">Pending</div></td>
                                 <td>
                                    <div className="d-flex align-items-center mb-2">
                                       <h6>60%</h6>
                                    </div>
                                    <div className="progress bg-info-subtle w-100" style={{ height: "6px" }}>
                                       <div
                                          className={`progress-bar bg-info shadow-none`}
                                          role="progressbar"
                                          style={{
                                             width: `${width}%`,
                                             transition: "width 0.2s ease",
                                          }}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    {/* <Progress softcolors="info" color="info" className="shadow-none w-100" defaultValue={60} minvalue={0} maxvalue={100} style={{ height: "6px" }} /> */}
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <img className="rounded img-fluid avatar-40 me-3 bg-primary-subtle"
                                          src={shap2} alt="profile" loading="lazy" />
                                       <h6>Add Progress Track</h6>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="iq-media-group iq-media-group-1">
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                       </Link>
                                    </div>
                                 </td>
                                 <td>$3000</td>
                                 <td><div className="text-danger">Pending</div></td>
                                 <td>
                                    <div className="d-flex align-items-center mb-2">
                                       <h6>10%</h6>
                                    </div>
                                    <div className="progress bg-danger-subtle w-100" style={{ height: "6px" }}>
                                       <div
                                          className={`progress-bar bg-danger shadow-none`}
                                          role="progressbar"
                                          style={{
                                             width: `${width1}%`,
                                             transition: "width 0.2s ease",
                                          }}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    {/* <Progress softcolors="danger" color="danger" className="shadow-none w-100" value={10} minvalue={0} maxvalue={100} style={{ height: "6px" }} /> */}
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <img className="rounded img-fluid avatar-40 me-3 bg-primary-subtle"
                                          src={shap3} alt="profile" loading="lazy" />
                                       <h6>Fix Platform Errors</h6>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="iq-media-group iq-media-group-1">
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                       </Link>
                                    </div>
                                 </td>
                                 <td>Not set</td>
                                 <td><div className="text-success">Completed</div></td>
                                 <td>
                                    <div className="d-flex align-items-center mb-2">
                                       <h6>100%</h6>
                                    </div>
                                    <div className="progress bg-success-subtle w-100" style={{ height: "6px" }}>
                                       <div
                                          className={`progress-bar bg-success shadow-none`}
                                          role="progressbar"
                                          style={{
                                             width: `${width2}%`,
                                             transition: "width 0.2s ease",
                                          }}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    {/* <Progress softcolors="success" color="success" className="shadow-none w-100" value={100} minvalue={0} maxvalue={100} style={{ height: "6px" }} /> */}
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <img className="rounded img-fluid avatar-40 me-3 bg-primary-subtle"
                                          src={shap4} alt="profile" loading="lazy" />
                                       <h6>Launch Our Mobile App</h6>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="iq-media-group iq-media-group-1">
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">AP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">DP</div>
                                       </Link>
                                    </div>
                                 </td>
                                 <td>$20500</td>
                                 <td><div className="text-success">Completed</div></td>
                                 <td>
                                    <div className="d-flex align-items-center mb-2">
                                       <h6>100%</h6>
                                    </div>
                                    <div className="progress bg-success-subtle w-100" style={{ height: "6px" }}>
                                       <div
                                          className={`progress-bar bg-success shadow-none`}
                                          role="progressbar"
                                          style={{
                                             width: `${width3}%`,
                                             transition: "width 0.2s ease",
                                          }}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    {/* <Progress softcolors="success" color="success" className="shadow-none w-100" value={100} minvalue={0} maxvalue={100} style={{ height: "6px" }} /> */}
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <img className="rounded img-fluid avatar-40 me-3 bg-primary-subtle"
                                          src={shap5} alt="profile" loading="lazy" />
                                       <h6>Add the New Pricing Page</h6>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="iq-media-group iq-media-group-1">
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                       </Link>
                                    </div>
                                 </td>
                                 <td>$500</td>
                                 <td><div className="text-primary">On Schedule</div></td>
                                 <td>
                                    <div className="d-flex align-items-center mb-2">
                                       <h6>25%</h6>
                                    </div>
                                    <div className="progress bg-primary-subtle w-100" style={{ height: "6px" }}>
                                       <div
                                          className={`progress-bar bg-primary shadow-none`}
                                          role="progressbar"
                                          style={{
                                             width: `${width4}%`,
                                             transition: "width 0.2s ease",
                                          }}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    {/* <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={25} minvalue={0} maxvalue={100} style={{ height: "6px" }} /> */}
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <img className="rounded img-fluid avatar-40 me-3 bg-primary-subtle"
                                          src={shap6} alt="profile" loading="lazy" />
                                       <h6>Redesign New Online Shop</h6>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="iq-media-group iq-media-group-1">
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                       </Link>{" "}
                                       <Link to="#" className="iq-media-1">
                                          <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                       </Link>
                                    </div>
                                 </td>
                                 <td>$2000</td>
                                 <td><div className="text-warning">Completed</div></td>
                                 <td>
                                    <div className="d-flex align-items-center mb-2">
                                       <h6>40%</h6>
                                    </div>
                                    <div className="progress bg-warning-subtle w-100" style={{ height: "6px" }}>
                                       <div
                                          className={`progress-bar bg-warning shadow-none`}
                                          role="progressbar"
                                          style={{
                                             width: `${width5}%`,
                                             transition: "width 0.2s ease",
                                          }}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                       ></div>
                                    </div>
                                    {/* <Progress softcolors="warning" color="warning" className="shadow-none w-100" defaultValue={40} minvalue={0} maxvalue={100} style={{ height: "6px" }} /> */}
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Fragment>
   )
}
)

BootstrapTable.displayName = "BootstrapTable"
export default BootstrapTable
