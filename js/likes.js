// import { supabaseApi } from "../js/auth.js";

// // ✅ Add like
// export async function addLike(postId, userId) {
//   const { error } = await supabaseApi
//     .from("Likes")
//     .insert([{ post_id: postId, user_id: userId }]);
//   if (error) {
//     console.error("Add Like Error:", error);
//     return false;
//   }
//   return true;
// }

// // ✅ Remove like
// export async function removeLike(postId, userId) {
//   const { error } = await supabaseApi
//     .from("Likes")
//     .delete()
//     .eq("post_id", postId)
//     .eq("user_id", userId);
//   if (error) {
//     console.error("Remove Like Error:", error);
//     return false;
//   }
//   return true;
// }

// // ✅ Check if already liked
// export async function hasLiked(postId, userId) {
//   const { data, error } = await supabaseApi
//     .from("Likes")
//     .select("*")
//     .eq("post_id", postId)
//     .eq("user_id", userId)
//     .maybeSingle();

//   if (error) {
//     console.error("HasLiked Error:", error);
//     return false;
//   }
//   return !!data;
// }

// // ✅ Get like count
// export async function getLikesCount(postId) {
//   const { count, error } = await supabaseApi
//     .from("Likes")
//     .select("*", { count: "exact", head: true })
//     .eq("post_id", postId);

//   if (error) {
//     console.error("GetLikesCount Error:", error);
//     return 0;
//   }
//   return count;
// }

// export async function getCurrentUserId() {
//   const { data: { user }, error } = await supabaseApi.auth.getUser();
//   if (error) {
//     console.error("Error getting user:", error);
//     return null;
//   }
//   return user.id; // ye tumhare toggleLike me use hoga
// }
// // likes.js
// export async function toggleLike(button, postId) {

//       const userId = await getCurrentUserId(); // database se directly

//       console.log("toggleLike called for postId:", postId, "userId:", userId);

//   const icon = button.querySelector(".like-icon");
//   const likesCountElem = button.querySelector(".likes-count");

//   const liked = icon.classList.contains("liked");

//   if (liked) {
//     const success = await removeLike(postId, userId);
//     if (success) {
//       icon.classList.remove("liked");
//       icon.classList.replace("fa-solid", "fa-regular");
//       if (likesCountElem)
//         likesCountElem.textContent = parseInt(likesCountElem.textContent) - 1;
//     }
//   } else {
//     const success = await addLike(postId, userId);
//     if (success) {
//       icon.classList.add("liked");
//       icon.classList.replace("fa-regular", "fa-solid");
//       if (likesCountElem)
//         likesCountElem.textContent = parseInt(likesCountElem.textContent) + 1;
//     }
//   }
// }


