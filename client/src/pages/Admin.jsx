import axios from "axios";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import StatItem from "../components/StatItem";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

export const loader = async () => {
  try {
    const res = await axios.get("/api/v1/admin/app-stats");
    return res.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

function Admin() {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="Current users"
        count={users}
        color="#e9b949"
        bcg="#e0e8f9"
        icon={<FaSuitcaseRolling />}
      />

      <StatItem
        title="Total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
}

export default Admin;
