import "./PagePreview.css";
import { useNavigate } from "react-router-dom";
import TimeDate from "./TimeDate";
function PagePreview() {
    const navigate = useNavigate();
    return (
        <section className="page-preview" id="home">
          <div className="hero-intro">
            <p className="hero-kicker">Director · Cinematographer · Visual storyteller</p>
            <h2>Films that make<br /><em>moments eternal.</em></h2>
            <p className="hero-copy">Kishan Kumar Films creates expressive commercials, music videos, wedding films, and short films with a cinematic point of view.</p>
          </div>
          <div className="hero-film">
          <span className="hero-film-label">Featured film <b>01</b></span>
          <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/e3h2yHLkTK4?start=120"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
          </div>
<TimeDate />

<button onClick={() => navigate("/enquiry")}>
        Start a Project
      </button>

        </section>
    );
}


export default PagePreview;
