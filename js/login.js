import { signInUser, getUserSession } from "./auth.js";


const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { data, error } = await signInUser(email, password);

  console.log("Login result:", { data, error });

  if (error) {
    console.log("login error:", error.message);
    alert(error.message);
    return;
  }
  

  alert("Login successful!");
  window.location.href = "../index.html";
});



const session = async () => {
  const { session } = await getUserSession();
  if (session) {
    window.location.href = "/";
  }
};

session();  
