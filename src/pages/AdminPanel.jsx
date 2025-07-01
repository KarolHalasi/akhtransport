import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { app } from "../firebase/config";
import { useAuth } from "../components/AuthContext";

export default function AdminPanel() {
  const db = getFirestore(app);
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    fetchOrders();
  };

  useEffect(() => { fetchOrders(); }, []);

  if (!user || user.email !== "admin@akhtransport.com") return <p>Prístup len pre admina.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Správa objednávok</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="mb-2 p-2 border rounded">
            <p><strong>{order.from} → {order.to}</strong></p>
            <p>Status: {order.status}</p>
            <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
              <option value="čaká">čaká</option>
              <option value="vybavená">vybavená</option>
              <option value="doručená">doručená</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
