import { getUserSession, signOutUser } from "./auth.js";
import { addPost, fetchPost } from "./database.js";
import { showToast } from "../utils/toast.js";
import { createPost } from "./create_post.js";
// import { closeEditModal } from "../js/edit_post.js";

// let posts = [];
// let currentEditingPostId = null;

const basePath = window.location.hostname.includes("github.io")
  ? "/Posting-App-Supabase"
  : "";
  
const getSession = async () => {
  const { session } = await getUserSession();
  if (!session) {
    window.location.href = `${basePath}/html/login.html`;
  }
  const user = session.user;

  const username = user.user_metadata.display_name;
  const usernameInput = document.getElementById("username");
  if (usernameInput) {
    usernameInput.value = username;
    usernameInput.disabled = true;
  }
};

getSession();

document.getElementById("logobtn").addEventListener("click", async () => {
  window.location.href = `${basePath}/index.html`;
});

document.getElementById("logoutbtn").addEventListener("click", async () => {
  await signOutUser();
  window.location.href = `${basePath}/html/login.html`;
});
const postBtn = document.getElementById("postBtn");
if (postBtn) {
  postBtn.addEventListener("click", createPost);
}

const publicBtn = document.getElementById("publicBtn");
const privateBtn = document.getElementById("privateBtn");

if (publicBtn && privateBtn) {
  publicBtn.addEventListener("click", () => {
    window.location.href = `${basePath}/html/post.html?type=public`;
  });
  privateBtn.addEventListener("click", () => {
    window.location.href = `${basePath}/html/post.html?type=private`;
  });
}

// function toggleLike(btn, id) {
//   const likeIcon = btn.querySelector(".like-icon");

//   likeIcon.classList.toggle("fa-regular");
//   likeIcon.classList.toggle("fa-solid");
//   likeIcon.classList.toggle("liked");

//   const post = posts.find((p) => p.id == id);
//   if (post) {
//     post.liked = !post.liked;
//   }
// }

// function toggleCommentBox(id) {
//   const post = posts.find((p) => p.id === id);
//   if (!post) return;
//   const box = document.getElementById(`comment-${id}`);
//   if (post.comments.length > 0) {
//     return;
//   }

//   box.style.display = box.style.display === "none" ? "flex" : "none";
// }

// function addComment(id) {
//   const input = document.getElementById(`comment-input-${id}`);
//   const comment = input.value.trim();
//   if (comment) {
//     const post = posts.find((p) => p.id === id);
//     post.comments.push(comment);
//     renderPosts();
//   }
// }
