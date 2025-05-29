import React from 'react';
import "./Payout.css"
import { Progress } from 'antd';

const PayoutCard = ({userData, isLoading}) => {


    return (
        <div style={{ backgroundColor: " #fafafa" }} className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md payout-main">
            <p className="text-sm text-gray-500 mb-1">ESTIMATED PAYOUT VALUE</p>
            <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                ${userData?.payout_amount}.00
            </h2>
            <Progress percent={82} size="small" />
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                    className="h-full bg-green-500"

                ></div>
            </div >


            <div className='text-progress'>
                <span style={{ fontSize: "12px" }}>82% Payout Progress</span>
            </div>

        </div>
    );
};

export default PayoutCard;
