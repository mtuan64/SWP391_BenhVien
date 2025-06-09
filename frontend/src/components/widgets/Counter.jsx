import React, {useEffect} from 'react'
import CountUp from 'react-countup';

export default function Counter(props) {
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
    <div className="iq-counter iq-counter-no-icon bg-primary-subtle p-3">
      <div className="counter-content">
          <h3 className="counter mt-0 mb-3 text-primary fw-500">
          <CountUp enableScrollSpy={true} end={props.counterValue} separator=''/>+
          </h3>          
          <h4 className="counter-title mb-2 fw-normal">{props.counterTitle}</h4>
          <p className="counter-text m-0 text-body">{props.counterText}</p>
      </div>
    </div>
  )
}
