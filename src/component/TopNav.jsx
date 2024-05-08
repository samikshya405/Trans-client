import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const TopNav = ({ loggedInUser }) => {
  
  const handleLogOut = () => {
    localStorage.removeItem("user");
   
  };
  return (
    <Container>
      <div className="text-end">
        <Nav.Link href="/" onClick={handleLogOut} role="button">
        Signout
        <CiLogout className="fs-4 fw-bold" />
        </Nav.Link>
       
      </div>
    </Container>
  );
};

