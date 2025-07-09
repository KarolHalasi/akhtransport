// admin.js

const auth = firebase.auth();
const db = firebase.firestore();
const ADMIN_EMAIL = "info@akhtransport.sk";

auth.onAuthStateChanged(user => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "index.html";
  } else {
    loadOrders();
    loadMessages();
  }
});

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

function showSection(section) {
  document.getElementById("ordersSection").classList.toggle("hidden", section !== "orders");
  document.getElementById("messagesSection").classList.toggle("hidden", section !== "messages");
}

async function loadOrders() {
  const list = document.getElementById("ordersList");
  list.innerHTML = "";

  const fromDate = document.getElementById("filterDateFrom").value;
  const toDate = document.getElementById("filterDateTo").value;
  const status = document.getElementById("filterStatus").value;

  try {
    let ref = db.collection("orders");
    if (fromDate) ref = ref.where("date", ">=", fromDate);
    if (toDate) ref = ref.where("date", "<=", toDate + "\uFFFF");
    if (status) ref = ref.where("status", "==", status);

    const snapshot = await ref.orderBy("date", "desc").get();

    if (snapshot.empty) {
      list.innerHTML = "<p>Žiadne objednávky nevyhovujú filtrom.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <p><strong>Vyzdvihnutie:</strong> ${data.pickupAddress || data.pickup || "-"}</p>
        <p><strong>Doručenie:</strong> ${data.deliveryAddress || data.delivery || "-"}</p>
        <p><strong>Dátum:</strong> ${data.date || "-"}</p>
        <p><strong>Poznámka:</strong> ${data.note || "-"}</p>
        <p><strong>Email zákazníka:</strong> ${data.email || data.userEmail || "-"}</p>
        <label>Stav:
          <select id="status-${doc.id}">
            <option value="Čaká" ${data.status === "Čaká" ? "selected" : ""}>Čaká</option>
            <option value="Vybavuje sa" ${data.status === "Vybavuje sa" ? "selected" : ""}>Vybavuje sa</option>
            <option value="Doručené" ${data.status === "Doručené" ? "selected" : ""}>Doručené</option>
          </select>
        </label>
        <label>Cena (€):</label>
        <input type="number" id="price-${doc.id}" value="${data.price || ""}" />
        <button class="save-btn" onclick="saveOrder('${doc.id}')">Uložiť zmeny</button>
        <button class="delete-btn" onclick="deleteOrder('${doc.id}')">Zmazať</button>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error("Chyba pri načítaní objednávok:", err);
    list.innerHTML = "<p>Chyba pri načítaní objednávok.</p>";
  }
}

async function saveOrder(id) {
  const status = document.getElementById("status-" + id).value;
  const price = document.getElementById("price-" + id).value;
  try {
    await db.collection("orders").doc(id).update({
      status,
      price: price !== "" ? parseFloat(price) : null
    });
    alert("Objednávka bola aktualizovaná.");
  } catch (err) {
    alert("Chyba pri ukladaní: " + err.message);
  }
}

async function deleteOrder(id) {
  if (confirm("Naozaj chcete zmazať túto objednávku?")) {
    try {
      await db.collection("orders").doc(id).delete();
      loadOrders();
    } catch (err) {
      alert("Chyba pri mazaní: " + err.message);
    }
  }
}

// Tu môžeme doplniť aj loadMessages(), exporty atď neskôr.
