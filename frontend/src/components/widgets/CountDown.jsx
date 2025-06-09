import React, { useEffect } from 'react';

export default function CountDown(props) {
   
    useEffect(() => {
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
            const clock = document.querySelector(elem)
            const daysSpan = clock.querySelector('[data-days]')
            const hoursSpan = clock.querySelector('[data-hours]')
            const minutesSpan = clock.querySelector('[data-minutes]')
            const secondsSpan = clock.querySelector('[data-seconds]')

            function updateClock() {
                const t = getTimeRemaining(endtime)

                daysSpan.innerHTML = t.days
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2)
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2)
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2)

                if (t.total <= 0) {
                    clearInterval(timeinterval)
                }
            }

            updateClock()
            const timeinterval = setInterval(updateClock, 1000)
        }

        let time = document.querySelector('.countdown').getAttribute('data-date')
        if (time == undefined) {
            time = Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000
        }

        const dateString = time;
        const [day, month, year] = dateString.split('-');
        const formattedDateString = `${month}-${day}-${year}`;

        const deadline = new Date(formattedDateString);
        initializeClock('.countdown', deadline)
    }, []);  

  return (
    <ul className="countdown d-flex align-items-center list-inline count-down" data-date={props.timeDuration}>
        <li className="position-relative d-inline-lock">
            <span data-days className="numberDisplay">0</span>
            <span className="text-center text-body text-uppercase fw-semibold">Days</span>
        </li>
        <li className="position-relative d-inline-block">
            <span data-hours className="numberDisplay">0</span>
            <span className="text-center text-body text-uppercase fw-semibold">Hours</span>
        </li>
        <li className="position-relative d-inline-block">
            <span data-minutes className="numberDisplay">0</span>
            <span className="text-center text-body text-uppercase fw-semibold">Minutes</span>
        </li>
        <li className="position-relative d-inline-block">
            <span data-seconds className="numberDisplay">0</span>
            <span className="text-center text-body text-uppercase fw-semibold">Seconds</span>
        </li>
    </ul>
  )
}
