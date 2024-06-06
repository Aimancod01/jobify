import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/jobs", data);
    toast.success("Job Created");
    return redirect("/dashboard/alljobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

function AddJob() {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
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
              required
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
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={user.location}
              className="form-input"
              required
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
              <option value="pending">pending</option>
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

export default AddJob;
