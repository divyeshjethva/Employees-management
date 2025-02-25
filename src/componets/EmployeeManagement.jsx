import React, { useState, useEffect } from "react";
import "../index.css";

const defaultEmployees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: "30",
    salary: "50000",
    role: "Developer",
    address: "123 Main St",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    age: "28",
    salary: "55000",
    role: "Designer",
    address: "456 Oak St",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    age: "35",
    salary: "60000",
    role: "Manager",
    address: "789 Pine St",
  },
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    return storedEmployees && storedEmployees.length > 0
      ? storedEmployees
      : defaultEmployees;
  });

  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    salary: "",
    role: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setEmployees(employees.map((emp) => (emp.id === form.id ? form : emp)));
    } else {
      setEmployees([...employees, { ...form, id: Date.now().toString() }]);
    }
    setForm({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      salary: "",
      role: "",
      address: "",
    });
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setForm(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Employee Management
      </h2>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Employee
      </button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />
          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {form.id ? "Update" : "Add"} Employee
          </button>
        </form>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {employees.map((emp) => (
          <div
            key={emp.id}
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <p>
              <strong>
                {emp.firstName} {emp.lastName}
              </strong>
            </p>
            <p>Age: {emp.age}</p>
            <p>Role: {emp.role}</p>
            <p>Salary: {emp.salary}</p>
            <p>Address: {emp.address}</p>
            <button onClick={() => handleEdit(emp)} className="edit-button">
              Edit
            </button>
            <button
              onClick={() => handleDelete(emp.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
