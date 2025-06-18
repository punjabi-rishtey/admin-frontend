import React, { useEffect, useState } from "react";

const MessagePage = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMessage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          // "http://localhost:5174/api/messages/history"
          "https://backend-nm1z.onrender.com/api/messages/history"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        // Sort by expiresAt in descending order (newest first)
        const sortedData = data.sort(
          (a, b) => new Date(b.expiresAt) - new Date(a.expiresAt)
        );
        setMessageHistory(sortedData);
        setError(null);
      } catch (err) {
        setError("something went wrong");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMessage();
  }, []);

  const dataTimeConverter = (datetime, toMongo = false) => {
    if (!datetime) return "";
    if (toMongo) {
      // Convert datetime-local to MongoDB ISO string
      return new Date(datetime).toISOString();
    } else {
      // Convert MongoDB ISO string to datetime-local format
      const date = new Date(datetime);
      return date
        .toLocaleString("sv-SE", { timeZone: "UTC" })
        .replace(" ", "T");
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to send this message?")) {
      setLoading(true);
      try {
        // const response = await fetch("http://localhost:5174/api/messages", {
        const response = await fetch(
          "https://backend-nm1z.onrender.com/api/messages",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message,
              expiresAt: dataTimeConverter(expiresAt, true),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        const newMessage = await response.json();
        setMessageHistory((prev) =>
          [newMessage, ...prev].sort(
            (a, b) => new Date(b.expiresAt) - new Date(a.expiresAt)
          )
        );
        setMessage("");
        setExpiresAt("");
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setLoading(true);
      try {
        const response = await fetch(
          // `http://localhost:5174/api/messages/${id}`,
          `https://backend-nm1z.onrender.com/api/messages/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete message");
        }
        setMessageHistory((prev) => prev.filter((msg) => msg._id !== id));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <h1 className="pb-4">Message</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      <form
        className="flex flex-col w-fit gap-6 border-2 border-gray-300 rounded-md p-4"
        onSubmit={handelSubmit}
      >
        <textarea
          className="px-4 py-2 border border-gray-300 rounded-md h-32 w-72 bg-gray-100"
          placeholder="type message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-between">
          <label htmlFor="expiry">Expiry:</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            name="expiry"
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 m-auto"
          disabled={loading}
        >
          SEND
        </button>
      </form>
      <div className="p-0.5 bg-gray-300 my-6 border border-gray-300"></div>
      <ul className="p-4 w-full sm:w-[50%]">
        <h1 className="pb-4">History</h1>
        {messageHistory.map((history) => (
          <li
            key={history._id}
            className="border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 mb-2 w-full"
          >
            <p className="bg-gray-200 rounded-md px-4 py-2 w-full">
              {history.message}
            </p>
            <button
              onClick={() => handleDelete(history._id)}
              className="bg-red-600 text-white p-1 rounded-md hover:bg-red-500 mt-2"
              disabled={loading}
            >
              Delete
            </button>
            <div className="border-t border-gray-300 w-full mt-4">
              <p className="text-xs font-light text-gray-700">
                Expires at: {dataTimeConverter(history.expiresAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagePage;
