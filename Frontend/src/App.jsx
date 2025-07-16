
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatsPage from './components/UrlStatsPage';
import RedirectHandler from './components/RedirectHandler';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<UrlStatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </>
  );
};

export default App;
