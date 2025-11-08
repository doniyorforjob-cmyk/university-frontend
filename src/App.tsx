import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ScrollToTop } from './components/shared';
import HomePage from './pages/Home';
import NewsPage from './pages/News';
import NewsDetailPage from './pages/NewsDetail';
import AnnouncementsPage from './pages/Announcements';
import MediaAboutUsPage from './pages/MediaAboutUs';
import AppealsPage from './pages/Appeals';
import ContactPage from './pages/Contact';
import OrganizationalStructurePage from './pages/OrganizationalStructure';
import VideoGallery from "./pages/Home/VideoGallerySection";

// Vaqtinchalik sahifa
const AnnouncementDetailPage = () => (
  <div className="container mx-auto p-4">
    <h1>E&apos;lon detali</h1>
    <p>Bu yerda e&apos;lonning detal sahifasi bo&apos;ladi.</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/media-about-us" element={<MediaAboutUsPage />} />
          <Route path="/appeals" element={<AppealsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/organizational-structure"
            element={<OrganizationalStructurePage />}
          />
        </Route>
      </Routes>

      {/* Global "Yuqoriga qaytish" tugmasi */}
      <ScrollToTop />
    </div>
  );
}

export default App;