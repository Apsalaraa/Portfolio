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

  // Handle logo active state (green when on Home)
  const logo = document.getElementById("logo");
  if (sectionId === "home") {
    logo.classList.add("text-[--secondary]");
  } else {
    logo.classList.remove("text-[--secondary]");
  }

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

/* ========== LOGO CLICK HANDLER ========== */
const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  showSection("home");
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

form.addEventListener("submit", async (e) => {
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

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formMessage.textContent =
        "Message sent successfully! I will get back to you soon.";
      formMessage.classList.add("success");
      form.reset();
    } else {
      const data = await response.json();
      formMessage.textContent =
        data?.errors?.[0]?.message || "Oops! Something went wrong.";
      formMessage.classList.add("error");
    }
  } catch (error) {
    formMessage.textContent = "Oops! Something went wrong.";
    formMessage.classList.add("error");
  }
});

/* ========== INITIALIZE ========== */
showSection("home");
document.getElementById("year").textContent = new Date().getFullYear();
lucide.createIcons();
