import React from 'react';
import '../CSS/Form.css';

function Form(props) {
  return (props.trigger) ? (
    <div className='form'>
        <div className='in_form'>
            <button className='close' onClick={() => props.setTrigger(false)}>close</button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Form