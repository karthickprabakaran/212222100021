import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Alert
} from '@mui/material';
import { log } from '../services/services';
import { isValidUrl, isValidShortcode, isPositiveInteger } from '../utils/validator';

const MAX_ENTRIES = 5;

const UrlShortenerForm = () => {
  const [entries, setEntries] = useState([
    { url: '', shortcode: '', validity: '', result: null, error: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    updated[index].error = '';
    setEntries(updated);
  };

  const addEntry = () => {
    if (entries.length < MAX_ENTRIES) {
      setEntries([...entries, { url: '', shortcode: '', validity: '', result: null, error: '' }]);
    }
  };

  const validateEntry = (entry) => {
    if (!isValidUrl(entry.url)) {
      return 'Invalid URL format.';
    }
    if (entry.shortcode && !isValidShortcode(entry.shortcode)) {
      return 'Shortcode must be alphanumeric and 1–10 characters.';
    }
    if (entry.validity && !isPositiveInteger(entry.validity)) {
      return 'Validity must be a positive integer.';
    }
    return null;
  };

  const handleSubmit = async () => {
    const updated = [...entries];
    for (let i = 0; i < updated.length; i++) {
      const entry = updated[i];
      const error = validateEntry(entry);
      if (error) {
        updated[i].error = error;
        await log('frontend', 'error', 'handler', `Entry ${i + 1} validation failed: ${error}`);
        continue;
      }

      const shortcode = entry.shortcode || Math.random().toString(36).substring(2, 8);
      const validity = entry.validity ? parseInt(entry.validity) : 30;
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + validity * 60000);

      updated[i].result = {
        shortUrl: `http://localhost:3000/${shortcode}`,
        expiresAt
      };

      // Save to localStorage for stats + redirect use
      const existing = JSON.parse(localStorage.getItem('shortUrls')) || [];
      existing.push({
        originalUrl: entry.url,
        shortUrl: `http://localhost:3000/${shortcode}`,
        shortcode,
        createdAt,
        expiresAt,
        clicks: []
      });

      localStorage.setItem('shortUrls', JSON.stringify(existing));

      await log('frontend', 'info', 'handler', `Shortened URL ${entry.url} with shortcode ${shortcode}`);
    }

    setEntries(updated);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {entries.map((entry, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Long URL"
                value={entry.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Custom Shortcode (optional)"
                value={entry.shortcode}
                onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Validity in Minutes (optional)"
                type="number"
                value={entry.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            {entry.error && (
              <Grid item xs={12}>
                <Alert severity="error">{entry.error}</Alert>
              </Grid>
            )}
            {entry.result && (
              <Grid item xs={12}>
                <Alert severity="success">
                  Short URL: <a href={entry.result.shortUrl}>{entry.result.shortUrl}</a> <br />
                  Expires at: {entry.result.expiresAt.toLocaleString()}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={addEntry}
          disabled={entries.length >= MAX_ENTRIES}
        >
          Add Another URL
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Box>
    </Box>
  );
};

export default UrlShortenerForm;
