import React, { useState } from "react";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { app } from "../firebase/config";
import { useAuth } from "../components/AuthContext";

export default function OrderForm() {
  const db = getFirestore(app);
  const { user } = useAuth();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Musíte byť prihlásený!");

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      from,
      to,
      note,
      status: "čaká",
      date: Timestamp.now(),
    });

    alert("Objednávka odoslaná!");
    setFrom(""); setTo(""); setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Nová objednávka</h2>
      <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Odkiaľ" className="input mb-2" required />
      <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Kam" className="input mb-2" required />
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Poznámka" className="input mb-2" />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Odoslať</button>
    </form>
  );
}
