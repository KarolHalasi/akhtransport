const translations = {
  sk: {
    home: "Domov",
    order: "Objednávka",
    dashboard: "Môj účet",
    login: "Prihlásenie",
    logout: "Odhlásiť sa",

    welcome: "Vitajte v AKH Transport",
    intro: "Dvaja bratia, jedna dodávka a spoločná vášeň pre cestnú dopravu. Obaja milujeme šoférovanie, no život to zariadil tak, že jeden z nás viac sedí za volantom a druhý… za počítačom. Kým jeden brázdi cesty Slovenska, druhý má pod palcom logistiku a papierovačky. Spolu tvoríme zohraný tím, ktorý vám spoľahlivo doručí, čo treba – s dodávkou do 3,5 tony a úsmevom k tomu. Tešíme sa na spoluprácu! Karol a Attila",

    order_title: "Objednať prepravu",
    name: "Meno",
    email: "Email",
    phone_number: "Telefonne číslo",
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
    have_account: "Máte účet? Prihláste sa.",
    placeholder_email: "Email",
    placeholder_password: "Heslo",
    placeholder_name: "Meno",

    about: "O nás",
    services: "Služby",
    contact: "Kontakt"
  },

  hu: {
    home: "Főoldal",
    order: "Rendelés",
    dashboard: "Fiókom",
    login: "Bejelentkezés",
    logout: "Kijelentkezés",

    welcome: "Üdvözöljük az AKH Transportnál",
    intro: "Két testvér, egy furgon és közös szenvedély a fuvarozás iránt. Mindketten imádunk vezetni, de az élet úgy hozta, hogy egyikünk inkább az utakat járja, míg a másik az irodában navigál. Míg az egyik testvér a volán mögött van, a másik az adminisztráció bajnoka. Együtt megbízható csapat vagyunk, 3,5 tonnáig bármit elszállítunk – mosollyal az arucnkon. Örömmel várjuk az együttműködést!Karol és Attila",

    order_title: "Szállítás rendelése",
    name: "Név",
    email: "Email",
    phone_number: "Telefonszám",
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
    have_account: "Már van fiókja? Jelentkezzen be.",
    placeholder_email: "Email",
    placeholder_password: "Jelszó",
    placeholder_name: "Név",

    about: "Rólunk",
    services: "Szolgáltatások",
    contact: "Kapcsolat"
  },

  en: {
    home: "Home",
    order: "Order",
    dashboard: "My Account",
    login: "Login",
    logout: "Log Out",

    welcome: "Welcome to AKH Transport",
    intro: "Two brothers, one van, and a shared passion for transport. We both love driving, but life had other plans – one of us ended up on the road, the other behind the desk (someone has to deal with the paperwork, right?). While one brother conquers the highways, the other keeps the logistics running like clockwork. Together, we make a reliable team delivering across Slovakia with a 3.5-ton van – and a smile. Looking forward to working with you!Karol & Attila",

    order_title: "Order Transport",
    name: "Name",
    email: "Email",
    phone_number: "Telephone number",
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
    have_account: "Already have an account? Login.",
    placeholder_email: "Email",
    placeholder_password: "Password",
    placeholder_name: "Name",

    about: "About",
    services: "Services",
    contact: "Contact"
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang); // opcionális: megőrzi a választást újratöltés után

document.querySelectorAll("[data-i18n]").forEach(el => {
  const key = el.getAttribute("data-i18n");
  const translation = translations[lang] && translations[lang][key];
  if (translation) {
    if (el.tagName.toLowerCase() === "title") {
      document.title = translation;
    } else if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
      // placeholder-t állítunk
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  }
});

}  

// Ha van mentett nyelv, használjuk azt, különben alapértelmezésként "sk"
const savedLang = localStorage.getItem("lang") || "sk";
setLanguage(savedLang);
