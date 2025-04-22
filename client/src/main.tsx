import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { BrowserRouter, Route, Routes } from "react-router";
import PostPage from '@/routes/postPage/postPage';
import CreatePage from '@/routes/createPage/createPage';
import ProfilePage from '@/routes/profilePage/profilePage';
import SearchPage from '@/routes/searchPage/searchPage';
import MainlyLayouts from '@/routes/layouts/mainlyLayouts';
import Register from '@/routes/authPage/register';
import Login from '@/routes/authPage/login';
import HomePage from '@/routes/homePage/homePage';
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
              <Route path="profile/:username" element={<ProfilePage />} />
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
