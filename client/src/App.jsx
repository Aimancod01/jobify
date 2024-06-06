import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Register, { action as registerAction } from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Stats, { loader } from "./pages/Stats";
import AllJobs from "./pages/AllJobs";
import EditJob from "./pages/EditJob";
import { action as loginAction } from "./pages/Login";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { action as addJobAction } from "./pages/AddJob";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as editAction } from "./pages/EditJob";
import { loader as editLoader } from "./pages/EditJob";
import { action as deleteAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import AddJob from "./pages/AddJob";
function checkDefaultColor() {
  const isDarktheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarktheme);
  return isDarktheme;
}
const isDarkThemeEnabled = checkDefaultColor();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },

        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },

        {
          path: "dashboard",
          element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <AddJob />,
              action: addJobAction,
            },
            {
              path: "admin",
              element: <Admin />,
              loader: adminLoader,
            },
            {
              path: "alljobs",
              element: <AllJobs />,
              loader: allJobsLoader,
            },
            {
              path: "stats",
              element: <Stats />,
              loader: loader,
            },
            {
              path: "profile",
              element: <Profile />,
              action: profileAction,
            },
            {
              path: "delete-job/:id",
              action: deleteAction,
            },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              loader: editLoader,
              action: editAction,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
