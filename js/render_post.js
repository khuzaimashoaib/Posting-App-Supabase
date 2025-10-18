import { toggleDropdown } from "../utils/dropdown.js";
import { deletePost,updatePost } from "../js/database.js";
import { editPost } from "../js/edit_post.js";
import { toggleLike } from "./likes_ui.js";
import { getLikeStatus, getCurrentUserId } from "./likes.js"; 




window.toggleDropdown = toggleDropdown;
window.deletePost = deletePost;
window.editPost = editPost;
window.toggleLike = toggleLike;

export async function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  if (!container) return;
  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.style.display = "none";
    return;
  }
  container.style.display = "block";

  const userId = await getCurrentUserId();
  
  // ✅ Ek sath sab posts ke like status fetch karo
  const likePromises = posts.map(post => getLikeStatus(post.id, userId));
  const likeStatuses = await Promise.all(likePromises);

  posts.forEach((post, index) => {
    const { hasLiked, likesCount } = likeStatuses[index];
    const comments = post.comments || [];

    const postDiv = document.createElement("div");
    postDiv.className = "post";
    const bgStyle = post.image_url
      ? `background-image: url('../${post.image_url}'); color: white; background-size: cover;`
      : `background-color: #f7f7f7; color: black;`;
    const descStyle = post.image_url ? "background: rgba(0,0,0,0.4);" : "";

    postDiv.innerHTML = `
<div class="posts">
  <div class="post-header">
    <div class="user-info">
      <img src="../images/profile.png" alt="profile" class="profile-img" />
      <div>
        <h3>${post.name}</h3>
        <small>${post.created_at}</small>
      </div>
    </div>
<div class="dropdown-container">
  <button onclick="toggleDropdown(this)" class="edit-btn">
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </button>
  <div class="dropdown-menu">
    <button onclick="editPost(${JSON.stringify(post).replace(/'/g, "\\'").replace(/"/g, '&quot;')})">Edit</button>
        <div class="dropdown-divider"></div>

    <button onclick="deletePost(${post.id})">Delete</button>
  </div>
</div>
  </div>


  <!-- Middle: Background image + Description -->
<div class="post-body">
  <div class="bg-image" style="${bgStyle}"> 
    <div class="post-desc" style="${descStyle}" >
      <p>${post.description}</p>
    </div>
  </div>
</div>


  <!-- Bottom: Like & Comment buttons -->

  <div class="post-footer">
  <button onclick="toggleLike(this, '${post.id}')">
  <i class="fa-${hasLiked ? "solid" : "regular"} fa-heart like-icon ${hasLiked ? "liked" : ""}"></i>
  Like <span class="likes-count" data-count="${likesCount}">(${likesCount})</span>
</button>


  <button ><i class="fa-solid fa-comment comment-icon"></i>Comment</button>
    
  </div>

  <!-- Comment Section 
  <div class="comment-box" id="comment-${post.id}" style="display: ${
      comments.length > 0 ? "flex" : "none"
    };">
    <input type="text" id="comment-input-${
      post.id
    }" placeholder="Write a comment..." />
    <button onclick="addComment(${
      post.id
    })"><i class="fa-solid fa-paper-plane"></i></button>
    <ul id="comments-list-${post.id}">
      ${comments
        .map(
          (c) => ` <li class="comment-item">
          <img src="./images/profile.png" alt="Profile" class="comment-profile" />
          <div class="comment-content">
            <strong>${post.username}</strong>
            <p>${c}</p>
          </div>
        </li>`
        )
        .join("")}
    </ul>
  </div>-->
</div>
    `;

    container.appendChild(postDiv);
  });
}