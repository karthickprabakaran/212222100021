import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Alert,
  Stack,
  Container,
  Divider
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
      setEntries([
        ...entries,
        { url: '', shortcode: '', validity: '', result: null, error: '' }
      ]);
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
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          URL Shortener
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          You can shorten up to {MAX_ENTRIES} URLs at once. Optionally specify a custom shortcode and expiry in minutes.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {entries.map((entry, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              backgroundColor: '#f9f9f9',
              border: '1px solid #e0e0e0',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              URL #{index + 1}
            </Typography>
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
                    <strong>Short URL:</strong>{' '}
                    <a href={entry.result.shortUrl} target="_blank" rel="noreferrer">
                      {entry.result.shortUrl}
                    </a>
                    <br />
                    <strong>Expires at:</strong> {entry.result.expiresAt.toLocaleString()}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Paper>
        ))}

        <Stack direction="row" spacing={2} justifyContent="space-between" mt={3}>
          <Button
            variant="outlined"
            onClick={addEntry}
            disabled={entries.length >= MAX_ENTRIES}
          >
            Add Another URL
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Shorten URLs
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default UrlShortenerForm;
