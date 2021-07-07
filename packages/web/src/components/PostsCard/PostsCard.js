import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import moment from "moment";
import { object } from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authSelector } from "../../redux/auth/authSelector";
import { fetchPost } from "../../redux/post/postActions";
import { DELETE, LIKE, UPDATE } from "../../utils/constant";
import BtnIcon from "../IconBtn";
import LikePost from "./LikePost";
import {
  Card,
  PostFooter,
  PostFooterActions,
  PostFooterAuthor,
  PostHero,
  PostImg,
  PostInfo,
  PostP,
  PostSpan,
  PostTitle,
} from "./styles";

const PostsCard = ({ post }) => {
  const { currentUser } = useSelector(authSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (postId) => {
    dispatch(fetchPost(postId));
    history.push(`/posts/${postId}`);
  };

  return (
    <Card>
      <PostHero onClick={() => handleClick(post._id)}>
        <PostImg src={post.media} alt={post.title} />
        <PostInfo>
          <PostP>{post.tags.map((tag) => `#${tag} `)}</PostP>
          <PostTitle>{post.title}</PostTitle>
        </PostInfo>
      </PostHero>
      <PostFooter>
        <PostFooterAuthor>
          <PostSpan>{post?.author?.name}</PostSpan>
          <PostSpan>{moment(post.createdAt).fromNow()}</PostSpan>
        </PostFooterAuthor>
        <PostFooterActions>
          <BtnIcon
            action={LIKE}
            post={post}
            currentUser={currentUser}
            icon={<LikePost post={post} currentUser={currentUser.user} />}
          />
          {currentUser?.user?._id === post?.author?._id && (
            <>
              <BtnIcon
                action={UPDATE}
                post={post}
                currentUser={currentUser}
                icon={<MoreVertIcon />}
              />
              <BtnIcon
                action={DELETE}
                post={post}
                currentUser={currentUser}
                icon={<DeleteIcon />}
              />
            </>
          )}
        </PostFooterActions>
      </PostFooter>
    </Card>
  );
};

PostsCard.propTypes = {
  post: object.isRequired,
};

export default PostsCard;
