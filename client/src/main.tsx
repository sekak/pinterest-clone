import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from './routes/homePage/homePage.js';
import PostPage from './routes/postPage/postPage.js';
import CreatePage from './routes/createPage/createPage.js';
import ProfilePage from './routes/profilePage/profilePage.js';
import SearchPage from './routes/searchPage/searchPage.js';
import MainlyLayouts from './routes/layouts/mainlyLayouts.js';
import Register from './routes/authPage/register.js';
import Login from './routes/authPage/login.js';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainlyLayouts />} >
              <Route path="/" element={<HomePage />} />
              <Route path="/pin/:id" element={<PostPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/:username" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>

        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
