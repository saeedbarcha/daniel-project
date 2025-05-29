import React from 'react'
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import FooterLast from '../Components/client/FooterLast';

const DashboardLayout = ({ children }) => {
    return (
        <>
            <div className="main-layout-container">
                <div>
                    <Header />
                </div>

                {children}

                <hr />
                <div>
                    <Footer />
                </div>

            </div>
            <FooterLast />
        </>

    )
}

export default DashboardLayout;