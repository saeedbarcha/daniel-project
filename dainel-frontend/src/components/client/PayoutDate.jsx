import React from 'react'
import "./PayoutDate.css"
import { FaCalendarAlt } from "react-icons/fa";

const PayoutDate = ({userData, isLoading, formatDate}) => {
    return (
        <div className='payout-date-main'>
            <div>
                <p>YOUR PAYOUT DATE</p>
                <h3 style={{ fontSize: "20px" }}>{formatDate(userData?.payout_date)}</h3>
            </div>
            <div className='calender-icon'>
                <FaCalendarAlt />
            </div>
        </div>
    )
}

export default PayoutDate;