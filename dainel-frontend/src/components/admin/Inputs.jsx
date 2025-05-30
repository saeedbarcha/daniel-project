import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import "./admininputs.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useRegisterMutation, useUpdateAffiliateMutation } from "../../features/usersApiSlice";
import { AffiliateContext } from "../../context/AffiliateContext";
import { showSuccess, showError, showWarning } from '../../utils/toastUtils';
import { toast } from 'react-toastify';

// Add this helper function near the top of your file
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  } catch (err) {
    console.error("Date format error:", err);
    return "";
  }
};

const InputsAdmin = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { editMode, currentAffiliate, cancelEdit } = useContext(AffiliateContext);

  const [register, { isLoading: isCreating }] = useRegisterMutation();
  const [updateAffiliate, { isLoading: isUpdating }] = useUpdateAffiliateMutation();

  const isLoading = isCreating || isUpdating;

  // Initialize form with empty values or current affiliate data if in edit mode
  const [inputValues, setInputValues] = useState({
    password: "",
    role: "AFFIIATE",
    email: "",
  });

  // Update the useEffect to format dates correctly
  useEffect(() => {
    if (editMode && currentAffiliate) {
   

      setInputValues({
        email: currentAffiliate.email || "",
        password: "",
      });
    }
  }, [editMode, currentAffiliate]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Update the validateField function to match the affiliate version
  const validateField = (name, value) => {
    // Skip validation for empty values or non-string types in specific cases
    if (value === undefined || value === null) {
      return "";
    }

    // Safely handle different field types
    switch (name) {

      case "password":
        // Password is optional when editing
        if (!value && editMode) return "";
        if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(String(value)))
          return "Password must contain upper, lower, special char, 8+ chars";
        break;

    }
    return "";
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Define field validation order (most important fields first)
    const fieldsToCheck = ["email", "password",];

    // Check fields in order
    let firstError = null;
    let fieldWithError = null;

    // Always set all errors for red borders
    const newErrors = {};

    // Check each field for errors
    for (const field of fieldsToCheck) {
      // Skip password check in edit mode
      if (field === "password" && editMode && !inputValues[field]) continue;

      const error = validateField(field, inputValues[field]);
      if (error) {
        newErrors[field] = error;

        // Save the first error we find
        if (!firstError) {
          firstError = error;
          fieldWithError = field;
        }
      }
    }


    // Set all errors for styling purposes
    setErrors(newErrors);

    // If we found an error, show just that one and stop
    if (firstError) {
      // Format the field name for display
      const fieldName = fieldWithError === "status" ? "Payment type" :
        fieldWithError.charAt(0).toUpperCase() +
        fieldWithError.slice(1).replace('_', ' ');

      // Show just this one error
      showError(`${fieldName}: ${firstError}`);
      return;
    }

    try {
      // Show loading message
      const loadingMessage = editMode ? "Updating affiliate..." : "Creating affiliate...";
     
      
      try {
        if (editMode && currentAffiliate) {
          const updateData = {
            email: inputValues.email,
            role: "AFFILIATE",
            id: currentAffiliate.id,
          };

          // Only include password if it was changed
          if (inputValues.password && inputValues.password.trim()) {
            updateData.password = inputValues.password;
          }

         
          const result = await updateAffiliate(updateData).unwrap();

    
          cancelEdit(); // Exit edit mode

          // Show success message
          showSuccess("Affiliate updated successfully!");
        } else {
          // Create new affiliate
          const registerData = {
            email: inputValues.email,
            password: inputValues.password,
            role: "AFFILIATE",
          };

        
          const result = await register(registerData).unwrap();
   

          // Show success message
          showSuccess("Affiliate created successfully!");
        }

        // Reset form
        setInputValues({
          password: "",
          email: "",
        });
        
      } catch (err) {
        console.error(editMode ? "Update error:" : "Registration error:", err);
        
        // Show error message
        showError(`Failed: ${err?.data?.message || "Unknown error"}`);
      }
    } catch (outerErr) {
      // Handle any errors that might occur with the toast itself
      console.error("Toast error:", outerErr);
      showError(`Operation failed: ${outerErr.message || "Unknown error"}`);
    }
  };

  return (
    <form className="inputs-form" onSubmit={handleFormSubmit}>
      <h3>{editMode ? "Update Affiliate" : "Create Affiliate"}</h3>

      <div className="inputs-container">
        <div className="input-left">

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={inputValues.email}
              onChange={handleChangeInput}
              className={errors.email ? "input-error" : ""}
            />
          </div>
        </div>

        <div className="input-right">
    

          <div>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                style={{ width: "100%" }}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={inputValues.password}
                onChange={handleChangeInput}
                className={errors.password ? "input-error" : ""}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "8px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={handleShowPassword}
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-group" style={{ display: "flex", gap: "10px" }}>
        <button className="create-button" type="submit" disabled={isLoading}>
          {isLoading
            ? (editMode ? "Updating..." : "Creating...")
            : (editMode ? "Update Affiliate" : "Create Affiliate")
          }
        </button>

        {editMode && (
          <button
            type="button"
            onClick={cancelEdit}
            className="cancel-button"
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "5px 10px",
              cursor: "pointer",
              marginTop: "16px"
            }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default InputsAdmin;
