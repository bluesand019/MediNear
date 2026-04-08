import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Root() {
  return (
    <>
      <div id="navbar">
        <nav>
            <h1>MediNear</h1>
          <ul>
            <li>
              <Link to={`/`} href={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
            </li>
            <li>
              <Link to={`/contact`}>Contact</Link>
            </li>
            <li>
              <Link to={`/service-search`}>Services</Link>
            </li>
            <li>
              <Link to={`/doctor-search`}>Doctors</Link>
            </li>
            <li>
              <Link to={`/hospital-detail`}>Hospitals</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}