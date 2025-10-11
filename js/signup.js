import { registerUser, getUserSession } from "./auth.js";

const form = document.getElementById("signupForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const signInResponse = await registerUser(email, password);
  if (signInResponse.user) {
    alert("Sign up successfull");

    // sessionStorage.clear();
    localStorage.clear();
    window.location.href = "./login.html";
  } else {
    alert(signInResponse.message);
  }
});

const session = async () => {
  const { session } = await getUserSession();
  if (session) {
    window.location.href = "/";
  }
};

session();
