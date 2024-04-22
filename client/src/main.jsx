import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { App } from "./App";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";

import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "../pages/ErrorPage";
import { ProfilePage } from "../pages/ProfilePage";
// import { LobbyPage } from "../pages/LobbyPage";
import { ChatPage } from "../pages/ChatPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/lobby/:id" element={<LobbyPage />} /> */}
      <Route path="/chat/:id" element={<ChatPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // root.render(
  //   <div>
  //     <RouterProvider router={router} />,
  //     <ToastContainer />
  //   </div>
  // );

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  );
}
