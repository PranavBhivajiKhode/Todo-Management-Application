import { useState } from 'react'
import {PropTypes} from "prop-types";

export default function CounterButton({by , incrementmethod , decrementMethod}){
    return(
        <div className="Counter">
            <div>
                <button className="counterButton" onClick={() => incrementmethod(by)}>+{by}</button>
                <button className="counterButton" onClick={() => decrementMethod(by)}>-{by}</button>
                
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
};
CounterButton.defaultProps = {
    by: 10
};