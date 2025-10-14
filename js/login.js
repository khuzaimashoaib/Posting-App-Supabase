import { signInUser, getUserSession } from "./auth.js";
import { showToast } from "../utils/toast.js";

const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { data, error } = await signInUser(email, password);

  // console.log("Login result:", { data, error });

  if (error) {
    showToast(error.message);
    console.error("login error:", error.message);
    return;
  }

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
  showToast("✅ Successfully logged in.");
});

const session = async () => {
  const { session } = await getUserSession();
  if (session) {
    const basePath = window.location.hostname.includes("github.io")
    ? "/Posting-App-Supabase"
    : "";
    window.location.href = `${basePath}/index.html`;

    // window.location.href = "../index.html";
  }
};

session();
