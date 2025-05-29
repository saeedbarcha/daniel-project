import { showError, showInfo } from '../../utils/toastUtils';

// Replace error handling with toasts:
if (isError) {
  return (
    <div className='managed-clients-container'>
      <h3 style={{ color: 'red' }}>Error loading clients</h3>
      {showError(error?.data?.message || "Failed to load clients")}
      <button 
        onClick={() => {
          showInfo("Retrying...");
          refetch();
        }}
        style={{
          border: "none", borderRadius: "5px",
          backgroundColor: "#007bff",
          padding: "5px 10px",
          color: "white"
        }}
      >
        Try Again
      </button>
    </div>
  );
}