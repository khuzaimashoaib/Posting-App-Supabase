export function toggleDropdown(button) {
  const menu = button.nextElementSibling;
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
