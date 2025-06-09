import { Fragment, memo } from "react";

// react-router-dom
import { Link } from "react-router-dom";

const DoctorInfo = memo ((props) => {
    return (
        <Fragment>
            <div className="bg-light-subtle p-4 d-flex justify-content-between mb-5 flex-column flex-md-row gap-1 rounded">
                <div className="d-flex align-items-start align-items-md-center gap-3 flex-column flex-md-row">
                    <img
                        src={props.image}
                        alt="Dr-profile"
                        className="img-fluid avatar avatar-80"
                    />
                    <div>
                        <h5 className="mb-1">{props.DoctorName}</h5>
                        <span className="text-body">{props.DoctorCategory}</span>
                        <h6 className="mb-0 pt-1"><span className="text-body fw-normal">Availability:</span> {props.WorkingTime}</h6>
                    </div>
                </div>
                <span className="text-primary fw-500 text-capitalize">{props.PatientList}</span>
            </div>
        </Fragment>
    )
})

DoctorInfo.displayName = "DoctorInfo"
export default DoctorInfo
