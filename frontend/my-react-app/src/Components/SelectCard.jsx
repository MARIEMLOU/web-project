
import CrossFit from "../assets/CrossFit.png";
import LogoWeb from "../assets/logoWeb.png";
import Yoga from "../assets/Yoga.png";
import RPM from "../assets/RPM.png";
import Kick from "../assets/Kick.png";
import pilates from "../assets/pilates.png";
import afro from "../assets/afro.png";
import Coach1 from "../assets/Coach1.png"; 
import Coach2 from "../assets/Coach2.png";
import Coach3 from "../assets/Coach3.png";
import Coach4 from "../assets/Coach4.png";

function SelectCard() {
  const activities = [
    {
      title: "CrossFit",
      image: CrossFit,
      description:
        "A form of high-intensity interval training. CrossFit is a strength and conditioning workout made up of functional movements performed at high intensity.",
      coaches: [
        { name: "Coach 1", image: Coach1 },
        { name: "Coach 2", image: Coach2 },
        { name: "Coach 3", image: Coach3 },
        { name: "Coach 4", image: Coach4 },
      ],
    },
    {
      title: "Yoga",
      image: Yoga,
      description:
        "Yoga improves strength, balance, and flexibility. It's a great way to relax and reduce stress while improving your health.",
      coaches: [
        { name: "Coach A", image: Coach1 },
        { name: "Coach B", image: Coach2 },
      ],
    },
    {
      title: "RPM",
      image: RPM,
      description:
        "RPM is a high-energy indoor cycling workout that burns calories and improves cardiovascular fitness.",
      coaches: [{ name: "Coach X", image: Coach3 }],
    },
    {
      title: "Kickboxing",
      image: Kick,
      description:
        "Kickboxing is a high-energy workout that combines martial arts techniques with fast-paced cardio.",
      coaches: [
        { name: "Coach Y", image: Coach4 },
        { name: "Coach Z", image: Coach1 },
      ],
    },
    {
      title: "PILATES",
      image: pilates,
      description:
        "Pilates focuses on core strength, flexibility, and overall body awareness, helping you build a strong and balanced body.",
      coaches: [{ name: "Coach C", image: Coach2 }],
    },
    {
      title: "Afro'Dance",
      image: afro,
      description:
        "Afro'Dance blends traditional African dance moves with modern choreography for a fun and dynamic workout.",
      coaches: [
        { name: "Coach D", image: Coach3 },
        { name: "Coach E", image: Coach4 },
      ],
    },
  ];

  const [selectedActivity, setSelectedActivity] = useState(null); // Track the selected activity

  const handleCardClick = (activity) => {
    setSelectedActivity(activity); // Update the state with the clicked activity
  };

  const ActivityCard = ({ title, image, duration, onClick }) => {
    return (
      <div className="activity-card" onClick={onClick}>
        <img src={image} alt={title} className="activity-image" />
        {duration && <span className="duration">{duration}</span>}
        <h3>{title}</h3>
      </div>
    );
  };

  return (
    <div className="Sign">
      <div className="head">
        <img src={LogoWeb} alt="Logo" className="logo" />
        <nav>
          <a href="#Activities">Activities</a>
          <a href="#Planning">Planning</a>
          <a href="#Offers">Offers</a>
          <a href="#Profil">Profil</a>
        </nav>
      </div>
      <div className="mm">
        <h1>Activities</h1>
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
              image={activity.image}
              duration={activity.duration}
              onClick={() => handleCardClick(activity)} // Handle card click
            />
          ))}
        </div>
      </div>

      {/* Display details of the selected activity */}
      {selectedActivity && (
        <div className="activity-details">
          <div className="details-header">
            <img
              src={selectedActivity.image}
              alt={selectedActivity.title}
              className="details-image"
            />
            <div>
              <h2>{selectedActivity.title}</h2>
              <p>{selectedActivity.description}</p>
              <button className="view-coaches-btn">View Coaches</button>
            </div>
          </div>
          <div className="coaches-list">
            {selectedActivity.coaches.map((coach, index) => (
              <div key={index} className="coach-card">
                <img src={coach.image} alt={coach.name} />
                <p>{coach.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectCard;
