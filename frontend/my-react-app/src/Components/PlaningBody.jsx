import React, { useState } from "react";
import "../Styles/PlaningBody.css";
import CrossFit from "../assets/CrossFit.png";
import Yoga from "../assets/Yoga.png";
import RPM from "../assets/RPM.png";
import Kick from "../assets/Kick.png";
import Image from "../assets/image.png";

const PlaningBody = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const [programData, setProgramData] = useState({
    Monday: {
      motivation:
        "New week, new goals! Show up strong today so you can feel proud all week. Let’s make this Monday count!",
      activities: [
        {
          name: "Kick Boxing",
          time: "18:15 pm",
          image: Kick,
          available: "full",
        },
        { name: "Yoga", time: "19:15 pm", image: Yoga, available: "10 places" },
        {
          name: "CrossFit",
          time: "20:15 pm",
          image: CrossFit,
          available: "3 places",
        },
      ],
    },
    Tuesday: {
      motivation:
        "Keep the momentum going! Stay consistent and let’s push through this Tuesday together!",
      activities: [
        { name: "Yoga Flow", time: "17:00 pm", image: Yoga, available: "full" },
        { name: "RPM", time: "18:30 pm", image: RPM, available: "1 places" },
        {
          name: "CrossFit",
          time: "20:15 pm",
          image: CrossFit,
          available: "full",
        },
      ],
    },
    Wednesday: {
      motivation:
        "Halfway through the week! Recharge and refocus. Crush your Wednesday workout!",
      activities: [
        {
          name: "Kick Boxing",
          time: "18:15 pm",
          image: Kick,
          available: "20 places",
        },
        { name: "Yoga", time: "19:15 pm", image: Yoga, available: "7 places" },
        {
          name: "CrossFit",
          time: "20:15 pm",
          image: CrossFit,
          available: "full",
        },
      ],
    },
    Thursday: {
      motivation: "Almost there! Let’s make Thursday a day to remember.",
      activities: [
        {
          name: "Kick Boxing",
          time: "18:15 pm",
          image: Kick,
          available: "full",
        },
        { name: "Yoga", time: "19:15 pm", image: Yoga, available: "full" },
        {
          name: "CrossFit",
          time: "20:15 pm",
          image: CrossFit,
          available: "full",
        },
      ],
    },
    Friday: {
      motivation:
        "Finish strong! Let’s make this Friday all about strength and success.",
      activities: [
        { name: "Kick Boxing", time: "18:15 pm", image: Kick },
        { name: "Yoga", time: "19:15 pm", image: Yoga },
        { name: "CrossFit", time: "20:15 pm", image: CrossFit },
      ],
    },
    Saturday: {
      motivation:
        "Weekend vibes! Keep your energy up and enjoy your Saturday session.",
      activities: [
        { name: "YOGA", time: "07:00 am", image: Yoga },
        { name: "Kick Boxing", time: "18:15 pm", image: Kick },
      ],
    },
    Sunday: {
      motivation:
        "Relax, recharge, and reflect. A light Sunday workout for balance.",
      activities: [
        { name: "Yoga", time: "19:15 pm", image: Yoga },
        { name: "CrossFit", time: "20:15 pm", image: CrossFit },
      ],
    },
  });

  const handleReservePlace = (day, index) => {
    const updatedProgramData = { ...programData };
    const activity = updatedProgramData[day].activities[index];

    if (activity.available === "full") return; // Prevent any changes if full

    // Extract the number of available places from the string
    const availablePlaces = parseInt(activity.available.split(" ")[0]);

    // Subtract 1 from the available places
    let updatedAvailable =
      availablePlaces > 1 ? `${availablePlaces - 1} places` : "full";

    updatedProgramData[day].activities[index] = {
      ...activity,
      available: updatedAvailable,
    };

    setProgramData(updatedProgramData); // Update state to trigger re-render
  };

  const currentProgram = programData[selectedDay];

  return (
    <div className="container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <img src={Image} alt="Motivational" className="motivation-img" />
        <div className="motivation-text">
          <h2>Motivation</h2>
          <p>{currentProgram.motivation}</p>
        </div>
      </div>

      {/* Main Program Section */}
      <div className="program">
        <h2>Week Program</h2>
        <div className="days">
          {Object.keys(programData).map((day) => (
            <button
              key={day}
              className={`day ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>

        <div className="day-program">
          <h3>{selectedDay}'s Program</h3>
          {currentProgram.activities.map((activity, index) => (
            <div className="activity" key={index}>
              <img src={activity.image} alt={activity.name} />
              <div>
                <h4>{activity.name}</h4>
                <p>{activity.time}</p>
              </div>
              {activity.available !== "full" ? (
                <>
                  <button
                    className="view-coaches-button"
                    style={{ right: "120px", position: "absolute" }}
                    onClick={() => handleReservePlace(selectedDay, index)}
                  >
                    reserve place
                  </button>

                  <div
                    className="motivation-text"
                    style={{ right: "20px", position: "absolute" }}
                  >
                    <p>{activity.available} left</p>
                  </div>
                </>
              ) : (
                <div style={{ right: "20px", position: "absolute" }}>
                  <div className="motivation-text">
                    <p>no places are left</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaningBody;
