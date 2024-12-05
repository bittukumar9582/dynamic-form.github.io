import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const DynamicForm = () => {
  const formOptions = {
    userInfo: {
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: false },
      ],
    },
    addressInfo: {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        {
          name: "state",
          type: "dropdown",
          label: "State",
          options: ["California", "Texas", "New York"],
          required: true,
        },
        { name: "zipCode", type: "text", label: "Zip Code", required: false },
      ],
    },
    paymentInfo: {
      fields: [
        { name: "cardNumber", type: "text", label: "Card Number", required: true },
        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
        { name: "cvv", type: "password", label: "CVV", required: true },
        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
      ],
    },
  };

  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({});
    setProgress(0);
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setFormData({ ...formData, [fieldName]: value });

    const totalFields = formOptions[formType]?.fields.length || 0;
    const filledFields = Object.keys(formData).length + 1; // Including current field
    setProgress(Math.round((filledFields / totalFields) * 100));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormType("");
    setFormData({});
    setProgress(0);
    alert("Form submitted successfully!");
  };

  return (
    <div className="container mt-4">
      <h2>Dynamic Form Implementation</h2>

      <div className="form-group">
        <label htmlFor="formType">Select Form Type:</label>
        <select
          className="form-control"
          id="formType"
          value={formType}
          onChange={handleFormTypeChange}
        >
          <option value="">--Select--</option>
          <option value="userInfo">User Information</option>
          <option value="addressInfo">Address Information</option>
          <option value="paymentInfo">Payment Information</option>
        </select>
      </div>

      <ProgressBar progress={progress} />

      {formType && (
        <form onSubmit={handleSubmit}>
          {formOptions[formType].fields.map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "dropdown" ? (
                <select
                  className="form-control"
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(e, field.name)}
                  required={field.required}
                >
                  <option value="">--Select--</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="form-control"
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(e, field.name)}
                  required={field.required}
                />
              )}
              {field.required && !formData[field.name] && (
                <small className="text-danger">This field is required.</small>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}

      {submittedData.length > 0 && (
        <div className="mt-4">
          <h3>Submitted Data</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                {Object.keys(submittedData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                  <td>
                    <button className="btn btn-warning btn-sm">Edit</button>{" "}
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
