import { updatePost } from "../js/database.js";
import { showToast } from "../utils/toast.js";

let currentEditingPostId = null;
let currentEditingPost = null;

export function editPost(post) {
  console.log("Edit button clicked for:", post);
  currentEditingPostId = post.id;
  console.log("Post ID:", post?.id);

  currentEditingPost = post;
  document.getElementById("editDescInput").value = post.description;
  document.getElementById("editModal").style.display = "flex";
}

export function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

export async function saveEdit() {
  const newDesc = document.getElementById("editDescInput").value;

  if (!newDesc || newDesc.trim() === "") {
    showToast("Post cannot be empty!");
    return;
  }
  const updated = await updatePost(
    currentEditingPostId,
    currentEditingPost.name,
    newDesc,
    currentEditingPost.email,
    currentEditingPost.image_url,
    currentEditingPost.is_private
  );

  if (updated) {
  showToast("Post updated successfully!");
  closeEditModal();
  setTimeout(() => {
    window.location.reload();
  }, 1200);
}
}

const closeModalBtn = document.getElementById("cancelEditBtn");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeEditModal);
}

const saveModalBtn = document.getElementById("saveEditBtn");
if (saveModalBtn) {
  saveModalBtn.addEventListener("click", saveEdit);
}
