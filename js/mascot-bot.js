/**
 * Mascota Interactiva y Chatbot de Asistencia Virtual ("HernyBot")
 * Controla las animaciones de la mascota SVG, la ventana de chat y la interacción con el usuario.
 */

document.addEventListener("DOMContentLoaded", () => {
  const mascotTrigger = document.getElementById("mascotTrigger");
  const mascotWidget = document.getElementById("mascotWidget");
  const mascotSpeechBubble = document.getElementById("mascotSpeechBubble");
  const chatWindow = document.getElementById("mascotChatWindow");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const quickChipsContainer = document.getElementById("quickChipsContainer");
  const mascotEyes = document.querySelectorAll(".mascot-eye");
  const mascotPupils = document.querySelectorAll(".mascot-pupil");

  let isOpen = false;
  let hasInteracted = false;

  // Seguimiento ocular del ratón en la mascota
  document.addEventListener("mousemove", (e) => {
    if (!mascotTrigger) return;
    const rect = mascotTrigger.getBoundingClientRect();
    const mascotCenterX = rect.left + rect.width / 2;
    const mascotCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - mascotCenterY, e.clientX - mascotCenterX);
    const distance = Math.min(3.5, Math.hypot(e.clientX - mascotCenterX, e.clientY - mascotCenterY) / 40);

    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    mascotPupils.forEach((pupil) => {
      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
  });

  // Mensaje de saludo inicial en el bocadillo tras 2.5s
  setTimeout(() => {
    if (!hasInteracted && mascotSpeechBubble) {
      mascotSpeechBubble.classList.add("visible");
      setTimeout(() => {
        if (!isOpen) mascotSpeechBubble.classList.remove("visible");
      }, 7000);
    }
  }, 2500);

  // Abrir / Cerrar Chat
  function toggleChat(open = !isOpen) {
    isOpen = open;
    hasInteracted = true;
    if (mascotSpeechBubble) mascotSpeechBubble.classList.remove("visible");

    if (isOpen) {
      chatWindow.classList.add("active");
      mascotTrigger.classList.add("active");
      chatInput.focus();
      if (chatMessages.children.length === 0) {
        initWelcomeMessage();
      }
    } else {
      chatWindow.classList.remove("active");
      mascotTrigger.classList.remove("active");
    }
  }

  mascotTrigger.addEventListener("click", () => toggleChat());
  chatCloseBtn.addEventListener("click", () => toggleChat(false));

  // Renderizar Markdown simple en el chat
  function formatMarkdown(text) {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
    return formatted;
  }

  // Agregar mensaje al historial
  function addMessage(sender, text, options = {}) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender === "bot" ? "bot-msg" : "user-msg");

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (sender === "bot") {
      msgDiv.innerHTML = `
        <div class="msg-avatar">
          <svg viewBox="0 0 36 36" fill="none" class="bot-mini-svg">
            <rect width="36" height="36" rx="10" fill="#1E293B"/>
            <circle cx="12" cy="16" r="3" fill="#06B6D4"/>
            <circle cx="24" cy="16" r="3" fill="#06B6D4"/>
            <path d="M12 24C14 27 22 27 24 24" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M18 4V8" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="msg-body">
          <div class="msg-content">${formatMarkdown(text)}</div>
          <div class="msg-time">${time}</div>
        </div>
      `;

      // Si incluye botón dinámico de WhatsApp
      if (options.whatsappUrl) {
        const ctaBtn = document.createElement("a");
        ctaBtn.href = options.whatsappUrl;
        ctaBtn.target = "_blank";
        ctaBtn.rel = "noopener noreferrer";
        ctaBtn.className = "bot-whatsapp-btn";
        ctaBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>${options.buttonText || "Enviar esta consulta a WhatsApp"}</span>
        `;
        msgDiv.querySelector(".msg-body").appendChild(ctaBtn);
      }
    } else {
      msgDiv.innerHTML = `
        <div class="msg-body">
          <div class="msg-content">${text}</div>
          <div class="msg-time">${time}</div>
        </div>
      `;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Indicador de "Escribiendo..."
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.id = "typingIndicator";
    typingDiv.className = "chat-message bot-msg typing";
    typingDiv.innerHTML = `
      <div class="msg-avatar">
        <svg viewBox="0 0 36 36" fill="none" class="bot-mini-svg">
          <rect width="36" height="36" rx="10" fill="#1E293B"/>
          <circle cx="12" cy="16" r="3" fill="#06B6D4"/>
          <circle cx="24" cy="16" r="3" fill="#06B6D4"/>
        </svg>
      </div>
      <div class="typing-bubble">
        <span></span><span></span><span></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
  }

  // Mensaje de bienvenida inicial
  function initWelcomeMessage() {
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      addMessage(
        "bot",
        `¡Hola! Soy el asistente virtual de **Hernán Ariel Luciano**. 🤖✨\n\nPuedo responder tus dudas sobre sus **servicios de diseño web, mantenimiento, QA/testing, experiencia en Telecom** o ayudarte a solicitar una cotización.`
      );
      renderQuickChips();
    }, 600);
  }

  // Renderizar botones de consultas rápidas
  function renderQuickChips() {
    const chips = [
      { text: "💻 Servicios que ofrece", query: "¿Qué servicios ofreces?" },
      { text: "🔍 QA y Pruebas", query: "¿Qué incluye el servicio de QA y Testeo?" },
      { text: "🛡️ Mantenimiento Web", query: "¿Cómo funciona el mantenimiento de páginas web?" },
      { text: "🏆 Experiencia y CV", query: "¿Cuál es la trayectoria de Hernán?" },
      { text: "💰 Solicitar Presupuesto", query: "Quiero solicitar un presupuesto para una web" }
    ];

    quickChipsContainer.innerHTML = "";
    chips.forEach((chip) => {
      const btn = document.createElement("button");
      btn.className = "chip-btn";
      btn.textContent = chip.text;
      btn.addEventListener("click", () => {
        handleUserQuery(chip.query);
      });
      quickChipsContainer.appendChild(btn);
    });
  }

  // Procesar consulta del usuario
  function handleUserQuery(userQuery) {
    if (!userQuery.trim()) return;

    addMessage("user", userQuery);
    chatInput.value = "";
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const match = findAnswerInKnowledgeBase(userQuery);

      if (match) {
        // Encontró respuesta en la base de conocimiento
        addMessage("bot", match.response);
      } else {
        // Fallback inteligente: no se encontró respuesta exacta
        const whatsappUrl = createWhatsAppUrl(
          `Hola Hernán, estuve en tu web y tengo la siguiente consulta:\n\n"${userQuery}"`
        );

        addMessage(
          "bot",
          `No tengo la respuesta exacta para esa consulta en mi base de datos, pero **Hernán te responderá de forma personalizada** con gusto.\n\n¿Deseas enviar tu pregunta directamente a su WhatsApp?`,
          {
            whatsappUrl: whatsappUrl,
            buttonText: "📲 Enviar mi consulta por WhatsApp"
          }
        );
      }
    }, 700);
  }

  // Envío del formulario de chat
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (query) {
      handleUserQuery(query);
    }
  });
});
