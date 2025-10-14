import { registerUser, getUserSession } from "./auth.js";
import { showToast } from "../utils/toast.js";

const form = document.getElementById("signupForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userNameInput = document.getElementById("signupName");
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");

  const user = userNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const signInResponse = await registerUser(email, password, user);
  if (signInResponse.user) {
    showToast("🎉 Registration completed successfully.");



    localStorage.clear();
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1500);
  } else {
    showToast(`❌ ${signInResponse.message}`);
  }
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
