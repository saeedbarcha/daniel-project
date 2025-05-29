import React from 'react'
import "./IconText.css"

const IconText = ({ icon, text, className }) => {

    return (

        <p className={`icon-paragraph ${className || ''}`}>
            {icon}
            {text}
        </p>

    )
}

export default IconText;