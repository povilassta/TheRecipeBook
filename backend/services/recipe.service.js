import NotFoundError from "../errors/notfound.error.js";
import Recipe from "../models/recipe.model.js";
import { unlink } from "node:fs";

const picturePath = "../backend/public/images/recipes/";

const RecipeService = {
  getMultiple: async (pageNum, orderBy, filter, time) => {
    const perPage = 20;
    const { query, orderQuery } = queryBuilder(orderBy, filter, time);
    try {
      const recipes = await Recipe.find(query)
        .sort(orderQuery)
        .skip(pageNum * perPage)
        .limit(perPage)
        .populate("categories");
      const count = await Recipe.count(query);
      return { recipes, count };
    } catch (errors) {
      throw errors;
    }
  },

  get: async (recipeId) => {
    try {
      const recipe = await Recipe.findById(recipeId).populate("categories");
      if (!recipe) {
        throw new NotFoundError("Recipe not found.");
      }
      return recipe;
    } catch (errors) {
      throw errors;
    }
  },

  addRecipeIdParam: (req) => {
    req.recipeId = req.params.recipeId;
  },

  uploadPictures: async (files) => {
    let urls = [];
    for (const file in files) {
      files[file].name = `${Date.now()}-${files[file].name}`;
      files[file].mv(`${picturePath}${files[file].name}`, (err) => {
        if (err) throw err;
      });
      urls.push(files[file].name);
    }
    return { urls };
  },

  post: async (data, userId) => {
    try {
      const recipe = await Recipe.create({ ...data, userId });
      return recipe;
    } catch (errors) {
      throw errors;
    }
  },

  put: async (data, userId, recipeId, markedForDeletion) => {
    try {
      const recipe = await Recipe.findOneAndUpdate(
        { _id: recipeId, userId },
        data,
        { new: true }
      );
      if (recipe) {
        for (const img of markedForDeletion) {
          unlink(`${picturePath}${img}`, (err) => {
            if (err) throw err;
            console.log(img + " was deleted.");
          });
        }
        return recipe;
      } else {
        throw new NotFoundError("Recipe not found or not yours to edit.");
      }
    } catch (errors) {
      throw errors;
    }
  },
};

function queryBuilder(orderBy, filter, time) {
  let query = {};
  let orderQuery = {};

  if (filter.length) {
    query["categories"] = {
      $in: filter,
    };
  }
  if (time) {
    query["timeMinutes"] = {
      $lte: time,
    };
  }
  switch (orderBy) {
    case "oldest":
      orderQuery["date"] = "asc";
      break;
    case "recent":
      orderQuery["date"] = "desc";
      break;
    case "popular":
      orderQuery["likeCounter"] = "desc";
      break;
    default:
      orderQuery["date"] = "desc";
      break;
  }

  return { query, orderQuery };
}

export default RecipeService;
