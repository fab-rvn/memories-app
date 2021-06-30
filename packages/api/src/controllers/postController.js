const { Post } = require("../models");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const postData = req.body;
  const newPost = new Post({
    ...postData,
    author: req.userId,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const fetchPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    // get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    const totalPosts = await Post.countDocuments({});
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .populate({
        path: "author",
        select: {
          name: 1,
          email: 1,
        },
      });

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalPosts / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const fetchPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate({
      path: "author",
      select: {
        name: 1,
        email: 1,
      },
    });
    const relatedPosts = await Post.find({ tags: { $in: post.tags } }).populate(
      "author",
    );
    res.status(200).json({ data: post, relatedPosts: relatedPosts });
  } catch (error) {
    res.status(400).json({ message: `No post was found with id: ${id}` });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, media } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No post was found with id: ${id}` });
  }

  const updatedPost = { title, description, tags, media, _id: id };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No post was found with id: ${id}` });
  }

  await Post.findByIdAndRemove(id);

  res.status(200).json({ message: "Post successfully deleted!" });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No post was found with id: ${id}` });
  }

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  // if there is not like
  if (index === -1) {
    // like post
    post.likes.push(req.userId);
  } else {
    // dislike post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const likedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.status(200).json(likedPost);
};

module.exports = {
  createPost,
  fetchPosts,
  updatePost,
  deletePost,
  likePost,
  fetchPost,
};
