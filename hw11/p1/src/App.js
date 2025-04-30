import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [response, setResponse] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itemId,
      itemName,
      quantity
    };

    try {
      const res = await axios.post("http://localhost:3001/place-order", {
        payload
      });

      setResponse(res.data.message);

      // Fetch latest notification from notification service
      const notifRes = await axios.get("http://localhost:3003/latest-notification");
      setNotification(notifRes.data.message);
    } catch (err) {
      setResponse(" Error placing order");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Place Order</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Item ID</label>
              <input className="form-control" value={itemId} onChange={(e) => setItemId(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Item Name</label>
              <input className="form-control" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-success">Place Order</button>
          </form>
        </div>
      </div>

      {/* {response && (
        <div className="alert alert-info mt-4">
          <strong>Response:</strong> {response}
        </div>
      )}

      {notification && (
        <div className="alert alert-secondary mt-3">
          <strong>Notification:</strong> {notification}
        </div>
      )} */}
    </div>
  );
}

export default App;
