import React from 'react'
import "./TransactionSubCard.css"
import { FaCalendarAlt } from "react-icons/fa";
import { RiInformation2Fill } from "react-icons/ri";

const TransactionSubCards = ({ date, value }) => {

    return (

        <div className='transaction-hero'>
            <div>
                <p > <FaCalendarAlt style={{ color: "blue" }} />{date}</p>
                <p style={{ fontSize: "12px" }}>{value}</p>
            </div>
            <div>
                <RiInformation2Fill />
            </div>
        </div>
    )
}

export default TransactionSubCards;