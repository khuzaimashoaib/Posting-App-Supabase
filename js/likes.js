import { supabaseApi } from "../js/auth.js";


// ✅ Get current user ID
export async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabaseApi.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return user.id;
}

// ✅ Get like status and count
export async function getLikeStatus(postId, userId) {
  if (!userId) {
    return { hasLiked: false, likesCount: 0 };
  }
  const { data: likes, error } = await supabaseApi
    .from("Likes")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("GetLikeStatus Error:", error);
    return { hasLiked: false, likesCount: 0 };
  }

  const hasLiked = likes.some((like) => like.user_id === userId);
  const likesCount = likes.length || 0;

  console.log(`Post ${postId}: hasLiked=${hasLiked}, likesCount=${likesCount}`); // Debug ke liye

  return { hasLiked, likesCount };
}

// ✅ Add like
export async function addLike(postId, userId) {
  const { error } = await supabaseApi
    .from("Likes")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    console.error("Add Like Error:", error);
    return false;
  }
  return true;
}

// ✅ Remove like
export async function removeLike(postId, userId) {
  const { error } = await supabaseApi
    .from("Likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    console.error("Remove Like Error:", error);
    return false;
  }
  return true;
}
