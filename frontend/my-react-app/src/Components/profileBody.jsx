import { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  saveUserProfile,
  uploadProfilePicture,
} from "../controllers/userController"; // Adjust the path as necessary

const ProfileBody = ({ user }) => {
  // State for user information and editing mode
  const [userInfo, setUserInfo] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Default profile picture
  const defaultProfilePic = "https://via.placeholder.com/150";

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    setIsEditing(false);
    try {
      // Replace with API call to save the user data to the backend
      const response = await saveUserProfile(userInfo);
      if (response.success) {
        // Update the user info after successful save
        alert("Profile updated successfully!");
      } else {
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  const handleChangePicture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const response = await uploadProfilePicture(file);
        setUserInfo((prev) => ({ ...prev, image: response.imageUrl }));
        window.location.reload();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload the profile picture. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture Section */}
        <div className="profile-pic-section">
          <img
            src={userInfo.image || defaultProfilePic}
            alt="Profile"
            className="profile-pic"
          />
          <button
            className="change-pic-btn"
            onClick={handleButtonClick}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Change Picture"}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChangePicture}
          />
        </div>

        {/* Profile Information Section */}
        <div className="profile-info">
          {isEditing ? (
            <div className="editable-fields">
              <label>
                <p>
                  <strong>Username:</strong>
                </p>
                <input
                  type="text"
                  name="name" // Make sure name matches state key 'name'
                  value={userInfo.name || ""} // Bind to userInfo.name
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>
                  <strong> Email:</strong>
                </p>
                <input
                  type="email"
                  name="email" // Bind to userInfo.email
                  value={userInfo.email || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>
                  <strong> Phone:</strong>
                </p>
                <input
                  type="tel"
                  name="phone" // Bind to userInfo.phone
                  value={userInfo.phone || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          ) : (
            <div className="editable-fields">
              <p>
                <strong>Username:</strong> {userInfo.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {userInfo.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {userInfo.phone || "N/A"}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="profile-buttons">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={saveChanges}>
                  Save
                </button>
                <button className="cancel-btn" onClick={toggleEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={toggleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop Validation
ProfileBody.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string, // Adjusted the PropType for 'name'
    email: PropTypes.string,
    phone: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

// Default Props (Optional)
ProfileBody.defaultProps = {
  user: {
    name: "Guest", // Adjusted default prop to match 'name'
    email: "guest@example.com",
    phone: "N/A",
    image: "",
  },
};

export default ProfileBody;
