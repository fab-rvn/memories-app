import { array, object } from "prop-types";
import React from "react";
import {
  AuthorAvatar,
  AuthorHeaders,
  AuthorHero,
  AuthorInfo,
  AuthorP,
  AuthorSmall,
  AuthorStats,
  AuthorSubtitle,
  AuthorTitle,
} from "./styles";

const UserHero = ({ user, userPosts }) => {
  return (
    <AuthorHero>
      <AuthorInfo>
        <AuthorAvatar src={user?.imageUrl} alt={user?.name} />
        <AuthorHeaders>
          <AuthorTitle>{user?.name}</AuthorTitle>
          <AuthorSubtitle>{user?.email}</AuthorSubtitle>
        </AuthorHeaders>
      </AuthorInfo>
      <AuthorStats>
        <div>
          <AuthorP>{userPosts?.length}</AuthorP>
          <AuthorSmall>{userPosts?.length > 1 ? "posts" : "post"}</AuthorSmall>
        </div>
        <div>
          <AuthorP>5</AuthorP>
          <AuthorSmall>followers</AuthorSmall>
        </div>
        <div>
          <AuthorP>5</AuthorP>
          <AuthorSmall>following</AuthorSmall>
        </div>
      </AuthorStats>
    </AuthorHero>
  );
};

UserHero.propTypes = {
  user: object,
  userPosts: array.isRequired,
};

UserHero.defaultProps = {
  user: {},
};

export default UserHero;
