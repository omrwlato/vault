import React from 'react';
import { Box, Button, CardContent, Grid, Paper, Typography } from '@material-ui/core';

import Pools from 'features/vault/components/Pools/Pools';

export default function Disclaimer() {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: '20px' }}
      >
        <Grid item xs={12} sm={8}>
          <Box p={4} justifyContent="center" alignItems="center">
            <Typography variant="h3" fontWeight="bold" align="center" style={{ color: '#000' }}>
              Vaults
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
