import { Link } from "react-router-dom"

function NoJobsFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="alert alert-warning text-center p-4 shadow-lg">
        <h4 className="mb-3">No Job Found</h4>
        <p>Sorry, we couldn't find the job you're looking for.</p>
        <Link to="/" className="btn btn-primary mt-2">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NoJobsFound
