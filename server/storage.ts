import type { User, InsertUser } from "@shared/schema";

export interface IStorage {
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();

  async getUserByUsername(username: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return null;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      ...insertUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }
}

// Use Supabase storage if environment variables are available, otherwise use memory storage
const useSupabase = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;
export const storage = useSupabase ? new SupabaseStorage() : new MemStorage();
