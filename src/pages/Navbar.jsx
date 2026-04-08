import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Root() {
  return (
    <>
      <div id="navbar">
        <nav>
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
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}