import express from "express";

const userRouter = express.Router();

// GET (all)
userRouter.get("", (req, res) => {
  res.send("Should return users.");
});

// GET (one)
userRouter.get("/:id", (req, res) => {
  res.send("Should return a user.");
});

// POST
userRouter.post("", (req, res) => {
  res.send("Should post a user.");
});

// PUT
userRouter.put("/:id", (req, res) => {
  res.send("Should update a user.");
});

// DELETE
userRouter.delete("/:id", (req, res) => {
  res.send("Should delete a user.");
});

export default userRouter;
