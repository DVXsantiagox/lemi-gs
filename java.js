const WHATSAPP_NUMBER = "573235197513";
const WHATSAPP_MESSAGE = "Hola, quiero más información para registrar mi marca.";

function createWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function configureWhatsAppLinks() {
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = createWhatsAppUrl();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function configureContactForm() {
  const form = document.querySelector("#contactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.open(createWhatsAppUrl(), "_blank", "noopener,noreferrer");
  });
}

function configureMobileMenu() {
  const toggle = document.querySelector("#menuToggle");
  const navigation = document.querySelector("#mainNav");
  toggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    toggle.textContent = isOpen ? "×" : "☰";
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      const serviceMenu = document.querySelector("#servicesDropdown");
      serviceMenu.classList.remove("open");
      serviceMenu.querySelector("button").setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      toggle.textContent = "☰";
    });
  });
}

function configureServicesDropdown() {
  const dropdown = document.querySelector("#servicesDropdown");
  const button = dropdown.querySelector(".nav-dropdown-toggle");
  button.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  dropdown.querySelectorAll(".dropdown-menu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      document.querySelectorAll(".service-accordion").forEach((service) => {
        service.open = service === target;
      });
      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function configureRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

document.querySelector("#year").textContent = new Date().getFullYear();
configureWhatsAppLinks();
configureContactForm();
configureMobileMenu();
configureServicesDropdown();
configureRevealAnimations();
