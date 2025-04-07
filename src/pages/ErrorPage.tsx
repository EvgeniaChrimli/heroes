import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <p>Страница не найдена</p>
      <Link to="/">Домой</Link>
    </div>
  );
};

export default ErrorPage;
