export function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}