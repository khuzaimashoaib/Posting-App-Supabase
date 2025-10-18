import {
  getLikeStatus,
  addLike,
  removeLike,
  getCurrentUserId,
} from "./likes.js";

// ✅ Simple toggle like function
export async function toggleLike(button, postId) {
  const userId = await getCurrentUserId();

  const icon = button.querySelector(".like-icon");
  const likesCountElem = button.querySelector(".likes-count");
  const isCurrentlyLiked = icon.classList.contains("liked");

  try {
    if (isCurrentlyLiked) {
      // Remove like
      const success = await removeLike(postId, userId);
      if (success) {
        icon.classList.remove("liked");
        icon.classList.replace("fa-solid", "fa-regular");
        if (likesCountElem) {
          const currentCount = parseInt(likesCountElem.dataset.count) || 0;
          const newCount = currentCount - 1;

          // ✅ DONO KO UPDATE KARO
          likesCountElem.dataset.count = newCount;
          likesCountElem.textContent = `(${newCount})`;
        }
      }
    } else {
      // Add like
      const success = await addLike(postId, userId);
      if (success) {
        icon.classList.add("liked");
        icon.classList.replace("fa-regular", "fa-solid");
        if (likesCountElem) {
          const currentCount = parseInt(likesCountElem.dataset.count) || 0;
          const newCount = currentCount + 1;

          // ✅ DONO KO UPDATE KARO
          likesCountElem.dataset.count = newCount;
          likesCountElem.textContent = `(${newCount})`;
        }
      }
    }
  } catch (error) {
    console.error("Toggle like error:", error);
  }
}

// ✅ Initialize likes on page load
export async function initializeAllLikes() {
  const likeButtons = document.querySelectorAll(".like-btn");
  const userId = await getCurrentUserId();

  if (!userId) return;

  for (const button of likeButtons) {
    const postId = button.closest(".post").dataset.postId;
    const { hasLiked, likesCount } = await getLikeStatus(postId, userId);

    const icon = button.querySelector(".like-icon");
    const countElem = button.querySelector(".likes-count");

    // Set initial state
    if (hasLiked) {
      icon.classList.add("liked");
      icon.classList.replace("fa-regular", "fa-solid");
    }

    if (countElem) {
          countElem.dataset.count = likesCount;
      countElem.textContent = `(${likesCount})`;
    }
  }
}
