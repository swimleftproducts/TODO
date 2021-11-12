import React from 'react'

export default function TextError(props) {
    return (
        <div className="error-text col-7 text-end p-0 d-inline">
            {props.children}
        </div>
    )
}
