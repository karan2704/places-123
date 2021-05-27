import React from 'react'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './modal.css'

function Modal(props) {

    const str = props.show ? 'visible' : 'invisible'
    return (
        <div className={str}>
            <h3>{props.children}</h3>
            <button className='green'><CheckIcon /></button>
            <button className='red'><CloseIcon /></button>
        </div>
    )
}

export default Modal
