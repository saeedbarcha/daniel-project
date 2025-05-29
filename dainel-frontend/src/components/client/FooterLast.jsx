import React, { useEffect, useState } from 'react'
import { MdChangeCircle } from "react-icons/md";
import "./FooterLast.css"

const FooterLast = () => {

    const [paraChange, setParaChange] = useState(false)

    const handleClickToggleButton = () => {

        setParaChange(prev => !prev)
    }

    useEffect(() => {

        const interval = setInterval(() => {
            setParaChange(prev => !prev)
        }, 3000);

        return () => clearInterval(interval);

    }, [])

    return (

        <div className='footer-last-container' >

            <p className='para-content' >
                {paraChange ? "Advanced Fraud Detection & Prevention" :
                    "Fraud Prevention & Blockchain Verification"

                }

                < MdChangeCircle style={{
                    color: "white",
                    fontSize: "30px", cursor: "pointer"
                }} onClick={handleClickToggleButton} />
            </p>


        </div>

    )
}

export default FooterLast; 