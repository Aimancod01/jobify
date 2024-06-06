import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import BigSidebar from "../components/BigSidebar";
import Navbar from "../components/Navbar";
import SmallSidebar from "../components/SmallSidebar";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const dashboardContext = createContext();

function DashboardLayout({ isDarkThemeEnabled }) {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [darkTheme, setDarkTheme] = useState(isDarkThemeEnabled);

  function toggleDarkTheme() {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("darkTheme", newTheme);
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser() {
    navigate("/");
    await axios.get("api/v1/auth/logout");
    toast.success("Logged Out");
  }

  return (
    <dashboardContext.Provider
      value={{
        user,
        showSidebar,
        darkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </dashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(dashboardContext);

export default DashboardLayout;
