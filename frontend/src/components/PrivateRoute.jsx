import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth.js"

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;