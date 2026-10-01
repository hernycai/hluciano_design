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

      // Abrir WhatsApp en nueva pestaña de forma compatible con iframes
      const waLink = document.createElement("a");
      waLink.href = waUrl;
      waLink.target = "_blank";
      waLink.rel = "noopener noreferrer";
      document.body.appendChild(waLink);
      waLink.click();
      waLink.remove();

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

  // 7. Carrusel Interactivo de Proyectos Realizados
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselPrevBtn = document.getElementById("carouselPrevBtn");
  const carouselNextBtn = document.getElementById("carouselNextBtn");
  const carouselDots = document.querySelectorAll("#carouselDots .dot");
  const carouselViewport = document.getElementById("carouselViewport");

  if (carouselTrack && carouselPrevBtn && carouselNextBtn) {
    let currentSlide = 0;
    const slides = carouselTrack.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;
    let autoPlayTimer = null;

    function getVisibleSlides() {
      return window.innerWidth <= 768 ? 1 : 2;
    }

    function getMaxIndex() {
      const visible = getVisibleSlides();
      return Math.max(0, totalSlides - visible);
    }

    function updateCarousel(animate = true) {
      const maxIndex = getMaxIndex();
      if (currentSlide > maxIndex) currentSlide = maxIndex;
      if (currentSlide < 0) currentSlide = 0;

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 28; // 1.75rem en px
      const moveDistance = currentSlide * (slideWidth + gap);

      carouselTrack.style.transition = animate ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
      carouselTrack.style.transform = `translateX(-${moveDistance}px)`;

      carouselDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }

    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentSlide >= maxIndex) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      updateCarousel();
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentSlide <= 0) {
        currentSlide = maxIndex;
      } else {
        currentSlide--;
      }
      updateCarousel();
    }

    carouselNextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoplay();
    });

    carouselPrevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoplay();
    });

    carouselDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"), 10);
        currentSlide = index;
        updateCarousel();
        restartAutoplay();
      });
    });

    // Soporte táctil / Swipe para móviles y tablets
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselViewport) {
      carouselViewport.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
      }, { passive: true });

      carouselViewport.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startAutoplay();
      }, { passive: true });

      carouselViewport.addEventListener("mouseenter", stopAutoplay);
      carouselViewport.addEventListener("mouseleave", startAutoplay);
    }

    // Navegación con teclado cuando está en foco
    document.addEventListener("keydown", (e) => {
      const section = document.getElementById("proyectos");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        if (e.key === "ArrowLeft") {
          prevSlide();
          restartAutoplay();
        } else if (e.key === "ArrowRight") {
          nextSlide();
          restartAutoplay();
        }
      }
    });

    function startAutoplay() {
      stopAutoplay();
      autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    window.addEventListener("resize", () => {
      updateCarousel(false);
    });

    startAutoplay();
    setTimeout(() => updateCarousel(false), 100);
  }
});
