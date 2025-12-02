import type { User, InsertUser } from "@shared/schema";
import { supabase } from "./supabase";

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

export class SupabaseStorage implements IStorage {
  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        username: data.username,
        email: data.email,
        followersCount: data.followers_count,
        likesCount: data.likes_count,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      return null;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          username: insertUser.username,
          email: insertUser.email,
          followers_count: insertUser.followersCount,
          likes_count: insertUser.likesCount,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        throw new Error(`Failed to create user: ${error.message}`);
      }

      return {
        id: data.id,
        username: data.username,
        email: data.email,
        followersCount: data.followers_count,
        likesCount: data.likes_count,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }
}

// Use Supabase storage if environment variables are available, otherwise use memory storage
const useSupabase = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;
console.log('Using storage:', useSupabase ? 'Supabase' : 'Memory');

export const storage = useSupabase ? new SupabaseStorage() : new MemStorage();