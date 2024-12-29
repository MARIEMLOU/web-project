import { Link } from "react-router-dom";
import LogoWeb from "../assets/LogoWeb.png";
import { handleLogout } from "../controllers/authController"; // Import the handleLogout function

function NavBar() {
  const logout = () => {
    const isLoggedOut = handleLogout();
    if (isLoggedOut) {
      // Optionally, redirect to login page after logout
      window.location.href = "/login"; // Redirect to login page after logout
    } else {
      console.error("Logout failed");
    }
  };
  const logoutButtonStyle = {
    fontSize: "20px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#ffc400", // Optional: add color
    color: "black", // Optional: add text color
  };

  // Inline styles for the hover effect
  const logoutButtonHoverStyle = {
    backgroundColor: "darkred", // Optional: add hover effect color
  };

  return (
    <div className="head">
      <img src={LogoWeb} alt="Logo" className="logo" />
      <nav>
        <Link to="/Activities">
          {" "}
          <a>Activities</a>
        </Link>
        <Link to="/PlanPage">Planning</Link>
        {/* <a href="#Offers">Offers</a> */}
        <Link to="/ProfilePage">Profile</Link>
        {/* Logout Button */}
        <button
          onClick={logout}
          style={logoutButtonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              logoutButtonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)
          }
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
