import React from 'react'
import { BiSolidError } from "react-icons/bi";
import "./TransactionCard.css"
import TransactionSubCards from './Common/TransactionSubCards';
import IconText from './Common/IconText';

const TransactionsCard = () => {
    return (
        <div className='transaction-container'>

            <IconText
                icon={<BiSolidError />}
                text={"Failed Transactions"}
            />


            <p >Failed TRB transactions prior to D.O.G.E. takeover</p>

            <TransactionSubCards
                date={"2023-10-01"}
                value={"$65.00"} />

            <TransactionSubCards
                date={"2024-10-01"}
                value={"$465.00"} />
            <TransactionSubCards
                date={"2025-10-01"}
                value={"$765.00"} />


        </div>
    )
}

export default TransactionsCard;