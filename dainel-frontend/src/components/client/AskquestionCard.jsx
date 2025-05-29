import React, { useState } from 'react'
import { FaCircleQuestion } from "react-icons/fa6"
import { FaAngleRight } from "react-icons/fa6";
import "./Askquestion.css"
import IconText from './Common/IconText';
import { IoIosArrowDown } from "react-icons/io";

const AskquestionCard = () => {

    const [activeQuestion, setActiveQuestion] = useState(null);

    const handleToggle = (index) => {
        setActiveQuestion(prevIndex => (prevIndex === index ? null : index));
    };

    return (

        <div className='askquestion-main' >

            <IconText
                icon={<FaCircleQuestion />}
                text={"Frequently Asked Questions"}
            />

            <div className='askquestion-container'>

                < div className='askquestion-content' onClick={() => handleToggle(1)}>
                    <p style={{
                        display: "flex", alignItems: "center", fontSize: "12px", gap: "5px",
                        padding: "4px", cursor: "pointer"
                    }}>

                        {activeQuestion === 1 ? <IoIosArrowDown style={{ fontSize: "12px" }} /> : <FaAngleRight style={{ fontSize: "12px" }} />}
                        What is the payout process?
                    </p>

                </div>
                <div className={`read-more-content ${activeQuestion === 1 ? 'open' : ''}`}>
                    <p style={{ padding: "1rem", fontSize: "12px" }}>Your funds will be disbursed in
                        full on the specified payout date displayed above.
                        All transactions are processed through our secure D.O.G.E. payment gateway.</p>
                </div>


                <div className='askquestion-content' onClick={() => handleToggle(2)}>
                    <p style={{
                        display: "flex", alignItems: "center", fontSize: "12px", gap: "5px",
                        padding: "4px", cursor: "pointer"
                    }}>

                        {activeQuestion === 2 ? <IoIosArrowDown style={{ fontSize: "12px" }} /> : <FaAngleRight style={{ fontSize: "12px" }} />}
                        How do I verify my account?
                    </p>

                </div>
                <div className={`read-more-content-answer ${activeQuestion === 2 ? 'openanswer' : ''}`}>
                    <p style={{ padding: "1rem", fontSize: "12px" }}>Your current verification status
                        and payout progress are displayed in your Account Details.
                        Ensure your account remains verified for seamless transaction processing.</p>
                </div>


                <div className='askquestion-content' onClick={() => handleToggle(3)}>
                    <p style={{
                        display: "flex", alignItems: "center", fontSize: "12px", gap: "5px",
                        padding: "4px", cursor: "pointer"
                    }}>
                        {activeQuestion === 3 ? <IoIosArrowDown style={{ fontSize: "12px" }} /> : <FaAngleRight style={{ fontSize: "12px" }} />}
                        What happens if my transaction fails?
                    </p>

                </div>
                <div className={`read-more-content ${activeQuestion === 3 ? 'open' : ''}`}>
                    <p style={{ padding: "1rem", fontSize: "12px" }}>While our D.O.G.E. system
                        ensures reliable transactions,
                        should you need assistance, your dedicated agent is
                        available through the contact button above for immediate support.</p>
                </div>



                <div className='askquestion-content' onClick={() => handleToggle(4)}>
                    <p style={{
                        display: "flex", alignItems: "center", fontSize: "12px", gap: "5px",
                        padding: "4px", cursor: "pointer"
                    }}>

                        {activeQuestion === 4 ? <IoIosArrowDown style={{ fontSize: "12px" }} />
                            : <FaAngleRight style={{ fontSize: "12px" }} />}
                        How can I contact support?

                    </p>

                </div>
                <div className={`read-more-content ${activeQuestion === 4 ? 'open' : ''}`}>
                    <p style={{ padding: "1rem", fontSize: "12px" }}>If you need assistance you can
                        always contact your dedicated agent through
                        the contact button above.</p>
                </div>

            </div>
        </div>
    );
};

export default AskquestionCard;
