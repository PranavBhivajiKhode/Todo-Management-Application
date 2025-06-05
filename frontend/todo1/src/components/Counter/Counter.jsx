import { useState } from 'react'
import CounterButton from './CounterButton';
import ResetButton from './ResetButton';
import './Counter.css'

export default function Counter(){

    const [count , setCount] = useState(0);

    function incrementCounterParentFunction(by){
        setCount(count + by);
    }

    function decrementCounterParentFunction(by){
        setCount(count - by);
    }

    function resetCounter(){
        setCount(0);
    }

    return(
        <>
            <span className="totalCount">{count}</span>
            <CounterButton  by={1} 
                            incrementmethod={incrementCounterParentFunction} 
                            decrementMethod={decrementCounterParentFunction}/>
            <CounterButton  by={2} 
                            incrementmethod={incrementCounterParentFunction} 
                            decrementMethod={decrementCounterParentFunction}/>
            <CounterButton  by={5} 
                            incrementmethod={incrementCounterParentFunction} 
                            decrementMethod={decrementCounterParentFunction}/>
            <ResetButton resetMethod={resetCounter}/>
        </>
    )
}

