import { useState, useRef } from "react";

function ActBody({ activities }) {
  const detailedRef = useRef();
  const [selectedActivity, setSelectedActivity] = useState(null);

  const ActivityCard = ({ title, image }) => (
    <div className="activity-card">
      <img src={image} alt={title} className="activity-image" />
      <button className="actbutton" onClick={() => handleActivityClick(title)}>
        {title}
      </button>
    </div>
  );

  const handleActivityClick = (title) => {
    const activity = activities.find((act) => act.title === title);
    detailedRef.current.scrollIntoView({ behavior: "smooth" });
    setSelectedActivity(activity);
  };

  const DetailedActivity = ({ activity }) => (
    <div className="detailed-activity">
      <img
        src={activity.image}
        alt={activity.title}
        className="detailed-image"
      />
      <div className="detAct">
        <h2>{activity.title}</h2>
        <p>{activity.description}</p>
        <button className="view-coaches-button">View Coaches</button>
      </div>

      <div className="Coaches">
        <ul>
          {activity.coaches.map((coach, index) => (
            <li key={index}>
              <img src={coach.image} alt={coach.name} />
              <span>{coach.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <div className="Sign">
        <div className="mm">
          <h1>Activities</h1>
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                title={activity.title}
                image={activity.image}
              />
            ))}
          </div>
          <section ref={detailedRef}>
            {/* Show detailed activity below the activities grid */}
            {selectedActivity && (
              <DetailedActivity activity={selectedActivity} />
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default ActBody;
