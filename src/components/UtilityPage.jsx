import React, { useState, useEffect } from "react";

const API_URL = "https://backend-nm1z.onrender.com/api/admin/auth/qr";
const UtilityPage = () => {
  const [qr, setQr] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch existing QR on component load
  const fetchQR = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("No QR code found");
      const data = await res.json();
      setQr(data);
    } catch (err) {
      console.warn("No existing QR:", err.message);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      setErrorMsg("Both name and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      setErrorMsg("");
      setLoading(true);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      setQr(data);
      setName("");
      setImage(null);
    } catch (err) {
      setErrorMsg("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Manage QR Code
      </h2>

      {qr && (
        <div className="mb-6 text-center">
          <h3 className="text-lg font-medium">Current QR Code</h3>
          <p className="text-gray-600 mb-2">{qr.name}</p>
          <img
            src={qr.imageUrl}
            alt="QR Code"
            className="w-48 h-48 object-contain mx-auto border"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="name">
            UPI ID
          </label>
          <input
            id="name"
            type="text"
            placeholder="yourcompany@upi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="image">
            QR Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Uploading..." : "Upload New QR"}
        </button>
      </form>
    </div>
  );
};

export default UtilityPage;
