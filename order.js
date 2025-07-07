const db = firebase.firestore();

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const user = firebase.auth().currentUser;

  const data = {
    name: form.name.value,
    email: form.email.value,
    phonenumber: form.phonenumber.value,
    pickupAddress: form.pickup.value,
    deliveryAddress: form.delivery.value,
    date: form.datetime.value,
    note: form.note.value,
    userId: user ? user.uid : null,
    userEmail: user ? user.email : form.email.value,
    createdAt: new Date().toISOString()
  };

  try {
    await db.collection("orders").add(data);
    form.style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
  } catch (error) {
    alert("Chyba pri odosielaní objednávky: " + error.message);
  }
});
