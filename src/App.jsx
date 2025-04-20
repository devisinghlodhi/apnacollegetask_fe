import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/login";
import SignupForm from "./pages/signup";
import Profile from "./pages/profile";
import Topics from "./pages/topics";
import Progress from "./pages/progress";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/topics" element={<Layout><Topics /></Layout>} />
        <Route path="/progress" element={<Layout><Progress /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
