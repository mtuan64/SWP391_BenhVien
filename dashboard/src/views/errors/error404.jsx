import React from 'react'
import { Fragment } from 'react'

//react-bootstrap
import {Image} from 'react-bootstrap'

//router
import {Link} from 'react-router-dom'

// img
import e404 from '/assets/images/error/404.png'
import errorBg5 from '/assets/images/error/error-bg-5.png'
import errorBg2 from '/assets/images/error/error-bg-2.png'
import errorBg3 from '/assets/images/error/error-bg-3.png'
import errorBg6 from '/assets/images/error/error-bg-6.png'

const Error404 = () => {
    return (
        <Fragment>
            <div className="bg-primary-subtle vh-100 position-relative overflow-x-hidden">
                <div className="container text-center">
                    <div className="row flex-column justify-content-center align-items-center vh-100">
                        <div>
                            <Image src={e404} className="img-fluid mb-4" alt="400" loading="lazy"/> 
                            <p className="mt-5 text-center text-body">The Page You Requested Could Not Be Found Please Go <br />Back To Homepage</p>
                            <Link to="/" className="mt-3 btn bg-primary text-white text-center">Back to Home</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src={errorBg5} className="position-absolute top-0 start-0" alt="image" /> 
                    <Image src={errorBg2} className="position-absolute error-bg-one" alt="image" /> 
                    <Image src={errorBg3} className="position-absolute error-bg-two" alt="image" /> 
                    <Image src={errorBg6} className="position-absolute  bottom-0 end-0" alt="image" /> 
                </div>
            </div>
        </Fragment>
    )
}

export default Error404
