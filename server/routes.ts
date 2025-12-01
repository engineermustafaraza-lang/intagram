import type { Express } from "express";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username } = req.body;
      
      if (!username || typeof username !== "string") {
        return res.status(400).json({ error: "Username is required" });
      }

      let user = await storage.getUserByUsername(username.trim());

      if (!user) {
        const randomLikes = Math.floor(Math.random() * 10000) + 1000;
        const randomFollowers = Math.floor(Math.random() * 5000) + 500;

        const validatedData = insertUserSchema.parse({
          username: username.trim(),
          email: `${username.trim()}@example.com`,
          followersCount: randomFollowers,
          likesCount: randomLikes,
        });

        user = await storage.createUser(validatedData);
      }

      return res.json(user);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}
