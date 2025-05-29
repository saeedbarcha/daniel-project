import React from "react";
import { MdManageAccounts } from "react-icons/md";
import "./AccountDetails.css";
import IconText from "./Common/IconText";
import AccountDetailText from "./Common/AccountDetailText";

const AccountDetailsCard = ({userData, isLoading, formatDate}) => {

  if (isLoading) {
    return <div className="details-main">Loading account details...</div>;
  }

  return (
    <div className="details-main">
      <div className="hero-account-details">
        <IconText
          icon={<MdManageAccounts style={{ fontSize: "22px" }} />}
          text={"Account Details"}
        />

        <AccountDetailText
          name={"Full Name"}
          details={userData?.name || "Not available"}
        />
        <AccountDetailText
          name={"Contact Number"}
          details={userData?.phone || "Not available"}
        />
        <AccountDetailText
          name={"Email Address"}
          details={userData?.email || "Not available"}
        />
        <AccountDetailText
          name={"Payout Date"}
          details={formatDate(userData?.payout_date)}
        />

        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Payout Date Confirmed</div>
          <button>{userData?.payout_date ? "Yes" : "No"}</button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsCard;
