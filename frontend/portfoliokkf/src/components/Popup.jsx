import { useState, useEffect } from "react";
import "./Popup.css";

function Popup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <button
          className="close-btn"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        <h2>Welcome To Kishan Kumar Films</h2>

        <p>Hey! Looking for a Cinematic Video?
          I'd love to hear about your project.
          Tell me your idea in the Enquiry Form.
        </p>

       

      </div>
    </div>
  );
}

export default Popup;