import React from 'react';

const renderField = ({
    input,
    label,
    type,
    classInput,
    meta: { touched, error, warning }
  }) => (          
        <div>
            <input {...input} placeholder={label} type={type} className={classInput} autoComplete = "off" />
            {touched &&
            ((error && <span style = {{color: 'red', fontWeight: "bold"}}>{error}</span>) ||
                (warning && <span style = {{color: 'red', fontWeight: "bold"}} >{warning}</span>))}
        </div>        
    )

  export default renderField;