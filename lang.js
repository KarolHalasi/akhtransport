
const translations = {
  sk: {
    home: "Domov",
    about: "O nás",
    services: "Služby",
    order: "Objednávka",
    contact: "Kontakt",
    login: "Prihlásenie",
    welcome: "Vitajte v AKH Transport",
    intro: "Poskytujeme spoľahlivú cestnú dopravu do 3,5t v rámci SR."
  },
  hu: {
    home: "Főoldal",
    about: "Rólunk",
    services: "Szolgáltatások",
    order: "Rendelés",
    contact: "Kapcsolat",
    login: "Bejelentkezés",
    welcome: "Köszöntjük az AKH Transportnál",
    intro: "Megbízható közúti szállítást kínálunk 3,5 tonnáig Szlovákiában."
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    order: "Order",
    contact: "Contact",
    login: "Login",
    welcome: "Welcome to AKH Transport",
    intro: "We provide reliable road transport up to 3.5 tons within Slovakia."
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
setLanguage("sk"); // default language
