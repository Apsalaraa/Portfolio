/* ========== SECTION SWITCHING ========== */
function showSection(sectionId) {
  document
    .querySelectorAll(".section-content")
    .forEach((sec) => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");

  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));
  document
    .querySelectorAll(`[data-target="${sectionId}"]`)
    .forEach((link) => link.classList.add("active"));

  // Close mobile menu on click
  mobileMenu.classList.add("hidden");
}

/* ========== ADD CLICK HANDLERS TO NAV LINKS ========== */
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-target");
    showSection(target);
  });
});

/* ========== MOBILE MENU TOGGLE ========== */
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

/* ========== CONTACT FORM HANDLING ========== */
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.classList.remove("hidden", "success", "error");

  if (
    !form.name.value.trim() ||
    !form.email.value.trim() ||
    !form.message.value.trim()
  ) {
    formMessage.textContent = "Please fill out all fields.";
    formMessage.classList.add("error");
    return;
  }

  formMessage.textContent =
    "Message sent successfully! I will get back to you soon.";
  formMessage.classList.add("success");
  form.reset();
});

/* ========== INITIALIZE ========== */
showSection("home");
document.getElementById("year").textContent = new Date().getFullYear();
lucide.createIcons();
