import React from 'react'



export default function TodoDetail(props) {
    return (
        <div className="nb-todo-card-detail-content  p-1 py-1 m-0
        ">
            <div className="row m-0 p-1 no-gutters" style={{"height":"2rem"}}>
                <div className="col-4 m-o " >
                    <p>type:</p>
                </div>
                <div className="col-8 ,m-0 " style={{"backgroundColor":"white","height":"100%"}}>
                    <p>{props.type}</p>
                </div>
                <div className="col-12 ,m-0 p-1" style={{"backgroundColor":"white","height":"145px"}}>
                    <p>{props.details}</p>
                </div>
            </div>
            
        </div>
    )
}
