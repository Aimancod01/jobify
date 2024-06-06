import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";

function JobContainer({ data }) {
  const { jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
      </div>
    </Wrapper>
  );
}

export default JobContainer;
