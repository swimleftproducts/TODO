import React from 'react'

export default function ProgressBar(props) {
    const {completeSteps, numberSteps} = props
    const complete= Math.round((completeSteps/numberSteps)*100)
    const done = complete
    const percentDone = {
            "width":`${done}%`
    }
    return (
        <div className="m-0 p-0 todo-progressbar">
             <div className="todo-progress__bar"
                style={percentDone}
             ></div>
        </div>
    )
}
