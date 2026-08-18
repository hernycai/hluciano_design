/**
 * Base de Conocimiento para el Asistente Virtual / Mascota de Hernán Luciano
 * Basado en CV oficial, perfil de GitHub (hernycai) y LinkedIn.
 */

const HERNAN_INFO = {
  name: "Hernán Luciano",
  role: "Especialista en Diseño Web, Mantenimiento & QA Manual / Testing",
  phone: "+54 9 11 6869-4047",
  whatsappUrl: "https://wa.me/5491168694047",
  email: "hluciano@gmail.com",
  location: "Ituzaingó, Buenos Aires, Argentina (Servicio remoto global)",
  linkedin: "https://www.linkedin.com/in/hernanluciano/",
  github: "https://github.com/hernycai",
  experienceYears: "Casi 20 años de experiencia técnica",
  languages: "Español (Nativo), Inglés (Intermedio B1)"
};

const KNOWLEDGE_BASE = [
  {
    id: "servicios",
    category: "servicios",
    keywords: ["servicio", "servicios", "haces", "ofreces", "trabajos", "que haces", "diseño", "desarrollo", "mantenimiento", "qa", "testing"],
    questionTitle: "¿Qué servicios ofrece Hernán?",
    response: `**Hernán ofrece 3 pilares principales de servicios digitales:**\n\n1. 💻 **Diseño y Desarrollo Web Moderno:** Landing pages de alto impacto y conversión, webs corporativas, catálogos y sitios para profesionales optimizados para SEO y móviles.\n2. 🛡️ **Mantenimiento y Soporte Técnico:** Actualizaciones preventivas, backups, optimización de velocidad, seguridad y resolución de fallas técnicas.\n3. 🔍 **Testeo y QA Manual Integral:** Pruebas exhaustivas de usabilidad, funcionalidad, compatibilidad en múltiples dispositivos (cross-browser/cross-device) y reporte de errores antes de lanzar.`
  },
  {
    id: "diseno-web",
    category: "servicios",
    keywords: ["diseño web", "crear pagina", "landing page", "sitio web", "pagina web", "como diseñas", "estilos", "responsive"],
    questionTitle: "¿Cómo trabaja el diseño de páginas web?",
    response: `Hernán crea sitios web con un enfoque **moderno, rápido y 100% responsivo** (adaptado a celulares, tablets y PC).\n\n✨ **Características:**\n• Carga ultra veloz y código limpio.\n• Diseño centrado en conversión (CRO) y experiencia de usuario (UX).\n• Optimización para buscadores (SEO técnico).\n• Integración directa con WhatsApp, formularios y redes sociales.`
  },
  {
    id: "mantenimiento",
    category: "servicios",
    keywords: ["mantenimiento", "actualizar", "soporte", "soporte tecnico", "roturas", "problemas", "arreglar", "optimizar", "velocidad", "seguridad"],
    questionTitle: "¿En qué consiste el servicio de mantenimiento web?",
    response: `Con casi 20 años de experiencia en soporte IT en Telecom Argentina, Hernán ofrece un servicio proactivo:\n\n• 🔄 Actualizaciones periódicas de contenidos y componentes.\n• ⚡ Optimización continua de velocidad y rendimiento.\n• 🔒 Chequeos de seguridad y copias de seguridad (backups).\n• 🚑 Respuesta rápida ante cualquier caída o fallo técnico.`
  },
  {
    id: "qa-testing",
    category: "qa",
    keywords: ["qa", "testing", "tester", "calidad", "testeo", "bugs", "errores", "manual", "alkemy", "pruebas"],
    questionTitle: "¿Qué incluye el servicio de QA y Testeo?",
    response: `Hernán está certificado en **QA Manual por IT Academy / Alkemy (230 horas de formación)**.\n\n🧪 **Sus servicios de QA incluyen:**\n• Pruebas funcionales y de usabilidad (UX testing).\n• Pruebas en múltiples navegadores (Chrome, Safari, Firefox, Edge) y móviles (iOS/Android).\n• Detección y reporte detallado de bugs en formularios, enlaces y flujos de compra.\n• Auditoría de calidad antes de salir a producción.`
  },
  {
    id: "experiencia",
    category: "perfil",
    keywords: ["experiencia", "telecom", "trayectoria", "años", "cv", "curriculum", "historia", "quien es", "background"],
    questionTitle: "¿Cuál es la experiencia y trayectoria de Hernán?",
    response: `Hernán cuenta con **más de 20 años de experiencia técnica** continua en **Telecom Argentina** (desde 2006):\n\n• Especialista en soporte técnico avanzado, resolución de fallas y operaciones masivas.\n• Formación integral en **QA Manual (Alkemy, 230hs)**, Python, Salesforce e Inteligencia Artificial.\n• Combina visión técnica profunda con foco en la satisfacción del usuario final.`
  },
  {
    id: "tecnologias",
    category: "tecnico",
    keywords: ["tecnologias", "stack", "lenguajes", "herramientas", "python", "html", "css", "javascript", "salesforce", "ia", "inteligencia artificial"],
    questionTitle: "¿Qué tecnologías y herramientas maneja?",
    response: `🛠️ **Stack y Competencias Técnicas:**\n\n• **Frontend & Web:** HTML5 semántico, CSS3 moderno, JavaScript, diseño responsivo y optimización de rendimiento.\n• **QA & Testing:** QA Manual, diseño de casos de prueba, ejecución cross-platform y bug reporting.\n• **Programación & Datos:** Python (Talento Tech).\n• **Plataformas & Redes:** Salesforce Admin, Redes LAN/ADSL, Ciberseguridad.\n• **IA:** Prompt Engineering, Automatización y herramientas de IA Generativa (Google / Min. Educación CABA).`
  },
  {
    id: "github",
    category: "enlaces",
    keywords: ["github", "repositorios", "codigo", "proyectos", "hernycai"],
    questionTitle: "¿Dónde puedo ver su código y GitHub?",
    response: `Puedes explorar los proyectos, código y actividad de Hernán en su perfil de GitHub oficial:\n\n🔗 **GitHub:** [github.com/hernycai](https://github.com/hernycai)`
  },
  {
    id: "linkedin",
    category: "enlaces",
    keywords: ["linkedin", "red profesional", "contacto profesional", "perfil linkedin"],
    questionTitle: "¿Cuál es su perfil de LinkedIn?",
    response: `Puedes conectar con Hernán y ver sus recomendaciones y trayectoria completa en:\n\n🔗 **LinkedIn:** [linkedin.com/in/hernanluciano](https://www.linkedin.com/in/hernanluciano/)`
  },
  {
    id: "precios",
    category: "presupuestos",
    keywords: ["precio", "precios", "cuanto cuesta", "costo", "cotizacion", "presupuesto", "tarifa", "valor"],
    questionTitle: "¿Cómo se cotiza un proyecto o servicio?",
    response: `Los presupuestos se adaptan a la medida de lo que necesitas (Landing page desde cero, mantenimiento mensual o auditoría QA de un sitio existente).\n\n💡 *Para recibir una cotización rápida y personalizada, puedes enviarle los detalles directamente a WhatsApp!*`
  },
  {
    id: "contacto",
    category: "contacto",
    keywords: ["contacto", "whatsapp", "telefono", "mail", "correo", "escribir", "donde esta", "ubicacion", "ituzaingo"],
    questionTitle: "¿Cómo puedo contactar a Hernán?",
    response: `📍 **Ubicación:** Ituzaingó, Buenos Aires, Argentina (Atención remota a todo el mundo).\n\n📲 **WhatsApp Directo:** [+54 9 11 6869-4047](https://wa.me/5491168694047)\n✉️ **Correo:** [hluciano@gmail.com](mailto:hluciano@gmail.com)\n💼 **LinkedIn:** [linkedin.com/in/hernanluciano](https://www.linkedin.com/in/hernanluciano/)`
  },
  {
    id: "certificaciones",
    category: "perfil",
    keywords: ["certificados", "certificaciones", "cursos", "estudios", "titulos", "educacion"],
    questionTitle: "¿Qué certificaciones y cursos tiene?",
    response: `🎓 **Certificaciones destacadas:**\n\n• **Tester QA Manual (230 hs):** Alkemy / Telecom Argentina.\n• **Administrador Salesforce & Python:** Talento Tech.\n• **Inteligencia Artificial & Productividad:** Google / Open Academy y Copilot.\n• **Programa Construí Tu Futuro & Ciberseguridad:** Ministerio de Educación CABA.\n• **Idiomas:** Inglés B1 Intermedio.`
  }
];

// Función para normalizar texto (quitar tildes, signos y minúsculas)
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

// Motor de búsqueda de respuestas en la base de conocimiento
function findAnswerInKnowledgeBase(query) {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return null;

  const words = cleanQuery.split(/\s+/).filter(w => w.length > 2);
  let bestMatch = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;

    // Coincidencia exacta en keywords
    for (const keyword of item.keywords) {
      const cleanKeyword = normalizeText(keyword);
      if (cleanQuery.includes(cleanKeyword)) {
        score += cleanKeyword.split(/\s+/).length * 5;
      }
      for (const word of words) {
        if (cleanKeyword.includes(word)) {
          score += 2;
        }
      }
    }

    if (score > highestScore && score >= 4) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}

// Generador de enlace WhatsApp con mensaje predeterminado
function createWhatsAppUrl(customMessage) {
  const text = customMessage || "Hola Hernán, estuve viendo tu página web y quisiera hacerte una consulta sobre tus servicios.";
  return `https://wa.me/5491168694047?text=${encodeURIComponent(text)}`;
}
