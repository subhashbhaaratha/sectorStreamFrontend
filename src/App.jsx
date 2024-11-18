import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
{
}
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import OurIndustries from "./components/OurIndustries";
import Testimonials from "./components/Testimonials";
import Solution from "./components/Solution";
import LetsTalk from "./components/LetsTalk";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SolutionPackage from "./components/SolutionPackage";
import AdminSolutionPackages from "./components/AdminSolutionPackages";
import AdminSolution from "./components/AdminSolution";
import Admin from "./components/Admin";
import LoginPage from "./components/Login";
import SignupPage from "./components/SignUp";
import AdminContainer from "./components/AdminContainer";
import SupportPage from "./components/Support";
import KnowledgeBase from "./components/KnowledgeBase";
import Footer from "./components/Footer";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Home />
          <OurIndustries />
          <Testimonials />
        </>
      ),
    },
    {
      path: "/solution/:id1/:id2",
      element: (
        <>
          <Header />
          <Solution />
        </>
      ),
    },
    {
      path: "/solutionPackage/:id1/:id2/:id3",
      element: (
        <>
          <Header />
          <SolutionPackage />
        </>
      ),
    },
    {
      path: "/admin",
      element: (
        <>
          <Header />
          <AdminContainer />
        </>
      ),
    },
    {
      path: "/provider",
      element: (
        <>
          <Header />
          <AdminContainer />
        </>
      ),
    },
    {
      path: "/adminsolution/:id1/:id2",
      element: (
        <>
          <Header />
          <AdminSolution />
        </>
      ),
    },
    {
      path: "/adminsolutionPackages/:id1/:id2/:id3",
      element: (
        <>
          <Header />
          <AdminSolutionPackages />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Header />
          <LoginPage />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header />
          <SignupPage />
        </>
      ),
    },
    {
      path: "/support",
      element: (
        <>
          <Header />
          <SupportPage />
        </>
      ),
    },
    {
      path: "/knowledgebase",
      element: (
        <>
          <Header />
          <KnowledgeBase />
        </>
      ),
    },
  ]);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  return (
    <>
      <RouterProvider router={appRouter} />
      <Footer />
    </>
  );
}

export default App;
