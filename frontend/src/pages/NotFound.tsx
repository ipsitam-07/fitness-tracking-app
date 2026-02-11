import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div>
      <h1>Not found – 404!</h1>
      <div>
        <Link to="/">Go back to Dashboard</Link>
      </div>
    </div>
  );
}
