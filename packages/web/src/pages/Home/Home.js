import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import PostsCard from "../../components/PostsCard";
import SpinnerWrap from "../../components/Spinner";
import MainLayout from "../../layout/MainLayout";
import { fetchPosts } from "../../redux/post/postActions";
import { postSelector } from "../../redux/post/postSelector";
import { MainWrapper } from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector(postSelector);

  useEffect(() => {
    posts.length === 0 && dispatch(fetchPosts());
  }, [dispatch, posts.length]);

  return (
    <>
      {isLoading ? (
        <SpinnerWrap />
      ) : (
        <MainLayout>
          <MainWrapper>
            {posts.map((post) => (
              <PostsCard key={post._id} post={post} />
            ))}
          </MainWrapper>
        </MainLayout>
      )}
      <Footer />
    </>
  );
};

export default Home;
