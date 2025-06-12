import React from "react";
import Layout from "../../layouts/layout";
import PayoutDate from "../../Components/client/PayoutDate";
import PayoutCard from "../../Components/client/PayoutCard";
import AssetsCard from "../../Components/client/AssetsCard";
import TransactionsCard from "../../Components/client/TrasactionsCard";
import AccountDetailsCard from "../../Components/client/AccountDetailsCard";
import ReadMore from "../../Components/client/ReadMore";
import AskquestionCard from "../../Components/client/AskquestionCard";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../features/usersApiSlice";

const Client = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const { userInfo } = useSelector((state) => state.auth);

  // Use profileData if available, otherwise fall back to userInfo
  const userData = profileData || userInfo?.user || userInfo || {};

  // Format date to "Month Day, Year" format (e.g., "May 21, 2025")
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";
    
    // Format to "May 21, 2025"
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  return (
<div className="client-dashboard-bg">
    <Layout>
      
      <div className="hero-section">
        <div className="layout-left">
          <PayoutCard userData={userData} isLoading={isLoading}  formatDate={formatDate}/>
          <PayoutDate userData={userData} isLoading={isLoading}   formatDate={formatDate}/>
          <AssetsCard userData={userData} isLoading={isLoading} />
          <TransactionsCard userData={userData} isLoading={isLoading} />
        </div>
        <div className="layout-right">
          <AccountDetailsCard
            userData={userData}
            isLoading={isLoading}
            formatDate={formatDate}
          />
          <ReadMore />
          <AskquestionCard />
        </div>
      </div>
     
    </Layout>
     </div>
  );
};

export default Client;
