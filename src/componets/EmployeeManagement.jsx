import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const defaultEmployees = [
  { id: "1", firstName: "John", lastName: "Doe", age: "30", salary: "50000", role: "Developer", address: "123 Main St" },
  { id: "2", firstName: "Jane", lastName: "Smith", age: "28", salary: "55000", role: "Designer", address: "456 Oak St" },
  { id: "3", firstName: "Mike", lastName: "Johnson", age: "35", salary: "60000", role: "Manager", address: "789 Pine St" }
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    return storedEmployees && storedEmployees.length > 0 ? storedEmployees : defaultEmployees;
  });
  
  const [form, setForm] = useState({ id: "", firstName: "", lastName: "", age: "", salary: "", role: "", address: "" });
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
      setEmployees(employees.map(emp => (emp.id === form.id ? form : emp)));
    } else {
      setEmployees([...employees, { ...form, id: Date.now().toString() }]);
    }
    setForm({ id: "", firstName: "", lastName: "", age: "", salary: "", role: "", address: "" });
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setForm(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Employee Management</h2>
      <button className="btn btn-primary w-100 mb-3" onClick={() => setShowForm(true)}>Add Employee</button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3">
          <input className="form-control mb-2" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input className="form-control mb-2" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input className="form-control mb-2" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
          <input className="form-control mb-2" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
          <input className="form-control mb-2" name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <input className="form-control mb-2" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <button className="btn btn-success w-100" type="submit">{form.id ? "Update" : "Add"} Employee</button>
        </form>
      )}
      <div className="row">
        {employees.map((emp) => (
          <div key={emp.id} className="col-md-4 mb-3">
            <div className="card p-3">
              <p className="fw-bold">{emp.firstName} {emp.lastName}</p>
              <p>Age: {emp.age}</p>
              <p>Role: {emp.role}</p>
              <p>Salary: {emp.salary}</p>
              <p>Address: {emp.address}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-warning" onClick={() => handleEdit(emp)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
