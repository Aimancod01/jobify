import axios from "axios";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/v1/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.patch(`/api/v1/jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/alljobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

function EditJob() {
  const { job } = useLoaderData();
  console.log(job);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              className="form-input"
              defaultValue={job.position}
            />
          </div>
          <div className="form-row">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="form-input"
              defaultValue={job.company}
            />
          </div>
          <div className="form-row">
            <label htmlFor="jobLocation" className="form-label">
              Job Location
            </label>
            <input
              type="text"
              name="jobLocation"
              id="jobLocation"
              className="form-input"
              defaultValue={job.jobLocation}
            />
          </div>
          <div className="form-row">
            <label htmlFor="jobStatus" className="form-label">
              Job Status
            </label>
            <select
              name="jobStatus"
              defaultValue="pending"
              className="form-select"
              id="jobStatus"
            >
              <option defaultValue={job.jobStatus} value="pending">
                pending
              </option>
              <option value="interview">interview</option>
              <option value="declined">declined</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="jobType" className="form-label">
              Job Type
            </label>
            <select
              name="jobType"
              defaultValue="full-time"
              className="form-select"
              id="jobType"
            >
              <option value="full-time">full-time</option>
              <option value="internship">internship</option>
              <option value="part-time">part-time</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditJob;
