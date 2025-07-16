// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatsPage from './components/UrlStatsPage';
import RedirectHandler from './components/RedirectHandler';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UrlShortenerForm />} />
      <Route path="/stats" element={<UrlStatsPage />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  );
};

export default App;
