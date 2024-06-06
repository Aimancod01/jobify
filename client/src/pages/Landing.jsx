import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> app
          </h1>
          <p>
            Discover tailored job listings, personalized recommendations, and a
            seamless application process. Join Jobify for a thriving community
            and valuable career resources. Your dream job is just a click away.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login/Demo
          </Link>
        </div>
        <img src={main} alt="main-img" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
