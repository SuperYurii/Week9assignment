// All Server actions here
"use server";
import { redirect } from "next/navigation";
import db from "@/app/utils/db";
import { revalidatePath } from "next/cache";

export const createuser = async (formData) => {
  const id = formData.get("clerk_id");
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const username = formData.get("username");
  const bio = formData.get("bio");

  await db.query(
    `INSERT INTO users (clerk_id,first_name, last_name, username, bio) VALUES ($1, $2, $3, $4, $5)`,
    [id, firstName, lastName, username, bio]
  );
  revalidatePath(`/user-profile/${username}`);
  redirect(`/user-profile/${username}`);
};
