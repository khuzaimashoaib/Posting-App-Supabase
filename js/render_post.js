import { toggleDropdown } from "../utils/dropdown.js";
import { deletePost, updatePost } from "../js/database.js";
import { editPost } from "../js/edit_post.js";
import { toggleLike } from "./likes_ui.js";
import { getLikeStatus } from "./likes.js";
import { showToast } from "../utils/toast.js";

window.toggleDropdown = toggleDropdown;
window.deletePost = deletePost;
window.editPost = editPost;
window.toggleLike = toggleLike;

function formatDateTime(dateString) {
  const date = new Date(dateString);

  // Date parts
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month 0-indexed
  const year = date.getFullYear();

  // Time parts
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 ko 12 bana do

  return `${day}-${month}-${year} • ${hours}:${minutes} ${ampm}`;
}

function getCurrentUserFromStorage() {
  try {
    const sessionData = localStorage.getItem(
      "sb-agdpbinmknsodzissmlj-auth-token"
    );
    if (sessionData) {
      const session = JSON.parse(sessionData);
      return session.user;
    }
  } catch (error) {
    console.error("Error getting user from storage:", error);
  }
  return null;
}

export async function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  if (!container) return;
  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.style.display = "none";
    return;
  }
  container.style.display = "block";

  const currentUser = getCurrentUserFromStorage();
  const currentUserEmail = currentUser?.email;
  const currentUserId = currentUser?.id;

  // ✅ Ek sath sab posts ke like status fetch karo
  const likePromises = posts.map((post) =>
    getLikeStatus(post.id, currentUserId)
  );
  const likeStatuses = await Promise.all(likePromises);

  posts.forEach((post, index) => {
    const { hasLiked, likesCount } = likeStatuses[index];
    const comments = post.comments || [];

    const isPostOwner = post.email === currentUserEmail;

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
        <small>${formatDateTime(post.created_at)}</small>
      </div>
    </div>



    
    <div class="dropdown-container">

    ${
      isPostOwner
        ? `<button onclick="toggleDropdown(this)" class="edit-btn">
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </button>
  <div class="dropdown-menu">
    <button onclick="editPost(${JSON.stringify(post)
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;")})">Edit</button>
    <div class="dropdown-divider"></div>
    <button class="delete-post-btn" data-id='${post.id}'>Delete</button>
    </div>
    </div>`
        : ""
    } 
  
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
  <i class="fa-${hasLiked ? "solid" : "regular"} fa-heart like-icon ${
      hasLiked ? "liked" : ""
    }"></i>
  Like <span class="likes-count" data-count="${likesCount}">(${likesCount})</span>
</button>


  <button ><i class="fa-solid fa-comment comment-icon"></i>Comment</button>
    
  </div>
  </div>
    `;

    container.appendChild(postDiv);

    document.querySelectorAll(".delete-post-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id; // string or UUID
        const success = await deletePost(id);

        if (success) {
          showToast("Post deleted successfully!", 1500);
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    });
  });
}
