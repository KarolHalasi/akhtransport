const db = firebase.firestore();
const auth = firebase.auth();
const form = document.getElementById("orderForm");
const thankYou = document.getElementById("thankYouMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  const data = {
    name: form.name.value,
    email: form.email.value,
    phonenumber: form["phone_number"].value,
    pickupAddress: form.pickup.value,
    deliveryAddress: form.delivery.value,
    date: form.datetime.value,
    note: form.note.value,
    userId: user ? user.uid : null,
    userEmail: user ? user.email : form.email.value,
    createdAt: new Date().toISOString(),
    status: "Čaká",
    price: null
  };

  console.log("Ukladám objednávku:", data);

  try {
    await db.collection("orders").add(data);
    form.style.display = "none";
    thankYou.style.display = "block";
  } catch (err) {
    alert("Chyba pri ukladaní objednávky: " + err.message);
    console.error(err);
  }
});
