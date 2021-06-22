import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import PostDetails from "../../components/PostDetails";
import PostRecommended from "../../components/PostRecommended";
import Spinner from "../../components/Spinner";
import { foundExistingPostByTags } from "../../helper";
import MainLayout from "../../layout/MainLayout";
import { fetchPost } from "../../redux/post/postActions";
import { postSelector } from "../../redux/post/postSelector";

const Post = () => {
  const { id } = useParams();
  const { post, posts, isLoading } = useSelector(postSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  if (!post) return false;

  const { tags } = post;
  const filteredPosts = posts.filter((p) =>
    p._id !== post._id ? p.tags : null,
  );
  const reccomendedPosts = foundExistingPostByTags(tags, filteredPosts);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <MainLayout>{post && <PostDetails post={post} />}</MainLayout>
      {reccomendedPosts.length > 0 && (
        <PostRecommended reccomendedPosts={reccomendedPosts} />
      )}
      <Footer />
    </>
  );
};

export default Post;