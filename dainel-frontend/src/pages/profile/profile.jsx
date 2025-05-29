import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserProfileMutation } from "../../features/usersApiSlice";
import { setCredentials } from "../../features/authSlice";
import LoginInputs from "../../Components/logincommon/loginInputs";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        password: "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedData = {
        name: formData.name,
        email: formData.email,
        ...(formData.password && { password: formData.password }),
      };
      const response = await updateUserProfile(updatedData).unwrap();
      dispatch(setCredentials(response));
      console.log("profile updateed",response)
      toast.success("Profile updated!");
    } catch (err) {
      console.error("Update error:", err?.data || err?.error || err);
      toast.error(err?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
    navigate("/admin-dashboard")
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Profile</h2>
      <div style={styles.imgContainer}></div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <LoginInputs
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />

        <LoginInputs
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />


        <LoginInputs
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current"
        />

        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px",
    gap: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: "200px",
    height: "200px",
    border: "1px solid",
    borderRadius: "50%",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProfilePage;
