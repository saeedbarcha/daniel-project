import React, { useState } from 'react';
import { IoInformationCircle } from "react-icons/io5";
import { DownOutlined } from '@ant-design/icons';
import "./Readmore.css";
import IconText from './Common/IconText';

const ReadMore = () => {
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);
    };

    return (
        <div className="read-more-container">
            <div>

                <IconText
                    icon={<IoInformationCircle />}
                    text={"Read More About D.O.G.E Payouts"}
                />


            </div>

            <div onClick={handleClick} className="read-more-hero">
                <p
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: "5px", fontSize: "12px", padding: "10px",
                    }}
                >
                    <DownOutlined style={{ fontSize: "10px" }} /> Read More
                </p>
            </div>

            <div className={`read-more-content ${toggle ? 'open' : ''}`}>
                <p style={{ fontSize: "12px", marginTop: "10px", textAlign: 'justify' }}>
                    The Department of Government Efficiency (D.O.G.E.) has taken a major step forward—setting up a new payout system for all frozen assets! After years of delays and government interference, the truth is finally coming to light. Corrupt officials who blocked payments to hardworking Americans are being exposed, and the funds that were wrongfully withheld are now being released.
                </p>
                <h6 style={{ fontSize: "14px" }}>Billions Reclaimed, Wasteful Spending Eliminated.</h6>
                <p style={{ fontSize: "12px", textAlign: 'justify' }}>
                    For too long, taxpayer dollars vanished into bureaucratic black holes. But now, D.O.G.E. is making sure every dollar is accounted for. Wasteful programs that served no real purpose? Gone. Mismanaged funds? Redirected to where they truly belong.
                </p>
                <h6 style={{ fontSize: "14px" }}>Thousands Already Receiving Their Payments</h6>
                <p style={{ fontSize: "12px", textAlign: 'justify' }}>
                    Across the country, people are seeing the impact. Payouts are being processed as we speak, and more are on the way! This is just the beginning—D.O.G.E. is working around the clock to ensure every last frozen dollar reaches its rightful owner.
                </p>
                <h6 style={{ fontSize: "14px" }}>What’s Next?</h6>
                <p style={{ fontSize: "12px", textAlign: 'justify' }}>
                    If you’re still waiting on your payout, keep an eye on your dashboard—your turn could be next! Stay updated as this story develops.
                </p>
            </div>
        </div>
    );
};

export default ReadMore;
