import React from 'react'

function Input(props) {
    const { label, error, onChange, id, type } = props
    //console.log('error', error)
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input
                className={`form-control ${error && 'is-invalid'}`}
                id={id}
                type={type}
                onChange={onChange} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}
export default Input
