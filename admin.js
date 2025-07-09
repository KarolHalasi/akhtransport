&// admin.js

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

async function loadMessages() {
  const list = document.getElementById("messagesList");
  list.innerHTML = "";
  try {
    const snapshot = await db.collection("messages").orderBy("timestamp", "desc").get();
    if (snapshot.empty) {
      list.innerHTML = "<p>Žiadne správy zatiaľ neboli prijaté.</p>";
      return;
    }
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "message-card";
      const date = data.timestamp?.toDate().toLocaleString() || "-";
      card.innerHTML = `
        <p><strong>Meno:</strong> ${data.name || "-"}</p>
        <p><strong>Email:</strong> ${data.email || "-"}</p>
        <p><strong>Správa:</strong><br/> ${data.message || "-"}</p>
        <p><strong>Dátum:</strong> ${date}</p>
        <button class="delete-btn" onclick="deleteMessage('${doc.id}')">Vymazať</button>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    list.innerHTML = "<p>Chyba pri načítaní správ.</p>";
  }
}

async function deleteMessage(id) {
  if (confirm("Naozaj chcete vymazať túto správu?")) {
    try {
      await db.collection("messages").doc(id).delete();
      loadMessages();
    } catch (err) {
      alert("Chyba pri mazaní: " + err.message);
    }
  }
}

function downloadCSV(filename, rows) {
  if (!Array.isArray(rows) || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map(row => headers.map(field => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

async function exportOrdersCSV() {
  try {
    const snapshot = await db.collection("orders").get();
    const data = [];
    snapshot.forEach(doc => {
      const d = doc.data();
      data.push({
        Vyzdvihnutie: d.pickup || d.pickupAddress || "",
        Doručenie: d.delivery || d.deliveryAddress || "",
        Dátum: d.date || "",
        Email: d.userEmail || d.email || "",
        Poznámka: d.note || "",
        Stav: d.status || "",
        Cena: d.price || ""
      });
    });
    if (data.length) downloadCSV("objednavky.csv", data);
    else alert("Žiadne objednávky na export.");
  } catch (err) {
    alert("Chyba pri exporte objednávok: " + err.message);
  }
}

async function exportMessagesCSV() {
  try {
    const snapshot = await db.collection("messages").get();
    const data = [];
    snapshot.forEach(doc => {
      const d = doc.data();
      data.push({
        Meno: d.name || "",
        Email: d.email || "",
        Správa: d.message || "",
        Dátum: d.timestamp?.toDate().toLocaleString() || ""
      });
    });
    if (data.length) downloadCSV("spravy.csv", data);
    else alert("Žiadne správy na export.");
  } catch (err) {
    alert("Chyba pri exporte správ: " + err.message);
  }
}
