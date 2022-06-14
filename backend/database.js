import bcrypt from "bcrypt";

const db = {
  // Users
  users: [
    {
      id: 1,
      username: "janedoe39",
      email: "test@test.com",
      password: bcrypt.hashSync("test", 10),
      profilePicture: "http://localhost:3000/images/users/1.jpg",
    },
  ],

  getUserByEmail: (email) => db.users.find((user) => user.email === email),

  // Recipes
  recipes: [
    {
      id: 1,
      title: "Creamy Chicken and Rice Skillet",
      tags: ["chicken", "healthy", "fast"],
      likeCounter: 103,
      timeMinutes: 50,
      ingridients: [
        "1 yellow onion",
        "2 Tbsp butter",
        "1 boneless, skinless chicken breast",
        "1 cup long grain white rice",
        "1/2 tsp dried thyme",
        "1/4 tsp dried sage",
        "1/4 tsp salt",
        "freshly cracked pepper",
        "3 cups chicken broth",
        "1/2 lb. frozen peas and carrots",
        "1.3 cup heavy cream",
        "4 oz. cheddar, shredded",
      ],
      instructions: [
        "Dice the onion and add it to an oven safe deep skillet (3 qt. capacity) along with the butter. Sauté over medium heat until the onions are soft and translucent.",
        "While the onions are cooking, dice the chicken breast into small, 1/2-inch pieces. Add the chicken to the skillet and continue to sauté for about 3 minutes more, or just until the outside of the chicken pieces have turned opaque (the chicken will finish cooking through as it simmers with the rice).",
        "Add the rice, thyme, sage, salt, some freshly cracked pepper (about ten cranks of a pepper mill), and the chicken broth to the skillet and stir to combine.",
        "Place a lid on the skillet, turn the heat up to medium-high, and allow the broth to come to a boil. Once it reaches a full boil, turn the heat down to low and let the skillet simmer for 15 minutes, stirring occasionally, replacing the lid each time. Cooking the rice in an excess of broth and stirring occasionally as it cooks will produce a saucy rice mixture.",
        "After 15 minutes, the rice should be tender and saucy (if not yet tender, let it continue to cook for 5 more minutes). Stir in the frozen vegetables (no need to thaw), replace the lid, and let it sit over medium-low heat for another 5 minutes to heat the vegetables through. Finally, add the heavy cream, stir to combine, taste, and add extra salt if needed (this will depend on the salt content of the broth you used).",
        "Turn on the oven's broiler, top the skillet with the shredded cheese, and place the skillet in the oven under the broiler for a few minutes to melt the cheese. Serve hot.",
      ],
      image: "http://localhost:3000/images/recipes/1.jpg",
    },
  ],
};

export default db;
