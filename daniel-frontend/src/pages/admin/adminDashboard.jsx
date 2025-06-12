import React from "react";
import Sublayout from "../../layouts/Sublayout";
import InputsAdmin from "../../Components/admin/Inputs";
import AdminHeader from "../../Components/admin/Header";
import ManagedAffiliatesAdmin from "../../components/admin/ManagedAffiliates";
import { AffiliateProvider } from "../../context/AffiliateContext";

const AdminDashboard = () => {
  return (
    <Sublayout>
      <AdminHeader />
      <AffiliateProvider>
        <InputsAdmin />
        <ManagedAffiliatesAdmin />
      </AffiliateProvider>
    </Sublayout>
  );
};

export default AdminDashboard;
