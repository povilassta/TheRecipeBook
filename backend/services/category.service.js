import Category from "../models/category.model.js";

const CategoryService = {
  getForRecipes: async () => {
    try {
      const categories = await Category.find({});
      //   const categories = await Recipe.aggregate([
      //     {
      //       $unwind: "$categories",
      //     },
      //     {
      //       $lookup: {
      //         from: "categories",
      //         as: "categoriesFlat",
      //         let: {
      //           categoryObjectId: {
      //             $toObjectId: "$categories",
      //           },
      //         },
      //         pipeline: [
      //           {
      //             $match: {
      //               $expr: {
      //                 $eq: ["$$categoryObjectId", "$_id"],
      //               },
      //             },
      //           },
      //         ],
      //       },
      //     },
      //     {
      //       $group: {
      //         _id: null,
      //         categories: {
      //           $push: {
      //             _id: {
      //               $first: "$categoriesFlat._id",
      //             },
      //             name: {
      //               $first: "$categoriesFlat.name",
      //             },
      //           },
      //         },
      //       },
      //     },
      //     {
      //       $project: {
      //         _id: 0,
      //       },
      //     },
      //   ]);
      return categories;
    } catch (errors) {
      throw errors;
    }
  },
};

export default CategoryService;
