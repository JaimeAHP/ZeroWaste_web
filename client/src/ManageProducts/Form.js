import React from 'react';
import '../CSS/Form.css';

function Form(props) {
  return (props.trigger) ? (
    <div className='form'>
        <div className='in_form'>
            <button className='close' onClick={() => props.setTrigger(false)}>close</button>
            {/* <h2>PRODUCT INFORMATION</h2>
            <input class="input" placeholder="Name of Product"/>
            <input class="input" placeholder="Cost of Product"/>
            <textarea class="textarea" placeholder="Product Description..."></textarea> */}
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Form