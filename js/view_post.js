import { fetchPost } from "./database.js";
import { renderPosts } from "./render_post.js";


async function loadPosts(isPrivate) {
  const data = await fetchPost(isPrivate);
  if (!data) {
    console.error("Error loading posts or no posts found");
    return;
  }

  renderPosts(data);
}

// Query param se decide karo private ya public
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type"); // "private" or "public"
  loadPosts(type === "private");
});
