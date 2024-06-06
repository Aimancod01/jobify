import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import JobInfo from "./JobInfo";
import axios from "axios";
import { toast } from "react-toastify";
day.extend(advancedFormat);

async function handleDelete(id) {
  try {
    await axios.delete(`/api/v1/jobs/${id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

function Job({ job }) {
  const { _id, position, company, jobLocation, jobType, createdAt, jobStatus } =
    job;
  const date = day(createdAt).format("MMM Do,YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={FaLocationArrow} text={jobLocation} />
          <JobInfo icon={FaCalendarAlt} text={date} />
          <JobInfo icon={FaBriefcase} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>

          <Form method="post" action={`/dashboard/delete-job/${_id}`}>
            <button className="btn delete-btn">Delete</button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
