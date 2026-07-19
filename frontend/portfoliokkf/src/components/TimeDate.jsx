import { useState, useEffect } from "react";
import "./TimeDate.css";

function TimeDate() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const day = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "Asia/Kolkata",
  });

  const date = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <section className="time-date" aria-label="Studio time and date">
      <div className="time-card time-card-primary">
        <span className="time-card-label"><i /> Studio time · IST</span>
        <strong>{time}</strong>
      </div>
      <div className="time-card">
        <span className="time-card-label">Today</span>
        <strong>{day}</strong>
      </div>
      <div className="time-card time-card-date">
        <span className="time-card-label">Production calendar</span>
        <strong>{date}</strong>
      </div>
    </section>
  );
}

export default TimeDate;
