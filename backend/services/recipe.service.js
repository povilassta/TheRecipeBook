import NotFoundError from "../errors/notfound.error.js";
import Recipe from "../models/recipe.model.js";

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
      return recipes;
    } catch (errors) {
      throw errors;
    }
  },

  getCount: async (orderBy, filter, time) => {
    const { query } = queryBuilder(orderBy, filter, time);
    try {
      const count = await Recipe.count(query);
      return count;
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
