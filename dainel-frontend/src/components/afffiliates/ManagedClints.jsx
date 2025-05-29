import React, { useContext } from "react";
import "./affiliatesclients.css";
import { useGetClientsQuery } from "../../features/usersApiSlice";
import { ClientContext } from "../../context/ClientContext";

const ManagedClints = () => {
  const { startEdit } = useContext(ClientContext);
  const { data: clients, isLoading, isError, error } = useGetClientsQuery();

  const handleEdit = (client) => {
    startEdit(client);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="managed-clients-container">
        <h3>Loading clients...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="managed-clients-container">
        <h3 style={{ color: "red" }}>Error loading clients</h3>
        <p>{error?.data?.message || "Unknown error"}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            padding: "5px 10px",
            color: "white",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="managed-clients-container">
      <h3>Your Clients</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #dee2e6", height: "50px" }}>
            <th>Name</th>
            <th>Contact</th>
            <th>City</th>
            <th>Payment Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <tr
                key={client.id}
                style={{
                  borderBottom: "1px solid #dee2e6",
                  marginTop: "2rem",
                  height: "50px",
                }}
              >
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.city || "—"}</td>
                <td>
                  <button
                    style={{
                      border: "none",
                      padding: "1px 7px",
                      backgroundColor: "#28a745",
                      borderRadius: "5px",
                      color: "white",
                      fontWeight: "600",
                      cursor: "text",
                    }}
                  >
                    {client.payment_source || "TRUMP_CARD"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(client)}
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#ffc107",
                      padding: "3px 7px",
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No clients found. Add your first client above!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagedClints;
