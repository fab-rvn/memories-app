import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: ${({ theme }) => theme.navbar};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 968px) {
    transition: all 800ms ease;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  max-width: 1100px;
  z-index: 1;
`;

export const NavLogo = styled(Link)`
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-self: flex-start;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  margin-left: 24px;
  cursor: pointer;
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 87%);
    font-size: 1.8rem;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const NavbarLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
    transition: all 300ms ease-in-out;
  }
  &.active {
    border-bottom: 3px solid ${({ theme }) => theme.primary};
  }
`;

export const NavbarBtn = styled.div`
  margin-left: 16px;
`;

export const ToggleBtnWrap = styled.div`
  cursor: pointer;
`;

export const ToggleBtn = styled.img`
  height: 32px;
  width: 32px;
`;
