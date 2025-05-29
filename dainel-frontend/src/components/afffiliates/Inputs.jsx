import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import "./affiliatesinput.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import {
  useRegisterMutation,
  useUpdateAffiliateMutation,
} from "../../features/usersApiSlice";
import { ClientContext } from "../../context/ClientContext";
import { showSuccess, showError, showWarning } from "../../utils/toastUtils";
import { toast } from "react-toastify"; // Add this import if not already there

// Helper function for date formatting
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  } catch (err) {
    console.error("Date format error:", err);
    return "";
  }
};

const InputsAffiliates = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { editMode, currentClient, cancelEdit } = useContext(ClientContext);

  const [register, { isLoading: isCreating }] = useRegisterMutation();
  const [updateAffiliate, { isLoading: isUpdating }] =
    useUpdateAffiliateMutation();

  const isLoading = isCreating || isUpdating;

  // Initialize form with empty values or current client data if in edit mode
  const [inputValues, setInputValues] = useState({
    name: "",
    phone: "",
    payout_date: "",
    city: "",
    payout_amount: 0,
    password: "",
    payment_source: "TRUMP_CARD",
    telegram_url: "",
    email: "",
  });

  // Update the useEffect to format dates correctly
  useEffect(() => {
    if (editMode && currentClient) {
      console.log("Setting form for edit mode:", currentClient);

      setInputValues({
        name: currentClient.name || "",
        email: currentClient.email || "",
        phone: currentClient.phone || "",
        telegram_url: currentClient.telegram_url || "",
        // Fix the date format issue
        payout_date: formatDateForInput(currentClient.payout_date),
        city: currentClient.city || "",
        payout_amount: currentClient.payout_amount || 0,
        password: "", // Don't populate password for security reasons
        payment_source: currentClient.payment_source || "TRUMP_CARD",
      });

      setSelectedOption(currentClient.payment_source || "");
    }
  }, [editMode, currentClient]);

  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Fix the validateField function to handle non-string values
  const validateField = (name, value) => {
    // Skip validation for empty values or non-string types in specific cases
    if (value === undefined || value === null) {
      return "";
    }

    // Safely handle different field types
    switch (name) {
      case "name":
        if (typeof value !== "string" || value.trim().length < 3)
          return "Must be at least 3 characters";
        break;

      case "phone":
        if (!/^\d{10,15}$/.test(String(value)))
          return "Phone must be 10–15 digits";
        break;

      case "telegram_url":
        // Skip validation if empty in edit mode
        if (!value && editMode) return "";
        if (
          value &&
          !/^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/.test(
            String(value)
          )
        )
          return "Enter a valid Telegram link eg, https://t.me/xyz. ";
        break;

      case "city":
        // Skip validation if empty in edit mode
        if (!value && editMode) return "";
        if (typeof value !== "string") return "";
        if (value.trim().length < 3)
          return "City name must be at least 3 characters";
        break;

      case "password":
        // Password is optional when editing
        if (!value && editMode) return "";
        if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(String(value)))
          return "Password must contain upper, lower, special char, 8+ chars";
        break;

      case "payout_amount":
        // Skip string methods for number fields
        return "";

    }
    return "";
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    setErrors((prev) => ({
      ...prev,
      Option: value ? "" : "Please select a status",
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Define field validation order (most important fields first)
    const fieldsToCheck = [
      "name",
      "email",
      "phone",
      "city",
      "password",
      "telegram_url",
      "payout_date",
      "payout_amount",
    ];

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

    // Also check the dropdown selection
    if (!selectedOption) {
      newErrors.status = "Please select a payment type";

      if (!firstError) {
        firstError = "Please select a payment type";
        fieldWithError = "payment type";
      }
    }

    // Set all errors for styling purposes
    setErrors(newErrors);

    // If we found an error, show just that one and stop
    if (firstError) {
      // Format the field name for display
      const fieldName =
        fieldWithError === "status"
          ? "Payment type"
          : fieldWithError.charAt(0).toUpperCase() +
            fieldWithError.slice(1).replace("_", " ");

      // Show just this one error
      showError(`${fieldName}: ${firstError}`);
      return;
    }

    try {
      if (editMode && currentClient) {
        // Update existing client
        const updateData = {
          name: inputValues.name,
          email: inputValues.email,
          phone: inputValues.phone,
          payout_date: inputValues.payout_date || currentClient.payout_date,
          country_id: 1,
          role: "CLIENT", // Changed from AFFILIATE to CLIENT
          city: inputValues.city,
          telegram_url: inputValues.telegram_url,
          payout_amount: parseInt(inputValues.payout_amount),
          payment_source: selectedOption || "TRUMP_CARD",
          id: currentClient.id,
        };

        // Only include password if it was changed
        if (inputValues.password && inputValues.password.trim()) {
          updateData.password = inputValues.password;
        }

        const result = await updateAffiliate(updateData).unwrap();

        console.log("Update successful:", result);
        cancelEdit(); // Exit edit mode

        showSuccess("Client updated successfully!");
      } else {
        // Create new client
        const registerData = {
          name: inputValues.name,
          email: inputValues.email,
          phone: inputValues.phone,
          password: inputValues.password,
          payout_date: inputValues.payout_date,
          role: "CLIENT",
          country_id: 1,
          city: inputValues.city,
          telegram_url: inputValues.telegram_url,
          payout_amount: parseInt(inputValues.payout_amount),
          payment_source: selectedOption || "TRUMP_CARD",
        };

        console.log("Creating client:", registerData);
        const result = await register(registerData).unwrap();
        console.log("Creation successful:", result);

        showSuccess("Client created successfully!");
      }

      // Reset form
      setInputValues({
        name: "",
        phone: "",
        telegram_url: "",
        payout_date: "",
        city: "",
        payout_amount: 0,
        password: "",
        email: "",
      });
      setSelectedOption("");
      setErrors({});
    } catch (err) {
      console.error(editMode ? "Update error:" : "Registration error:", err);

      showError(`Failed: ${err?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <form className="inputs-form" onSubmit={handleFormSubmit}>
      <h3>{editMode ? "Update Client" : "Create Client"}</h3>

      <div className="inputs-container">
        <div className="input-left">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Client name" // Changed from Affiliate name
              value={inputValues.name}
              onChange={handleChangeInput}
              className={errors.name ? "input-error" : ""}
            />
            {/* No inline error message here */}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={inputValues.email}
              onChange={handleChangeInput}
              className={errors.email ? "input-error" : ""}
            />
            {/* No inline error message here */}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={inputValues.phone}
              onChange={handleChangeInput}
              className={errors.phone ? "input-error" : ""}
            />
          </div>

          <div>
            <input
              type="url"
              name="telegram_url"
              placeholder="Telegram Link"
              value={inputValues.telegram_url}
              onChange={handleChangeInput}
              className={errors.telegram_url ? "input-error" : ""}
            />
          </div>

          <div>
            <input
              type="date"
              name="payout_date"
              style={{ paddingRight: "1rem" }}
              value={inputValues.payout_date}
              onChange={handleChangeInput}
              className={errors.payout_date ? "input-error" : ""}
            />
          </div>
        </div>

        <div className="input-right">
          <div>
            <input
              type="text"
              name="city"
              placeholder="city"
              value={inputValues.city}
              onChange={handleChangeInput}
              className={errors.city ? "input-error" : ""}
            />
          </div>

          <div>
            <select
              className={`select ${errors.status ? "input-error" : ""}`}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>
                Select an option
              </option>
              <option value="TRUMP_CARD">Trump Card</option>
              <option value="TRUMP_AGREEMENT">Trump Agreement</option>
              <option value="TRUMP_CERTIFICATE">Trump Certificate</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              name="payout_amount"
              placeholder="Balance"
              value={inputValues.payout_amount}
              onChange={handleChangeInput}
              className={errors.payout_amount ? "input-error" : ""}
            />
          </div>

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
            ? editMode
              ? "Updating..."
              : "Creating..."
            : editMode
            ? "Update Client"
            : "Create Client"}
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
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default InputsAffiliates;
