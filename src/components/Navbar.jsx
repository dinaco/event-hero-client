import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to='/events'>
        <button>All Events</button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to='/my-account'>
            <button>My Account</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
          <p>{user.email}</p>
        </>
      )}

      {!isLoggedIn && (
        <Link to='/'>
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
