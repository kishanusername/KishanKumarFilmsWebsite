import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="kkf">
              <span className="brand-name">Kishan Kumar Films</span>
            </h1>
        <ul className="nav-links">
              <li><a href="#home">Home</a></li>
<li><a href="#about">About</a></li>
<li><a href="#portfolio">Portfolio</a></li>
<li><Link to="/enquiry">Enquiry</Link></li>
<li><a href="#contact">Contact</a></li>

            </ul>
        </nav>
    );
}
export default Navbar;
