import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDashboardContext } from "../pages/DashboardLayout";
function Navlinks() {
  const { user } = useDashboardContext();

  return (
    <>
      <NavLink className="nav-link" to=".">
        <span className="icon">
          <FaWpforms />
        </span>
        Add Jobs
      </NavLink>
      <NavLink className="nav-link" to="alljobs">
        <span className="icon">
          <MdQueryStats />
        </span>
        All Jobs
      </NavLink>
      <NavLink className="nav-link" to="stats">
        <span className="icon">
          <IoBarChartSharp />
        </span>
        Stats
      </NavLink>
      <NavLink className="nav-link" to="profile">
        <span className="icon">
          <ImProfile />
        </span>
        profile
      </NavLink>
      {user.role === "admin" ? (
        <NavLink className="nav-link" to="admin">
          <span className="icon">
            <MdAdminPanelSettings />
          </span>
          Admin
        </NavLink>
      ) : (
        ""
      )}
    </>
  );
}

export default Navlinks;
