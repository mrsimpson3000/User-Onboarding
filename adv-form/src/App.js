import React, { useState } from "react";
import MyForm from "./components/Form";
import "./App.css";

function App() {
  const [users, setUsers] = useState();

  return (
    <div className='App'>
      <MyForm />
    </div>
  );
}

export default App;
