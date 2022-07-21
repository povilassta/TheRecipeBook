import NotFoundError from "../errors/notfound.error";
import Recipe from "../models/recipe.model";
import { unlink } from "node:fs";
import ForbiddenError from "../errors/forbidden.error";
import { FilterQuery, SortOrder, Types } from "mongoose";
import { UploadedFile } from "express-fileupload";
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

class RecipeService {
  private static instance: RecipeService;

  private constructor() {}

  public static getInstance(): RecipeService {
    if (!RecipeService.instance) {
      RecipeService.instance = new RecipeService();
    }
    return RecipeService.instance;
  }

  private picturePath = "../backend/public/images/recipes/";

  public async getMultiple(
    pageNum: number,
    orderBy: string,
    filter: string[],
    time: number
  ) {
    const perPage = 20;
    const { query, orderQuery } = this.queryBuilder(orderBy, filter, time);
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
  }

  public async get(recipeId: string) {
    try {
      const recipe = await Recipe.findById(recipeId).populate("categories");
      if (!recipe) {
        throw new NotFoundError("Recipe not found.");
      }
      return recipe;
    } catch (errors) {
      throw errors;
    }
  }

  public addRecipeIdParam(req: Express.Request) {
    req.recipeId = req.params.recipeId;
  }

  public async post(
    images: UploadedFile | UploadedFile[] | undefined,
    data: RecipeData,
    userId: string
  ) {
    try {
      if (images) {
        data.imageUrls = this.uploadImages(images);
      } else {
        throw new ConflictError("No images provided.");
      }

      const recipe = await Recipe.create({ ...data, userId });
      return recipe;
    } catch (errors) {
      throw errors;
    }
  }

  public async put(
    data: RecipeData,
    userId: string,
    recipeId: string,
    markedForDeletion: string[],
    images: UploadedFile | UploadedFile[] | undefined
  ) {
    try {
      // Upload the files
      if (images) {
        data.imageUrls = data.imageUrls.concat(this.uploadImages(images));
      }

      const recipe = await Recipe.findOneAndUpdate(
        { _id: recipeId, userId },
        data
      );
      // Delete marked for deletion
      if (recipe) {
        for (const img of markedForDeletion) {
          if (recipe.imageUrls.includes(img)) {
            unlink(`${this.picturePath}${img}`, (err) => {
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
  }

  public async delete(recipeId: string, userId: string) {
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
          unlink(`${this.picturePath}${img}`, (err) => {
            if (err) throw err;
          });
        }
        return recipe;
      }
    } catch (errors) {
      throw errors;
    }
  }

  public async like(recipeId: string, userId: string) {
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
  }

  private uploadImages(images: UploadedFile | UploadedFile[]): string[] {
    let imageUrls: string[] = [];
    if (Array.isArray(images)) {
      for (const image of images) {
        image.name = `${Date.now()}-${image.name}`;
        image.mv(`${this.picturePath}${image.name}`, (err: any) => {
          if (err) throw err;
        });
        imageUrls.push(image.name);
      }
    } else {
      images.name = `${Date.now()}-${images.name}`;
      images.mv(`${this.picturePath}${images.name}`, (err: any) => {
        if (err) throw err;
      });
      imageUrls.push(images.name);
    }
    return imageUrls;
  }

  private queryBuilder(orderBy: string, filter: string[], time: number) {
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
}

export default RecipeService;
