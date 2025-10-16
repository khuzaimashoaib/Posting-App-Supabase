import { getUserSession } from "./auth.js";
import { addPost } from "./database.js";
import { showToast } from "../utils/toast.js";

let selectedBackground = "";


export function selectBg(element, path) {
  document
    .querySelectorAll(".bg-options img, .bg-options .cancel-icon")
    .forEach((img) => img.classList.remove("selected"));
  element.classList.add("selected");
  selectedBackground = path;
}

export async function createPost() {
  const description = document.getElementById("description").value.trim();
  const isPrivate = document.getElementById("privatePost").checked;
  const image_url = selectedBackground; // tumhara selected background variable
  const { session } = await getUserSession();

  if (!description) {
    showToast("Please write something to post.");
    return;
  }

  if (!session || !session.user) {
    showToast("User session not found!");
    return;
  }

  const name = session.user.user_metadata.display_name || "Anonymous";
  const email = session.user.email;

  const { data, error } = await addPost(name, description, email,  image_url,isPrivate);

  if (error) {
    showToast("Error while posting. Try again!");
    console.error("Post insert error:", error);
    return;
  }

  showToast("Your post has been shared successfully!");
  document.getElementById("description").value = "";
  document.getElementById("privatePost").checked = false;

  // reset selected background
  selectedBackground = "";
  document
    .querySelectorAll(".bg-options img, .bg-options .cancel-icon")
    .forEach((img) => img.classList.remove("selected"));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bg-options img, .bg-options .cancel-icon").forEach((el) => {
    el.addEventListener("click", () => {
      selectBg(el, el.dataset.path || null);
    });
  });
});
