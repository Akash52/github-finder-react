import React from "react";
import Navbar from "./component/layout/Navbar";
import "./App.css";
import Users from "./component/layout/users/Users";

export default function App() {
  return (
    <div>
      <Navbar title=" Github Finder" icon="fab fa-github" />

      <Users />
    </div>
  );
}
