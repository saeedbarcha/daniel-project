import React, { useContext } from 'react';
import './adminclints.css';
import { useGetAffiliatesQuery } from '../../features/usersApiSlice';
import { AffiliateContext } from '../../context/AffiliateContext';

const ManagedAffiliatesAdmin = () => {
    const { startEdit } = useContext(AffiliateContext);
    const { data: affiliates, isLoading, isError, error, refetch } = useGetAffiliatesQuery();

    // Show loading state
    if (isLoading) {
        return (
            <div className='managed-clients-container'>
                <h3>Loading affiliates...</h3>
            </div>
        );
    }
    
    // Show error state
    if (isError) {
        return (
            <div className='managed-clients-container'>
                <h3 style={{ color: 'red' }}>Error loading affiliates</h3>
                <p>{error?.status}: {error?.data?.message || JSON.stringify(error)}</p>
                <button 
                    onClick={() => refetch()} 
                    style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        padding: "5px 10px",
                        color: "white",
                        margin: "10px 0"
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Use actual API data or empty array if undefined
    const tableData = affiliates || [];

    // Handle edit button click
    const handleEdit = (affiliate) => {
        startEdit(affiliate);
        // Scroll to the form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='managed-clients-container'>
            <h3 style={{ marginBottom: '10px' }}>Managed Affiliates</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #dee2e6', height: "50px" }}>
                        <th>S.No</th>
                        <th>Email</th>
                        {/* <th>Status</th> */}
                        {/* <th>Date</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.length > 0 ? (
                        tableData.map((affiliate, index) => (
                            <tr key={affiliate.id || index} style={{
                                borderBottom: '1px solid #dee2e6',
                                marginTop: "2rem", height: "50px"
                            }}>
                                <td>{index + 1}</td>
                                <td>{affiliate.email}</td>
                                {/* <td>
                                    <button style={{
                                        border: "none", 
                                        padding: "1px 7px",
                                        backgroundColor: "#ffc107", 
                                        borderRadius: "5px",
                                        color: "white", 
                                        fontWeight: "600", 
                                        cursor: "text"
                                    }}>
                                        {affiliate.confirmed ? "Yes" : "No"}
                                    </button>
                                </td> */}
                                {/* <td>{affiliate.payout_date || "N/A"}</td> */}
                                <td>
                                    <button 
                                        onClick={() => handleEdit(affiliate)}
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
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                No affiliates found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagedAffiliatesAdmin;
