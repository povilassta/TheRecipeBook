declare global {
  namespace Express {
    interface Request {
      recipeId?: string;
    }
    interface User {
      _id: string;
    }
  }
}

export {};
