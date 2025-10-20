import { getUserSession, signOutUser } from "./auth.js";
import { addPost, fetchPost } from "./database.js";
import { showToast } from "../utils/toast.js";
import { createPost } from "./create_post.js";
import { initializeAllLikes } from "./likes_ui.js";
import { getCurrentUserId } from "./likes.js";

const basePath = window.location.hostname.includes("github.io")
  ? "/Posting-App-Supabase"
  : "";

const logoutBtnHeader = document.getElementById("logoutbtn");
const logoutBtnOffcanvas = document.getElementById("logoutBtnOffcanvas");

const handleLogout = async () => {
  await signOutUser();
  window.location.href = `${basePath}/html/login.html`;
};

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
const initializeApp = async () => {
  await getSession(); // Pehle session check

  try {
    const userId = await getCurrentUserId();

    if (userId) {
      await initializeAllLikes(); // Likes initialize
    } else {
      window.location.href = `${basePath}/html/login.html`;
    }
  } catch (error) {
    console.error("Likes initialization error:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);

document.getElementById("logobtn").addEventListener("click", async () => {
  window.location.href = `${basePath}/index.html`;
});

[logoutBtnHeader, logoutBtnOffcanvas].forEach((btn) =>
  btn?.addEventListener("click", handleLogout)
);

const postBtn = document.getElementById("postBtn");
if (postBtn) {
  postBtn.addEventListener("click", createPost);
}

const publicBtn = document.getElementById("publicBtn");
const privateBtn = document.getElementById("privateBtn");
const privateBtnOffcanvas = document.getElementById("privateBtnOffcanvas");
const publicBtnOffcanvas = document.getElementById("publicBtnOffcanvas");

if ((publicBtn && privateBtn) || (publicBtnOffcanvas && privateBtnOffcanvas)) {
  [publicBtn, publicBtnOffcanvas].forEach((btn) =>
    btn.addEventListener("click", () => {
      window.location.href = `${basePath}/html/post.html?type=public`;
    })
  );
  [privateBtn, privateBtnOffcanvas].forEach((btn) =>
    btn.addEventListener("click", () => {
      window.location.href = `${basePath}/html/post.html?type=private`;
    })
  );
}

const menuToggle = document.getElementById("menuToggle");
const offcanvas = document.getElementById("offcanvasMenu");
const closeCanvas = document.getElementById("closeCanvas");

menuToggle.addEventListener("click", () => {
  offcanvas.classList.toggle("open");
});

closeCanvas.addEventListener("click", () => {
  offcanvas.classList.remove("open");
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && offcanvas.classList.contains("open")) {
    offcanvas.classList.remove("open");
  }
});
