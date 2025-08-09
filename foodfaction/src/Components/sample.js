// pages/UserForm.js
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ User added successfully");
        setFormData({ name: "", email: "" }); // Clear form
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Main Error: ${error.message}`);
    }
  };

  return (
    <div className="container obj mt-5">
      <h2 className="text-center mb-4">Agent Registration Form</h2>
      <form
        className="row g-3 shadow p-3 bg-white rounded m-4"
        onSubmit={handleSubmit}
      >
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12 mt-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        {message && (
          <div className="alert alert-info mt-3 text-center">{message}</div>
        )}
      </form>
    </div>
  );
}
