import Icon from "../assets/Icon.png";
import { useNavigate } from "react-router-dom";

function HomeBody() {
  const navigate = useNavigate(); // Hook pour naviguer

  const goToLogin = () => {
    navigate("/login"); // Redirige vers la route "LoginPage"
  };

  return (
    <div className="LandingPage">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Get more out of your <span>Fitness Journey</span>
          </h1>
          <p>
            Join the community to track your progress and achieve your fitness
            goals with professional support and motivation.
          </p>
          <button onClick={goToLogin} className="cta-button">
            Login
          </button>
        </div>
      </section>
      <section className="features">
        <div className="feature-card">
          <img src={Icon} alt="Feature Icon" />
          <h3>One Month Plan </h3>
          <p>100 dt</p>
        </div>
        <div className="feature-card">
          <img src={Icon} alt="Feature Icon" />
          <h3>Three Months Plan </h3>
          <p>250 dt</p>
        </div>
        <div className="feature-card">
          <img src={Icon} alt="Feature Icon" />
          <h3>Six Months Plan</h3>
          <p>500 dt</p>
        </div>
      </section>
    </div>
  );
}

export default HomeBody;
