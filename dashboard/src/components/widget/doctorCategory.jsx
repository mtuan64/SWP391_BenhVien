import { Fragment, memo } from "react";


const DoctorCategory = memo ((props) => {
    return (
        <Fragment>
            <div className="bg-light-subtle p-4 d-flex justify-content-between mb-5 flex-column flex-md-row gap-2 align-items-md-center rounded">
                <div className="d-flex align-items-start align-items-md-center gap-3 flex-column flex-md-row">
                    <img
                        src={props.image}
                        alt="Dr-profile"
                        className="img-fluid avatar avatar-80"
                    />
                    <div>
                        <h5 className="mb-1 text-capitalize">{props.CategoryName}</h5>
                        <span className="text-body"> {props.AppointmentStatus}</span>
                    </div>
                </div>
                <span className="text-primary fw-500 text-capitalize">{props.DoctorCount}</span>
            </div>
        </Fragment>
    )
})

DoctorCategory.displayName = "DoctorCategory"
export default DoctorCategory
