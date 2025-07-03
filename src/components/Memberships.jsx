import React, { useState, useEffect } from "react";

const AdminMemberships = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    _id: "",
    name: "",
    price: 0,
    premiumProfilesView: "Unlimited",
    duration: 1,
    viewContactDetails: false,
    sendInterest: false,
    startChat: false,
  });
  const [editingPlan, setEditingPlan] = useState(null);

  const API_URL = "https://backend-nm1z.onrender.com/api/memberships";

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/all`);
      if (!response.ok) throw new Error("Failed to fetch membership plans");

      const data = await response.json();
      setPlans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      // [name]: type === "number" ? parseInt(value, 10) || 0 : value,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingPlan && !form._id) {
      console.error("❌ Error: Editing plan is missing an _id:", form);
      return;
    }

    const method = editingPlan ? "PUT" : "POST";
    const url = editingPlan ? `${API_URL}/edit/${form._id}` : `${API_URL}/add`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok)
        throw new Error(
          `Failed to ${editingPlan ? "edit" : "add"} membership plan`
        );
      await response.json();

      setForm({
        _id: "",
        name: "",
        price: 0,
        premiumProfilesView: "Unlimited",
        duration: 1,
        viewContactDetails: false,
        sendInterest: false,
        startChat: false,
      });
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  const handleEdit = (plan) => {
    if (!plan || !plan._id) return;

    setForm({
      _id: plan._id,
      name: plan.name || "",
      price: plan.price || 0,
      premiumProfilesView:
        plan.features?.[0]?.feature?.split(" ")[0] || "Unlimited",
      duration: plan.duration || 1,
      viewContactDetails: plan.viewContactDetails || false,
      sendInterest: plan.sendInterest || false,
      startChat: plan.startChat || false,
    });

    setEditingPlan(plan);
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Are you sure you want to delete this plan?"))
      return;

    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete membership plan");

      fetchPlans();
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Admin Membership Management
      </h2>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          {editingPlan ? "Edit Plan" : "Add New Plan"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Plan Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Silver, Gold"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="price" className="block font-medium mb-1">
              Price (INR)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g., 499"
              value={form.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="premiumProfilesView"
              className="block font-medium mb-1"
            >
              Premium Profiles View
            </label>
            <input
              type="text"
              id="premiumProfilesView"
              name="premiumProfilesView"
              placeholder='e.g., "Unlimited" or "20"'
              value={form.premiumProfilesView}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block font-medium mb-1">
              Duration (Months)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="e.g., 3"
              value={form.duration}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="viewContactDetails"
                checked={form.viewContactDetails}
                onChange={handleInputChange}
                className="mr-2"
              />{" "}
              View Contact Details
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sendInterest"
                checked={form.sendInterest}
                onChange={handleInputChange}
                className="mr-2"
              />{" "}
              Send Interest
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="startChat"
                checked={form.startChat}
                onChange={handleInputChange}
                className="mr-2"
              />{" "}
              Start Chat
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {editingPlan ? "Update Plan" : "Add Plan"}
          </button>
        </form>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Existing Plans
        </h3>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Plan</th>
              <th className="p-3">Price</th>
              <th className="p-3">Premium Views</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id} className="border-t">
                <td className="p-3 text-center">{plan.name}</td>
                <td className="p-3 text-center">₹{plan.price}</td>
                <td className="p-3 text-center">
                  {plan.features?.[0]?.feature || "-"}
                </td>
                <td className="p-3 text-center">
                  {plan.duration || 0} (months)
                </td>
                <td className="p-3 flex space-x-2 justify-center">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMemberships;
