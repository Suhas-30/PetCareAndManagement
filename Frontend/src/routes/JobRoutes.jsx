import { Route } from "react-router-dom";
import JobOpening from "../pages/JobOpening"


export default function JobRoutes() {
  return <Route path="/job-openings" element={<JobOpening></JobOpening>} />;
}
