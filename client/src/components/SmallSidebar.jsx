import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import Navlinks from "./Navlinks";

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  console.log(showSidebar);
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" onClick={toggleSidebar} className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links" onClick={toggleSidebar}>
            <Navlinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
