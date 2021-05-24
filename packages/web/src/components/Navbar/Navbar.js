import { func } from "prop-types";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { signOut } from "../../redux/auth/authActions";
import { authSelector } from "../../redux/auth/authSelector";
import * as ROUTES from "../../routes";
import Button from "../Button";
import SearchBar from "../SearchBar";
import {
  MobileIcon,
  Nav,
  NavbarBtn,
  NavbarLink,
  NavContainer,
  NavLogo,
  NavMenu,
} from "./styles";

const Navbar = ({ toggleNavbar }) => {
  const width = useWindowSize();
  const { isAuthenticated } = useSelector(authSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    isAuthenticated ? dispatch(signOut()) : history.push(ROUTES.SIGN_IN);
  };

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">Jokes App</NavLogo>
        <MobileIcon onClick={toggleNavbar}>
          <AiOutlineMenu />
        </MobileIcon>
        {width > 768 && (
          <NavbarLink to={ROUTES.SEARCH}>
            <SearchBar />
          </NavbarLink>
        )}
        <NavMenu>
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
