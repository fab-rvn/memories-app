import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  background: ${({ theme }) => theme.background};
  display: grid;
  align-items: center;
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: all 500ms ease-in-out;
`;

export const CloseIcon = styled(AiOutlineClose)`
  color: ${({ theme }) => theme.text};
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  font-size: 2rem;
  background: transparent;
  outline: none;
  cursor: pointer;
`;

export const SidebarWrapper = styled.div`
  color: ${({ theme }) => theme.text};
  position: relative;
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 80px);
  text-align: center;
  @media screen and(max-width: 480px) {
    grid-template-rows: repeat(5, 60px);
  }
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.navbarLink};
    transition: all 300ms ease-in-out;
  }
`;

export const SidebarBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
