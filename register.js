const auth = firebase.auth();

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    await userCred.user.updateProfile({ displayName: name });
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Chyba pri registrácii: " + error.message);
  }
});
