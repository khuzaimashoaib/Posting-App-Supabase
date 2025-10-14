import { getUserSession, signOutUser } from "./auth.js";
import { addPost, fetchPost } from "./database.js";
import { showToast } from "../utils/toast.js";
import { createPost } from "./create_post.js";

let posts = [];
let currentEditingPostId = null;

const getSession = async () => {
  const { session } = await getUserSession();
  if (!session) {
    window.location.href = "./html/login.html";
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
// fetchPost();

document.getElementById("logobtn").addEventListener("click", async () => {
  window.location.href = "../index.html";
});

document.getElementById("logoutbtn").addEventListener("click", async () => {
  await signOutUser();
  window.location.href = "../html/login.html";
});
const postBtn = document.getElementById("postBtn");
if (postBtn) {
  postBtn.addEventListener("click", createPost);
}

const publicBtn = document.getElementById("publicBtn");
const privateBtn = document.getElementById("privateBtn");

if (publicBtn && privateBtn) {
  publicBtn.addEventListener("click", () => {
    window.location.href = "./html/post.html?type=public";
  });
  privateBtn.addEventListener("click", () => {
    window.location.href = "./html/post.html?type=private";
  });
}

// function renderPosts() {
//   const container = document.getElementById("postsContainer");
//   container.innerHTML = "";

//   if (posts.length === 0) {
//     container.style.display = "none";
//     return;
//   }
//   container.style.display = "block";

//   posts.forEach((post) => {
//     const postDiv = document.createElement("div");
//     postDiv.className = "post";
//     const bgStyle = post.bgURL
//       ? `background-image: url('${post.bgURL}'); color: white; background-size: cover;`
//       : `background-color: #f7f7f7; color: black;`;
//     const descStyle = post.bgURL ? "background: rgba(0,0,0,0.4);" : "";

//     postDiv.innerHTML = `
// <div class="posts">
//   <div class="post-header">
//     <div class="user-info">
//       <img src="images/profile.png" alt="profile" class="profile-img" />
//       <div>
//         <h3>${post.username}</h3>
//         <small>${post.timestamp}</small>
//       </div>
//     </div>
// <div class="dropdown-container">
//   <button onclick="toggleDropdown(this)" class="edit-btn">
//     <i class="fa-solid fa-ellipsis-vertical"></i>
//   </button>
//   <div class="dropdown-menu">
//     <button onclick="editPost(${post.id})">Edit</button>
//         <div class="dropdown-divider"></div>

//     <button onclick="deletePost(${post.id})">Delete</button>
//   </div>
// </div>
//   </div>


//   <!-- Middle: Background image + Description -->
// <div class="post-body">
//   <div class="bg-image" style="${bgStyle}"> 
//     <div class="post-desc" style="${descStyle}" >
//       <p>${post.description}</p>
//     </div>
//   </div>
// </div>


//   <!-- Bottom: Like & Comment buttons -->
//   <div class="post-footer">
//   <button onclick="toggleLike(this, '${post.id}')"> 
//     <i class="fa-${post.liked ? "solid" : "regular"} fa-heart like-icon ${
//       post.liked ? "liked" : ""
//     }"></i>Like

// </button>
//   <button onclick="toggleCommentBox(${
//     post.id
//   })"><i class="fa-solid fa-comment comment-icon"></i>Comment</button>
    
//   </div>

//   <!-- Comment Section -->
//   <div class="comment-box" id="comment-${post.id}" style="display: ${
//       post.comments.length > 0 ? "flex" : "none"
//     };">
//     <input type="text" id="comment-input-${
//       post.id
//     }" placeholder="Write a comment..." />
//     <button onclick="addComment(${
//       post.id
//     })"><i class="fa-solid fa-paper-plane"></i></button>
//     <ul id="comments-list-${post.id}">
//       ${post.comments
//         .map(
//           (c) => ` <li class="comment-item">
//           <img src="./images/profile.png" alt="Profile" class="comment-profile" />
//           <div class="comment-content">
//             <strong>${post.username}</strong>
//             <p>${c}</p>
//           </div>
//         </li>`
//         )
//         .join("")}
//     </ul>
//   </div>
// </div>

//     `;

//     container.appendChild(postDiv);
//   });
// }

function toggleLike(btn, id) {
  const likeIcon = btn.querySelector(".like-icon");

  likeIcon.classList.toggle("fa-regular");
  likeIcon.classList.toggle("fa-solid");
  likeIcon.classList.toggle("liked");

  const post = posts.find((p) => p.id == id);
  if (post) {
    post.liked = !post.liked;
  }
}

function toggleCommentBox(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  const box = document.getElementById(`comment-${id}`);
  if (post.comments.length > 0) {
    return;
  }

  box.style.display = box.style.display === "none" ? "flex" : "none";
}

function addComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  const comment = input.value.trim();
  if (comment) {
    const post = posts.find((p) => p.id === id);
    post.comments.push(comment);
    renderPosts();
  }
}
function toggleDropdown(button) {
  const menu = button.nextElementSibling;
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function editPost(id) {
  const post = posts.find((p) => p.id === id);
  currentEditingPostId = id;
  document.getElementById("editDescInput").value = post.description;
  document.getElementById("editModal").style.display = "flex";
}

function deletePost(id) {
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    renderPosts();
    showToast("Post deleted successfully!");
  }
}
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
  currentEditingPostId = null;
}
function saveEdit() {
  const newDesc = document.getElementById("editDescInput").value;
  const post = posts.find((p) => p.id === currentEditingPostId);

  if (newDesc === "") {
    showToast("Post cannot be empty!");
    return;
  }

  post.description = newDesc;
  closeEditModal();
  renderPosts();
  showToast("Post edited successfully!");
}

// function showToast(message) {
//   const toast = document.getElementById("toast");
//   toast.innerText = message;
//   toast.className = "toast show";

//   setTimeout(() => {
//     toast.className = "toast";
//   }, 3000);
// }
