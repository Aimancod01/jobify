import axios from "axios";
import JobContainer from "../components/JobContainer";
import JobSearch from "../components/JobSearch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

function AllJobs() {
  const { data } = useLoaderData();
  return (
    <>
      <JobContainer data={data} />
    </>
  );
}

export default AllJobs;
