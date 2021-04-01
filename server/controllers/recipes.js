const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeId = await Recipe.findOne({ _id: id });
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new Recipe({ ...recipe, author: 'faber' });
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No recipe was gfound with id: ${id}`);
  }

  await Recipe.findByIdAndDelete(id);

  res.json({ message: 'Recipe was successfully deleted!' });
};

module.exports = { getRecipes, createRecipe, deleteRecipe, getRecipe };
