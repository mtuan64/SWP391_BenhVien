import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';

// image
import loader from '/assets/images/loader.gif'

export default function Loader() {

    useEffect(() => {
        const loader = document.querySelector('.loader');
        if (loader !== null) {
            loader.classList.add('animate__animated', 'animate__fadeOut')
            setTimeout(() => {
                loader.classList.add('d-none')
            }, 200)
        }
    }, []);
    
    return (
        <div className="loader simple-loader">
            <div className="loader-body">
                <Image src={loader} width={200} className="light-loader img-fluid" alt='loader' />
            </div>
        </div>
    )
}
