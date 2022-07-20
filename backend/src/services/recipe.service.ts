import NotFoundError from "../errors/notfound.error";
import Recipe from "../models/recipe.model";
import { unlink } from "node:fs";
import ForbiddenError from "../errors/forbidden.error";
import { FilterQuery, SortOrder, Types } from "mongoose";
import { FileArray, UploadedFile } from "express-fileupload";
import Express from "express";
import { IRecipe } from "../interfaces/recipe.interface";
import ConflictError from "../errors/conflict.error";

type RecipeData = {
  title: string;
  categories: string[];
  instructions: string[];
  ingredients: string[];
  timeMinutes: number;
  imageUrls: string[];
};

const picturePath = "../backend/public/images/recipes/";

const RecipeService = {
  getMultiple: async function (
    pageNum: number,
    orderBy: string,
    filter: string[],
    time: number
  ) {
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

  get: async function (recipeId: string) {
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

  addRecipeIdParam: function (req: Express.Request) {
    req.recipeId = req.params.recipeId;
  },

  post: async function (
    images: UploadedFile | UploadedFile[] | undefined,
    data: RecipeData,
    userId: string
  ) {
    try {
      if (images) {
        data.imageUrls = uploadImages(images);
      } else {
        throw new ConflictError("No images provided.");
      }

      const recipe = await Recipe.create({ ...data, userId });
      return recipe;
    } catch (errors) {
      throw errors;
    }
  },

  put: async function (
    data: RecipeData,
    userId: string,
    recipeId: string,
    markedForDeletion: string[],
    images: UploadedFile | UploadedFile[] | undefined
  ) {
    try {
      // Upload the files
      if (images) {
        data.imageUrls = data.imageUrls.concat(uploadImages(images));
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

  delete: async function (recipeId: string, userId: string) {
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

  like: async function (recipeId: string, userId: string) {
    try {
      let recipe = await Recipe.findById(recipeId).populate("categories");
      if (!recipe) {
        throw new NotFoundError("Recipe not found.");
      } else {
        const userIdAsObjId = new Types.ObjectId(userId);
        if (!recipe.likeCounter.includes(userIdAsObjId)) {
          recipe.likeCounter.push(userIdAsObjId);
        } else {
          recipe.likeCounter.splice(
            recipe.likeCounter.indexOf(userIdAsObjId),
            1
          );
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

function uploadImages(images: UploadedFile | UploadedFile[]): string[] {
  let imageUrls: string[] = [];
  if (Array.isArray(images)) {
    for (const image of images) {
      image.name = `${Date.now()}-${image.name}`;
      image.mv(`${picturePath}${image.name}`, (err: any) => {
        if (err) throw err;
      });
      imageUrls.push(image.name);
    }
  } else {
    images.name = `${Date.now()}-${images.name}`;
    images.mv(`${picturePath}${images.name}`, (err: any) => {
      if (err) throw err;
    });
    imageUrls.push(images.name);
  }
  return imageUrls;
}

function queryBuilder(orderBy: string, filter: string[], time: number) {
  let query: FilterQuery<IRecipe> = {};
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
