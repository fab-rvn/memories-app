import { node } from "prop-types";
import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import useNavbar from "../../hooks/useNavbar";
import { MainContainer, MainWrapper } from "./styles";

const MainLayout = ({ children }) => {
  const [isOpen, toggleNavbar] = useNavbar();
  return (
    <>
      <Sidebar isOpen={isOpen} toggleNavbar={toggleNavbar} />
      <Navbar toggleNavbar={toggleNavbar} />
      <MainContainer>
        <MainWrapper>{children}</MainWrapper>
      </MainContainer>
    </>
  );
};

MainLayout.propTypes = {
  children: node.isRequired,
};

export default MainLayout;
