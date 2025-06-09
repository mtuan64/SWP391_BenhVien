import React, { memo, Fragment } from 'react'

import RadioBtn from '../elements/radio-btn'

const CardStyle = memo((props) => {
   return (
      <Fragment>
         <div className="mb-4">
            <div class="mt-4 mb-3">
               <h6 class="d-inline-block mb-0 me-2">Card Style</h6>
            </div>
            <div className="d-grid gap-3 grid-cols-2 mb-3">
               <RadioBtn btnName="card_style" id="card_default" labelclassName="d-block" defaultChecked={props.cardStyle} value="card-default" >
                  Default Style
               </RadioBtn>
               <RadioBtn btnName="card_style" id="card_glass" labelclassName="d-block" defaultChecked={props.cardStyle} value="card-glass" >
                  Glass Effect
               </RadioBtn>
            </div>
            <RadioBtn btnName="card_style" id="card_transperant" labelclassName="d-block" defaultChecked={props.cardStyle} value="card-transparent" >
               Transparent Style
            </RadioBtn>
         </div>
      </Fragment>
   )
})

CardStyle.displayName = "CardStyle"
export default CardStyle