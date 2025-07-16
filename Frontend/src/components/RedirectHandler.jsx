

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { log } from '../services/services';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('shortUrls')) || [];
    const entryIndex = urls.findIndex((u) =>
      u.shortUrl.endsWith(`/${shortcode}`)
    );

    if (entryIndex === -1) {
      log('frontend', 'error', 'handler', `Shortcode ${shortcode} not found`);
      navigate('/');
      return;
    }

    const entry = urls[entryIndex];
    const now = new Date();

    if (new Date(entry.expiresAt) < now) {
      log('frontend', 'warn', 'handler', `Shortcode ${shortcode} expired`);
      navigate('/');
      return;
    }

    const click = {
      timestamp: new Date().toISOString(),
      source: document.referrer || 'direct',
      location: 'Unknown',
    };

    urls[entryIndex].clicks.push(click);
    localStorage.setItem('shortUrls', JSON.stringify(urls));

    log('frontend', 'info', 'handler', `Redirecting shortcode ${shortcode} to ${entry.originalUrl}`);

    setTimeout(() => {
      window.location.href = entry.originalUrl;
    }, 300);
  }, [shortcode, navigate]);

  return null;
};

export default RedirectHandler;
