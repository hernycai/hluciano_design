/**
 * Lógica principal de la aplicación: Navegación, Cotizador Interactivo,
 * Animaciones y Formularios de Contacto.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navegación móvil y sticky header
  const navbar = document.querySelector(".navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const menuLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = navToggle.querySelector("i") || navToggle;
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false"
      );
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // 2. Revelado suave de elementos al hacer scroll (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 3. Cotizador interactivo / Generador de Solicitud de Proyecto
  const quoteForm = document.getElementById("quoteCalculatorForm");
  const quoteResultText = document.getElementById("quoteSummaryText");
  const quoteWhatsAppBtn = document.getElementById("quoteWhatsAppBtn");

  function updateQuoteSummary() {
    if (!quoteForm) return;

    const selectedService = quoteForm.querySelector('input[name="serviceType"]:checked');
    const selectedScale = quoteForm.querySelector('input[name="projectScale"]:checked');
    const checkedAddons = Array.from(
      quoteForm.querySelectorAll('input[name="addons"]:checked')
    ).map((cb) => cb.value);

    const serviceName = selectedService ? selectedService.dataset.name : "Diseño Web";
    const scaleName = selectedScale ? selectedScale.dataset.name : "Estándar";

    let messageText = `Hola Hernán! Quiero solicitar un presupuesto:\n\n`;
    messageText += `📌 *Servicio Principal:* ${serviceName}\n`;
    messageText += `📊 *Alcance / Tipo:* ${scaleName}\n`;

    if (checkedAddons.length > 0) {
      messageText += `➕ *Adicionales:* ${checkedAddons.join(", ")}\n`;
    }

    messageText += `\n¿Podemos coordinar para ver detalles y tiempos de entrega?`;

    if (quoteResultText) {
      quoteResultText.textContent = `${serviceName} • Alcance ${scaleName} ${
        checkedAddons.length ? `(+${checkedAddons.length} adicional${checkedAddons.length > 1 ? "es" : ""})` : ""
      }`;
    }

    if (quoteWhatsAppBtn) {
      quoteWhatsAppBtn.href = `https://wa.me/5491168694047?text=${encodeURIComponent(
        messageText
      )}`;
    }
  }

  if (quoteForm) {
    quoteForm.addEventListener("change", updateQuoteSummary);
    updateQuoteSummary();
  }

  // 4. Formulario de contacto general
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const service = document.getElementById("contactService").value;
      const message = document.getElementById("contactMessage").value.trim();

      const fullMessage = `Hola Hernán, soy ${name} (${email}).\nMe comunico por tu web sobre el servicio de *${service}*.\n\n*Mensaje:* ${message}`;

      const waUrl = `https://wa.me/5491168694047?text=${encodeURIComponent(
        fullMessage
      )}`;

      // Abrir WhatsApp en nueva pestaña
      window.open(waUrl, "_blank");

      // Notificación de confirmación
      showToast("¡Redirigiendo a WhatsApp con tu consulta!", "success");
      contactForm.reset();
    });
  }

  // 5. Toast Notification System
  function showToast(message, type = "info") {
    let toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toastContainer";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast-pill ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // 6. Copiar datos al portapapeles con feedback
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copiado: ${textToCopy}`, "success");
      });
    });
  });
});
