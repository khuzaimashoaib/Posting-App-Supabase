import { supabaseApi } from "../js/auth.js";
import { showToast } from "../utils/toast.js";

export async function fetchPost(isPrivate) {
  const {
    data: { user },
  } = await supabaseApi.auth.getUser();

  let query = supabaseApi
    .from("Posts")
    .select("*")
    .eq("is_private", isPrivate)
    .order("id", { ascending: false });

  if (isPrivate && user?.email) {
    query = query.eq("email", user.email);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
    return;
  }

  return data;
}

export async function addPost(name, description, email, image_url, is_private) {
  const { data, error } = await supabaseApi
    .from("Posts")
    .insert([{ name, description, email, image_url, is_private }]);

  if (error) {
    console.error("Insert error:", error);
    return { error };
  }

  return { data };
}

export async function updatePost(
  id,
  name,
  description,
  email,
  image_url,
  is_private
) {
  const updateData = { name, description, email, image_url, is_private };
  const { data, error } = await supabaseApi
    .from("Posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    showToast("Failed to update post!");
    return null;
  }
  return true;
}

export async function deletePost(id) {
  let { error } = await supabaseApi.from("Posts").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    showToast("Failed to delete post!", 3000);
    return false;
  }
  

  return true;}
