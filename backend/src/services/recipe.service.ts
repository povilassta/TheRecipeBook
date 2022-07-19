import NotFoundError from "../errors/notfound.error";
import Recipe from "../models/recipe.model";
import { unlink } from "node:fs";
import ForbiddenError from "../errors/forbidden.error";
import { SortOrder } from "mongoose";

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

  post: async (files, data, userId) => {
    try {
      for (const file in files) {
        files[file].name = `${Date.now()}-${files[file].name}`;
        files[file].mv(`${picturePath}${files[file].name}`, (err) => {
          if (err) throw err;
        });
        data.imageUrls.push(files[file].name);
      }
      const recipe = await Recipe.create({ ...data, userId });
      return recipe;
    } catch (errors) {
      throw errors;
    }
  },

  put: async (data, userId, recipeId, markedForDeletion, files) => {
    try {
      // Upload the files
      for (const file in files) {
        files[file].name = `${Date.now()}-${files[file].name}`;
        files[file].mv(`${picturePath}${files[file].name}`, (err) => {
          if (err) throw err;
        });
        data.imageUrls.push(files[file].name);
      }
      const recipe = await Recipe.findOneAndUpdate(
        { _id: recipeId, userId },
        data
      );
      // Delete marked for deletion
      if (recipe) {
        for (const img of markedForDeletion) {
          if (recipe.imageUrls.includes(img)) {
            unlink(`${picturePath}${img}`, (err) => {
              if (err) throw err;
            });
          }
        }
        return recipe;
      } else {
        throw new NotFoundError("Recipe not found or not yours to edit.");
      }
    } catch (errors) {
      throw errors;
    }
  },

  delete: async (recipeId, userId) => {
    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        throw new NotFoundError("Recipe not found.");
      } else if (!recipe.userId.equals(userId)) {
        throw new ForbiddenError("Recipe is not yours to delete.");
      } else {
        await recipe.deleteOne();
        // Delete images
        for (const img of recipe.imageUrls) {
          unlink(`${picturePath}${img}`, (err) => {
            if (err) throw err;
          });
        }
        return recipe;
      }
    } catch (errors) {
      throw errors;
    }
  },

  like: async (recipeId, userId) => {
    try {
      let recipe = await Recipe.findById(recipeId).populate("categories");
      if (!recipe) {
        throw new NotFoundError("Recipe not found.");
      } else {
        if (!recipe.likeCounter.includes(userId)) {
          recipe.likeCounter.push(userId);
        } else {
          recipe.likeCounter.splice(recipe.likeCounter.indexOf(userId), 1);
        }
        recipe.markModified("likeCounter");
        recipe = await recipe.save();
        return recipe;
      }
    } catch (errors) {
      throw errors;
    }
  },
};

function queryBuilder(orderBy, filter, time) {
  let query = {};
  let orderQuery: { [key: string]: SortOrder };

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
      orderQuery = { date: "asc" };
      break;
    case "recent":
      orderQuery = { date: "desc" };
      break;
    case "popular":
      orderQuery = { likeCounter: "desc" };
      break;
    default:
      orderQuery = { date: "desc" };
      break;
  }

  return { query, orderQuery };
}

export default RecipeService;
