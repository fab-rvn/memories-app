import { node, object, string } from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, getPostId, likePost } from "../../redux/post/postActions";
import * as ROUTES from "../../routes";
import { DELETE, LIKE, UPDATE } from "../../utils/constant";
import { BtnIcon } from "./styles";

const IconBtn = ({ action, post, currentUser, icon }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleUpdateClick = (postId) => {
    dispatch(getPostId(postId));
    history.push(ROUTES.UPDATE);
  };

  const handleClick = (postId) => {
    switch (action) {
      case UPDATE:
        return handleUpdateClick(postId);
      case LIKE:
        return dispatch(likePost(postId));
      case DELETE:
        return dispatch(deletePost(postId));
      default:
        return false;
    }
  };

  return (
    <BtnIcon onClick={() => handleClick(post._id)} disabled={!currentUser.user}>
      {icon}
    </BtnIcon>
  );
};

IconBtn.propTypes = {
  action: string.isRequired,
  post: object.isRequired,
  currentUser: object.isRequired,
  icon: node.isRequired,
};

export default IconBtn;
