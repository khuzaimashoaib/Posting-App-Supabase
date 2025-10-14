import { supabaseApi } from "./auth.js";

export async function fetchPost(isPrivate) {
  let { data, error } = await supabaseApi
    .from("Posts")
    .select("*")
    .eq("is_private", isPrivate)
    .order("id", { ascending: false });
  if (error) {
    console.error("Fetch error:", error);
    return;
  }
  console.log(data);

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

export async function updatePost(id, first_name, last_name, number, email) {
  let { data, error } = await supabaseApi
    .from("Posts")
    .update(updateData)
    .eq("id", id);

  if (error) console.error("Update error:", error);
  return data;
}

export async function deletePost(id) {
  let { error } = await supabaseApi.from("Posts").delete().eq("id", id);

  if (error) console.error("Delete error:", error);
}
