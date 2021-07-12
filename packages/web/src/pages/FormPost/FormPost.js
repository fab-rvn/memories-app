import React from "react";
import { useLocation } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { getEndPoint } from "../../helper";
import FormLayout from "../../layout/FormLayout/FormLayout";
import {
  ACTION_CREATE,
  ACTION_UPDATE,
  ENDPOINT_CREATE,
} from "../../utils/constant";

const FormPost = () => {
  const { pathname } = useLocation();
  const endPoint = getEndPoint("posts", pathname);
  const actionType =
    endPoint === ENDPOINT_CREATE ? ACTION_CREATE : ACTION_UPDATE;

  return (
    <FormLayout>
      <PostForm action={actionType} />
    </FormLayout>
  );
};

export default FormPost;
