import React,{useEffect,memo,Fragment,useState} from 'react'

//react-bootstrap
import {Image,InputGroup,FormControl} from 'react-bootstrap'

//router
import {Link} from 'react-router-dom'

// img
import error01 from '/assets/images/error/01.png'

const Maintenance = () => {
    const [formattedDate, setFormattedDate] = useState()
    const updateformattedDate = (() => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.getTime() + 167 * 24 * 60 * 60 * 1000);
  
    const formattedDate = futureDate.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  
    setFormattedDate(formattedDate);
    })

    useEffect(
        () =>{
          //count down plugin js
            function getTimeRemaining(endtime) {
                const total = Date.parse(endtime) - Date.parse(new Date());
                const seconds = Math.floor((total / 1000) % 60);
                const minutes = Math.floor((total / 1000 / 60) % 60);
                const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
                const days = Math.floor(total / (1000 * 60 * 60 * 24));
            
                return {
                total,
                days,
                hours,
                minutes,
                seconds
                };
            }
          
            function initializeClock(elem, endtime) {
                const clock =  document.querySelector(elem)
                const daysSpan = clock.querySelector('[data-days]')
                const hoursSpan = clock.querySelector('[data-hours]')
                const minutesSpan = clock.querySelector('[data-minutes]')
                const secondsSpan = clock.querySelector('[data-seconds]')
            
                function updateClock() {
                    const t = getTimeRemaining(endtime)
                    const timeinterval = setInterval(updateClock, 1000)
            
                    daysSpan.innerHTML = t.days
                    hoursSpan.innerHTML = ('0' + t.hours).slice(-2)
                    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2)
                    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2)
                    
                    if (t.total <= 0) {
                        clearInterval(timeinterval)
                    }
                }
            
                updateClock()
            }
            updateformattedDate()
            let time = document.querySelector('.countdown').getAttribute('data-date')
            if (time === undefined) {
                time = Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000
            }
            const deadline = new Date(time)
            initializeClock('.countdown', deadline)
            
            }
    )
    return (
        <Fragment>
            <div className="container-fluid p-0">
                <div className="iq-maintenance text-center">
                    <Image src={error01} className="img-fluid mb-4" alt=""/> 
                    <div className="maintenance-bottom text-white pb-0">
                        <div className="  bg-primary" style={{background: "transparent", height: "320px"}}>
                            <div className="bottom-text general-zindex">
                                <h1 className="mb-2 text-white">Hang on! We are under maintenance</h1>
                                <p>It will not take a long time till we get the error fiked. We wii live again in</p>
                                <ul className="countdown d-flex justify-content-center align-items-center list-inline" data-date={formattedDate}>
                                    <li>
                                        <span data-days>0</span>Days
                                    </li>
                                    <li>
                                        <span data-hours>0</span>Hours
                                    </li>
                                    <li>
                                        <span data-minutes>0</span>Minutes
                                    </li>
                                    <li>
                                        <span data-seconds>0</span>Seconds
                                    </li>
                                </ul>
                                <div className="w-50 mx-auto mt-2">
                                    <InputGroup className="search-input search-input">
                                        <FormControl type="text" className="form-control border-0 bg-white" placeholder="Enter your mail"/>
                                        <Link to="#" className="btn bg-light text-primary lh-lg border-0">Notify Me</Link>
                                    </InputGroup>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="sign-bg position-absolute start-0 top-0 d-none d-xl-block">
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path className="text-secondary"
                            d="M21.7 6.7499C21.7 5.0798 21.7 3.4097 21.7 1.7396C21.7 1.0769 21.2509 0.5 20.5882 0.5H9.78822C9.12552 0.5 8.50002 1.0769 8.50002 1.7396V8.9H1.63453C0.971826 8.9 0.400024 9.4427 0.400024 10.1054V20.9054C0.400024 21.5681 0.971826 22.1 1.63453 22.1C3.42313 22.0832 5.21172 22.0667 7.00002 22.0499C6.93732 21.1829 6.62923 15.6008 10.9627 11.1077C15.274 6.6374 20.8264 6.722 21.7 6.7499Z"
                            fill="currentColor"></path>
                            <path className="text-primary"
                            d="M28.5505 8.8999H21.7999H20.8003C14.1731 8.8999 8.80005 14.4217 8.80005 21.0493V29.4493C8.80005 30.112 9.33765 30.4999 10.0007 30.4999H20.6003C21.263 30.4999 21.7003 30.112 21.7003 29.4493V24.4999H28.5508C29.2135 24.4999 29.8003 24.112 29.8003 23.4493V10.2493C29.8 9.5863 29.2132 8.8999 28.5505 8.8999Z"
                            fill="currentColor"></path>
                            <path className="text-primary-dark" fillRule="evenodd" clipRule="evenodd"
                            d="M8.83665 22.0491C8.82797 22.0486 8.81968 22.0482 8.81177 22.0478C8.81177 22.0478 8.81933 22.0361 8.83412 22.0136C8.7745 21.1484 8.5664 16.0579 12.591 12.2322C16.0804 8.91496 20.3292 8.85159 21.5037 8.8915C21.5613 8.8872 21.6181 8.8851 21.6743 8.88526C21.6746 8.88961 21.6749 8.89413 21.6753 8.89882C21.6839 8.89927 21.6922 8.8997 21.7002 8.90012C21.7002 8.90012 21.6926 8.91175 21.6778 8.9343C21.7374 9.79948 21.9455 14.89 17.921 18.7157C14.4317 22.0328 10.183 22.0963 9.00833 22.0564C8.95072 22.0607 8.89382 22.0628 8.83766 22.0626C8.83733 22.0583 8.83699 22.0538 8.83665 22.0491Z"
                            fill="currentColor"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </Fragment>
    )
}

export default Maintenance
