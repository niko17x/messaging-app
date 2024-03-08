import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops, this page does not exist!</h1>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to={-1}>
        <div>Previous Page</div>
      </Link>
    </div>
  );
};

export default ErrorPage;
