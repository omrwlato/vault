import React from 'react';
import { Box, Button, CardContent, Grid, Paper, Typography } from '@material-ui/core';

import Pools from 'features/vault/components/Pools/Pools';

export default function HomePage() {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: '10px' }}
      >
        <Grid item xs={12} sm={8}>
          <Box p={6} justifyContent="center" alignItems="center">
            <Typography variant="h3" fontWeight="bold" align="center" style={{ color: '#000' }}>
              The sweetest yield optimization protocol built to be deflationary!
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Pools fromPage="home" />
    </>
  );
}
