import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/v1/jobs/${params.id}`);
    toast.success("Job deleted successfully");
    return redirect("/dashboard/alljobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/alljobs");
  }
};
