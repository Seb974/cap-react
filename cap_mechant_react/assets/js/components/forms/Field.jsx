import React from 'react';

const Field = ({ name, label, value, onChange, placeholder = "", type = "text", error = "", required = false, id = "" }) => {
    return (
        <div className="form-group">
            <label htmlFor={ name }>{ label }</label>
            <input 
                type={ type } 
                value={ value } 
                onChange={ onChange } 
                className={"form-control" + (error && " is-invalid")} 
                placeholder={ placeholder || label }
                name={ name } 
                id={ id || name }
                required={ required }
            />
            { error && <p className="invalid-feedback">{ error }</p> }
        </div>
    );
}
 
export default Field;