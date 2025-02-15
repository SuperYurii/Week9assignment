// All Server actions here
"use server";
import { redirect } from "next/navigation";
import db from "./db";
import { revalidatePath } from "next/cache";

export const createuser = async (formData) => {
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const username = formData.get("username");
  const bio = formData.get("bio");
  const id = formData.get("clerk_id");

  await db.query(
    `INSERT INTO users (first_name, last_name, username, bio,clerk_id) VALUES ($1, $2, $3, $4, $5)`,
    [firstName, lastName, username, bio, id]
  );
  revalidatePath(`/user-profile/${username}`);
  redirect(`/user-profile/${username}`);
};
