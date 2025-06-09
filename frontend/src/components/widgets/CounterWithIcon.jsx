import React, {useEffect} from 'react'
import CountUp from 'react-countup';

export default function CounterWithIcon(props) {

  useEffect(() => {
    if (typeof window.counterUp !== 'undefined') {
      const counterUp = window.counterUp.default;
      const counterUpElements = document.querySelectorAll('.counter');
      Array.from(counterUpElements).forEach((el) => {
        if (typeof window.Waypoint !== 'undefined') {
          const waypoint = new window.Waypoint({
            element: el,
            handler: function () {
              counterUp(el, {
                duration: 1000,
                delay: 10,
              });
              this.destroy();
            },
            offset: 'bottom-in-view',
          });
        }
      });
    }
  }, []);

  return (
    <div className={`iq-counter iq-counter-icon d-flex align-items-center gap-3 gap-md-5 ${props.customClass}`}>
      <div className="iq-counter-icon">
          {props.counterIcon}
      </div>
      <div className="counter-content">
          <h3 className={`counter m-0 ${props.counterTextColor}`}>
            <CountUp enableScrollSpy={true} end={props.counterValue} separator='' />+
          </h3>
          <p className="counter-text m-0">{props.counterText}</p>
      </div>
    </div>
  )
}
