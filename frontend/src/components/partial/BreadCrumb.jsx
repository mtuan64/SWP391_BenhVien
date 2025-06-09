import React,{memo} from 'react'
import { Link } from 'react-router-dom';

const BreadCrumb = memo((props) => {
    return(
        <div className="iq-breadcrumb bg-primary-subtle">
            <div className="container">
                <nav aria-label="breadcrumb" className="text-center">
                    <h2 className="title">{props.title}</h2>
                    <ol className="breadcrumb justify-content-center mt-2 mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active">
                            {props.title}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    )
})

export default BreadCrumb;