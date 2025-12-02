import type { User, InsertUser } from "@shared/schema";
import { supabase } from "./supabase";

export interface IStorage {
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
}

export class SupabaseStorage implements IStorage {
  async getUserByUsername(username: string): Promise<User | null> {
    console.log("Fetching user by username:", username);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error(
        "Error fetching user:",
        error.message,
        error.code,
        error.details,
      );
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    if (!data) {
      console.log("User not found:", username);
      return null;
    }

    console.log("User found:", data.username);
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      followersCount: data.followers_count,
      likesCount: data.likes_count,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    console.log("Creating user:", insertUser.username);

    const { data, error } = await supabase
      .from("users")
      .insert({
        username: insertUser.username,
        email: insertUser.email,
        followers_count: insertUser.followersCount,
        likes_count: insertUser.likesCount,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Error creating user:",
        error.message,
        error.code,
        error.details,
      );
      throw new Error(`Failed to create user: ${error.message}`);
    }

    console.log("User created successfully:", data.username);
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      followersCount: data.followers_count,
      likesCount: data.likes_count,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}

// auto choose storage
const useSupabase =
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Using storage:", useSupabase ? "Supabase" : "Memory");

export const storage = new SupabaseStorage();
