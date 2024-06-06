import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import NotFound from "../assets/images/not-found.svg";
function Error() {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={NotFound} alt="" />
          <h3>Ohh! page not found!</h3>
          <p>We can't seem to find the page you're looking for.</p>
          <Link to="/dashboard">Back to Home Page</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.data}</p>
      <Link to="/dashboard">Back to Home Page</Link>
    </div>
  );
}

export default Error;
