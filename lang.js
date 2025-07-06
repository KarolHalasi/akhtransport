const translations = {
  sk: {
    home: "Domov",
    order: "Objednávka",
    dashboard: "Môj účet",
    login: "Prihlásenie",
    logout: "Odhlásiť sa",

    welcome: "Vitajte v AKH Transport",
    intro: "Poskytujeme spoľahlivú cestnú dopravu do 3,5t v rámci Slovenska a okolia.",

    order_title: "Objednať prepravu",
    name: "Meno",
    email: "Email",
    pickup: "Adresa vyzdvihnutia",
    delivery: "Adresa doručenia",
    date: "Dátum a čas",
    note: "Poznámka",
    submit: "Odoslať objednávku",
    thank_you: "Ďakujeme! Vaša objednávka bola úspešne odoslaná.",

    login_title: "Prihlásenie",
    password: "Heslo",
    login_button: "Prihlásiť sa",
    no_account: "Nemáte účet? Zaregistrujte sa.",

    register_title: "Registrácia",
    register_button: "Registrovať sa",
    have_account: "Máte účet? Prihláste sa."
  },
  hu: {
    home: "Főoldal",
    order: "Rendelés",
    dashboard: "Fiókom",
    login: "Bejelentkezés",
    logout: "Kijelentkezés",

    welcome: "Üdvözöljük az AKH Transportnál",
    intro: "Megbízható közúti szállítást kínálunk 3,5 tonnáig Szlovákiában és környékén.",

    order_title: "Szállítás rendelése",
    name: "Név",
    email: "Email",
    pickup: "Átvételi cím",
    delivery: "Kiszállítási cím",
    date: "Dátum és idő",
    note: "Megjegyzés",
    submit: "Rendelés elküldése",
    thank_you: "Köszönjük! A rendelés sikeresen elküldve.",

    login_title: "Bejelentkezés",
    password: "Jelszó",
    login_button: "Bejelentkezés",
    no_account: "Nincs fiókja? Regisztráljon.",

    register_title: "Regisztráció",
    register_button: "Regisztráció",
    have_account: "Már van fiókja? Jelentkezzen be."
  },
  en: {
    home: "Home",
    order: "Order",
    dashboard: "My Account",
    login: "Login",
    logout: "Log Out",

    welcome: "Welcome to AKH Transport",
    intro: "We provide reliable road transport up to 3.5 tons within Slovakia and surroundings.",

    order_title: "Order Transport",
    name: "Name",
    email: "Email",
    pickup: "Pickup Address",
    delivery: "Delivery Address",
    date: "Date and Time",
    note: "Note",
    submit: "Submit Order",
    thank_you: "Thank you! Your order has been submitted successfully.",

    login_title: "Login",
    password: "Password",
    login_button: "Login",
    no_account: "Don't have an account? Register.",

    register_title: "Register",
    register_button: "Register",
    have_account: "Already have an account? Login."
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
setLanguage("sk"); // Default language

