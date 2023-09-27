import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [home, setHome] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/home").then(function (response) {
      setHome(response.data);
    });
  }, []);

  async function postUserData(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/post_data", formData);
      console.log("Data sent successfully!");
      // Handle success (e.g., redirect to a different page)
    } catch (error) {
      console.error("Data sending error:", error);
      // Handle error (e.g., display an error message to the user)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={postUserData}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Data</button>
      </form>
      {home}
    </div>
  );
}

export default App;
