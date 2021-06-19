import styled from "styled-components";
import { COLOR } from "../../styles/colors";

export const PostRecommendedContainer = styled.div`
  width: 100%;
  padding: 100px 24px;
  background-color: ${COLOR.navbar};
`;

export const PostRecommendedWrap = styled.div`
  max-width: 1100px;
  margin: auto;
`;

export const PostRecommendedH2 = styled.h2`
  font-size: 32px;
  font-weight: 400;
  line-height: 1.5;
`;
export const PostRecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 16px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(auto-fit, 230px);
  }
`;
