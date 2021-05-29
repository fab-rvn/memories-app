import { Avatar } from "@material-ui/core";
import { func } from "prop-types";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../../redux/auth/authActions";
import { authSelector } from "../../redux/auth/authSelector";
import * as ROUTES from "../../routes";
import Button from "../Button";
import {
  MobileIcon,
  Nav,
  NavbarBtn,
  NavbarLink,
  NavContainer,
  NavItem,
  NavLogo,
  NavMenu,
} from "./styles";

const Navbar = ({ toggleNavbar }) => {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    isAuthenticated ? dispatch(signOut()) : history.push(ROUTES.SIGN_IN);
  };

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">Memories</NavLogo>
        <MobileIcon onClick={toggleNavbar}>
          <AiOutlineMenu />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavbarLink to={ROUTES.HOME} exact>
              Home
            </NavbarLink>
          </NavItem>
          <NavItem>
            <NavbarLink to={ROUTES.CREATE}>Create</NavbarLink>
          </NavItem>
          <NavItem>
            <NavbarLink to={ROUTES.SEARCH}>Search</NavbarLink>
          </NavItem>
          {isAuthenticated && (
            <NavItem>
              <Avatar
                alt={currentUser?.user?.name}
                src={currentUser?.user?.imageUrl}
              >
                {currentUser?.user?.name.charAt(0)}
              </Avatar>
            </NavItem>
          )}
          {/* <NavItem>{currentUser?.user?.name}</NavItem> */}
          <NavbarBtn>
            <Button primary onClick={handleClick}>
              {isAuthenticated ? "Logout" : "Sign In"}
            </Button>
          </NavbarBtn>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

Navbar.propTypes = {
  toggleNavbar: func.isRequired,
};

export default Navbar;
