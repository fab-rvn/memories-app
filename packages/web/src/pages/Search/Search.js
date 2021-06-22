import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PostsCard from "../../components/PostsCard";
import { postSelector } from "../../redux/post/postSelector";
import * as ROUTES from "../../routes";
import { MainWrapper } from "../Home/styles";
import {
  Nav,
  NavContainer,
  NavLogo,
  ResultContainer,
  ResultH2,
  SearchInput,
  SearchWrap,
} from "./styles";

const Search = () => {
  const { posts } = useSelector(postSelector);
  const [searchQuery, setSearchQuery] = useState("");
  const [findResult, setFindResult] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  });

  useEffect(() => {
    const foundPost = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.join(",").toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFindResult(foundPost);
  }, [posts, searchQuery]);

  return (
    <>
      <Nav>
        <NavContainer>
          <NavLogo to={ROUTES.HOME}>Memories</NavLogo>
          <SearchWrap>
            <SearchInput
              type="search"
              name="search"
              placeholder="Search post by title or tags"
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrap>
        </NavContainer>
      </Nav>
      <ResultContainer>
        {!searchQuery ? (
          <ResultH2>Type to start searching...</ResultH2>
        ) : (
          <>
            <ResultH2>
              {findResult.length > 0
                ? ` ${
                    findResult.length
                  } result found for ${searchQuery.toUpperCase()}`
                : "No result was found."}
            </ResultH2>
            <MainWrapper>
              {findResult.length > 0 &&
                findResult.map((post) => (
                  <PostsCard key={post._id} post={post} />
                ))}
            </MainWrapper>
          </>
        )}
      </ResultContainer>
    </>
  );
};

export default Search;
