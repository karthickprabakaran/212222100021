import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Alert
} from '@mui/material';
import { log } from '../services/services';

const UrlStatsPage = () => {
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shortUrls')) || [];
    setUrlData(saved);

    log('frontend', 'info', 'handler', 'Stats page loaded showing shortened URLs');
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Stats
      </Typography>

      {urlData.length === 0 ? (
        <Alert severity="info">No shortened URLs found.</Alert>
      ) : (
        urlData.map((entry, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Original URL:</strong> {entry.originalUrl}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Short URL:</strong>{' '}
                  <a href={entry.shortUrl}>{entry.shortUrl}</a>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>Created At:</strong>{' '}
                  {new Date(entry.createdAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>Expires At:</strong>{' '}
                  {new Date(entry.expiresAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Clicks:</strong> {entry.clicks.length}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {entry.clicks.map((click, i) => (
                <Grid item xs={12} key={i}>
                  <Typography variant="body2">
                    {i + 1}. {new Date(click.timestamp).toLocaleString()} | Source: {click.source} | Location: {click.location}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default UrlStatsPage;
