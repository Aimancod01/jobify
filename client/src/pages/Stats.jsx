import axios from "axios";
import StatsContainer from "../components/StatsContainer";
import { useLoaderData } from "react-router-dom";
import ChartsContainer from "../components/ChartsContainer";

export const loader = async () => {
  try {
    const res = await axios.get("/api/v1/jobs/stats");
    return res.data;
  } catch (error) {
    return error;
  }
};

function Stats() {
  const { defaultStats, monthlyApplication } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplication?.length > 0 && (
        <ChartsContainer data={monthlyApplication} />
      )}
    </>
  );
}

export default Stats;
